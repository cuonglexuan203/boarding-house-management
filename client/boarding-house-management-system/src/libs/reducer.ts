import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import statusReducer from './features/statusSlice';
import { roomApi } from './services/roomApi';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: [],
  version: 1,
};

const rootReducer = combineReducers({
  status: statusReducer,
  [roomApi.reducerPath]: roomApi.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;
