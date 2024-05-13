import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import statusReducer from './features/statusSlice';
import gridStatusReducer from './features/gridSlice';
import { roomApi } from './services/roomApi';
import { invoiceApi } from './services/invoiceApi';
import { serviceApi } from './services/serviceApi';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: [],
  version: 1,
};

const rootReducer = combineReducers({
  status: statusReducer,
  gridStatus: gridStatusReducer,
  [roomApi.reducerPath]: roomApi.reducer,
  [invoiceApi.reducerPath]: invoiceApi.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;
