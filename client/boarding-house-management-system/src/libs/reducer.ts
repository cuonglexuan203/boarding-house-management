import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import statusReducer from './features/statusSlice';
import gridStatusReducer from './features/gridSlice';
import { roomApi } from './services/roomApi';
import { tenantApi } from './services/tenantApi';
import { locationApi } from './services/locationApi';
import { invoiceApi } from './services/invoiceApi';
import { serviceApi } from './services/serviceApi';
import { roomDetailsApi } from './services/roomDetailsApi';
import { authApi } from './services/authApi';
import { contractApi } from './services/contractApi';
import loadingSlice from './features/loadingSlice';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: [],
  version: 1,
};

const rootReducer = combineReducers({
  status: statusReducer,
  gridStatus: gridStatusReducer,
  loading: loadingSlice,
  [roomApi.reducerPath]: roomApi.reducer,
  [tenantApi.reducerPath]: tenantApi.reducer,
  [locationApi.reducerPath]: locationApi.reducer,
  [invoiceApi.reducerPath]: invoiceApi.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
  [roomDetailsApi.reducerPath]: roomDetailsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [contractApi.reducerPath]: contractApi.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;
