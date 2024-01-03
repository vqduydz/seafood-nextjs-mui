import { AuthState, loginError, setToken } from '@/lib/redux/features/authSlices';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { getCartItemApi } from '@/utils/services/api/cartItemApi';
import { jwtDecode } from 'node_modules/jwt-decode/build/cjs';
import { useSnackbar } from 'notistack';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

interface ICurrentUser {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  gender: string;
  address: string | null;
  location: string | null;
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
  auth?: AuthState;
  currentUser?: ICurrentUser | null;
  cartItems?: ICartItem[] | [];
  orderItems?: ICartItem[] | [];
  loading?: { loading: boolean; message?: string };
  setLoading?: React.Dispatch<React.SetStateAction<{ loading: boolean; message?: string }>> | (() => void);
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

  const [auth, setAuth] = useState<AuthState & { currentUser?: ICurrentUser }>({
    currentUserToken: authSelector.currentUserToken,
    isLogin: authSelector.isLogin,
    token: authSelector.token,
  });
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>();
  const [cartItems, setCartItems] = useState<ICartItem[] | []>([]);
  const [loading, setLoading] = useState<{ loading: boolean; message?: string }>({ loading: false });
  const [orderItems, setOrderItems] = useState<ICartItem[]>([]);

  const enqueueSnackbar = useSnackbar().enqueueSnackbar as IEnqueueSnackbar;

  // auth
  useEffect(() => {
    const currentUser = authSelector.currentUserToken
      ? (jwtDecode(authSelector.currentUserToken) as ICurrentUser)
      : null;
    setCurrentUser(currentUser);
    setAuth({
      currentUserToken: authSelector.currentUserToken,
      isLogin: authSelector.isLogin,
      token: authSelector.token,
      error: authSelector.error,
    });
  }, [authSelector]);

  // socket

  const socket = io(process.env.backendUrl as string, {
    transports: ['websocket'],
  });

  useEffect(() => {
    if (socket) {
      socket.on('sendToken', (token) => {
        if (token && !token.error) {
          dispatch(loginError({ error: null }));
          dispatch(setToken(token));
        } else {
          setLoading({ loading: false });
          if (token.error) dispatch(loginError({ error: token.error }));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

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
