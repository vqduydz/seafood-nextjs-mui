import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import { authReducer } from './features/authSlices';

import CryptoJS from 'crypto-js';
import createTransform from 'redux-persist/es/createTransform';
import storage from 'redux-persist/lib/storage';
import { languageReducer } from './features/languageSlice';
import { orderItemsReducer } from './features/orderSlice';

const secretKey: string = process.env.secretKey as string;

const encryptAuthToken = (token: string | null) => {
  if (!token || typeof token !== 'string') {
    return token;
  }
  const encryptedAuthToken = CryptoJS.AES.encrypt(token, secretKey).toString();
  return encryptedAuthToken;
};

const decryptAuthToken = (encryptedAuthToken: string | null) => {
  if (!encryptedAuthToken || typeof encryptedAuthToken !== 'string') {
    return encryptedAuthToken;
  }
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedAuthToken, secretKey);
  const decryptedAuthToken = decryptedBytes.toString(CryptoJS.enc.Utf8);

  return decryptedAuthToken;
};

const persistConfig = {
  key: 'root',
  storage: storage,
  // stateReconciler: autoMergeLevel2,
  whitelist: ['auth', 'language', 'orderItems'],
  transforms: [
    createTransform(
      (inboundState, key) => {
        if (key === 'auth' && inboundState) {
          const { token, isLogin, currentUserToken } = inboundState as {
            token: string | null;
            isLogin: boolean;
            currentUserToken: string | null;
          };
          return { token: encryptAuthToken(token), isLogin, currentUserToken: encryptAuthToken(currentUserToken) };
        }
        return inboundState;
      },
      (outboundState, key) => {
        if (key === 'auth' && outboundState) {
          const { token, isLogin, currentUserToken } = outboundState as {
            token: string | null;
            isLogin: boolean;
            currentUserToken: string | null;
          };
          return { token: decryptAuthToken(token), isLogin, currentUserToken: decryptAuthToken(currentUserToken) };
        }
        return outboundState;
      },
    ),
  ],
};

const rootReducer = combineReducers({
  orderItems: orderItemsReducer,
  auth: authReducer,
  language: languageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const persistor = persistStore(store);
