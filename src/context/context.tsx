import { ISetState } from '@/interface/interface';
import { AuthState, loginError, logout, setToken } from '@/lib/redux/features/authSlices';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { getCartItemApi } from '@/utils/services/api/cartItemApi';
import { jwtDecode } from 'node_modules/jwt-decode/build/cjs';
import { useSnackbar } from 'notistack';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

export interface IPlace {
  name?: string;
  phoneNumber?: string;
  address?: string;
  location?: { lat: number; lng: number };
  primary?: boolean;
  place_id?: string;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  gender: string;
  place?: string | null;
  avatar: string | null;
  role: string;
  birthday: string | null;
  createdAt: string;
  iat: string;
}
export interface ICartItem {
  id: number;
  customer_id: number;
  menu_id: number;
  quantity: number;
  name: string;
  slug: string;
  catalog: string;
  catalogSlug: string;
  price: number;
  unit: string;
  max_order: number | null;
  image: string;
}

interface IEnqueueOptions {
  /** Type of the snackbar */
  variant: 'default' | 'error' | 'success' | 'warning' | 'info';
  /** Event fired when user clicks on action button (if any) */
  onClickAction(): void;
  /**
   * You can pass material-ui Snackbar props here, and they will be applied to this individual snackbar.
   * for example, this particular snackbar will be dismissed after 1sec.
   */
  autoHideDuration: number;
}

interface IEnqueueSnackbar {
  (message: string, options?: Partial<IEnqueueOptions>): void;
}
interface MyContextType {
  socket?: Socket | null;
  emitEvent?: (eventName: string, data: any) => void;
  listenToEvent?: (eventName: string) => Promise<any>;
  auth?: AuthState;
  currentUser?: IUser | null;
  cartItems?: ICartItem[] | [];
  orderItems?: ICartItem[] | [];
  loading?: { loading: boolean; message?: string };
  setLoading?: ISetState<{ loading: boolean; message?: string }> | (() => void);
  enqueueSnackbar?: IEnqueueSnackbar;
  handleGetCartItems?: () => void;
}

const MyContext = createContext<MyContextType>({});
export const useMyContext = (): MyContextType => useContext(MyContext);
export const MyProvider = ({ children }: { children: ReactNode }) => {
  //
  const dispatch = useAppDispatch();
  const authSelector = useAppSelector((state) => state.auth) as AuthState;
  const orderItemsSelector = useAppSelector((state) => state.orderItems.orderItems) as ICartItem[];

  const [auth, setAuth] = useState<AuthState & { currentUser?: IUser }>({
    currentUserToken: authSelector.currentUserToken,
    isLogin: authSelector.isLogin,
    token: authSelector.token,
  });
  const [currentUser, setCurrentUser] = useState<IUser | null>();
  const [cartItems, setCartItems] = useState<ICartItem[] | []>([]);
  const [loading, setLoading] = useState<{ loading: boolean; message?: string }>({ loading: false });
  const [orderItems, setOrderItems] = useState<ICartItem[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const enqueueSnackbar = useSnackbar().enqueueSnackbar as IEnqueueSnackbar;

  // auth
  useEffect(() => {
    const currentUser = authSelector.currentUserToken ? (jwtDecode(authSelector.currentUserToken) as IUser) : null;
    setCurrentUser(currentUser);
    setAuth({
      currentUserToken: authSelector.currentUserToken,
      isLogin: authSelector.isLogin,
      token: authSelector.token,
      error: authSelector.error,
    });
  }, [authSelector]);

  // socket

  useEffect(() => {
    const newSocket = io(process.env.backendUrl as string, {
      transports: ['websocket'],
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const emitEvent = (eventName: string, data: any) => {
    if (socket) {
      socket.emit(eventName, data);
    }
  };

  const listenToEvent = (eventName: string): Promise<any> => {
    return new Promise((resolve) => {
      if (socket) {
        socket.on(eventName, (data: any) => {
          resolve(data);
        });
      }
    });
  };

  if (socket) {
    socket.on('logoutUser', (userId) => {
      if (userId === currentUser?.id) dispatch(logout());
    });
  }
  // Cart item

  const handleGetCartItems = async () => {
    try {
      if (!currentUser) setCartItems([]);
      if (currentUser && currentUser.id) {
        const response = await getCartItemApi(currentUser.id);
        setCartItems(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (() => handleGetCartItems())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, loading]);

  // order item

  useEffect(() => {
    if (orderItemsSelector) setOrderItems(orderItemsSelector);
  }, [orderItemsSelector]);

  //
  const sharedState = {
    socket,
    emitEvent,
    listenToEvent,
    auth,
    currentUser,
    cartItems,
    loading,
    setLoading,
    enqueueSnackbar,
    handleGetCartItems,
    orderItems,
  };

  return <MyContext.Provider value={sharedState}>{children}</MyContext.Provider>;
};
