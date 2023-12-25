import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import { authReducer, languageReducer } from './features/authSlices';

import CryptoJS from 'crypto-js';
import createTransform from 'redux-persist/es/createTransform';
import storage from 'redux-persist/lib/storage';

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
          const { token, isLogin, currentUser } = inboundState as {
            token: string | null;
            isLogin: boolean;
            currentUser: string | null;
          };
          const encryptedAuthToken = encryptAuthToken(token);
          return { token: encryptedAuthToken, isLogin, currentUser };
        }
        return inboundState;
      },
      (outboundState, key) => {
        if (key === 'auth' && outboundState) {
          const { token, isLogin, currentUser } = outboundState as {
            token: string | null;
            isLogin: boolean;
            currentUser: string | null;
          };
          const decryptedAuthToken = decryptAuthToken(token);
          return { token: decryptedAuthToken, isLogin, currentUser };
        }
        return outboundState;
      },
    ),
  ],
};

const rootReducer = combineReducers({
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
