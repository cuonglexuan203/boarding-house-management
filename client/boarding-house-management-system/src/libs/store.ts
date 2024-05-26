import { EnhancedStore, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';
import persistedReducer from './reducer';
import { roomApi } from './services/roomApi';
import { thunk } from 'redux-thunk';
import { tenantApi } from './services/tenantApi';
import { locationApi } from './services/locationApi';
import { serviceApi } from './services/serviceApi';
import { invoiceApi } from './services/invoiceApi';
import { roomDetailsApi } from './services/roomDetailsApi';
import { authApi } from './services/authApi';
import { contractApi } from './services/contractApi';
import loadingMiddleware from './middlewares/loadingMiddleware';
//

export const store: EnhancedStore = configureStore({
  reducer: persistedReducer,

  // @ts-ignore
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(thunk)
      .concat(roomApi.middleware)
      .concat(tenantApi.middleware)
      .concat(locationApi.middleware)
      .concat(serviceApi.middleware)
      .concat(invoiceApi.middleware)
      .concat(roomDetailsApi.middleware)
      .concat(authApi.middleware)
      .concat(contractApi.middleware)
      .concat(loadingMiddleware),
});
//
setupListeners(store.dispatch);
//
export const persistor = persistStore(store);
//
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
