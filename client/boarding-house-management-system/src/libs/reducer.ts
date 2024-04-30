import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import statusReducer from './features/statusSlice';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'auth', 'tempCart'],
  version: 1,
};

const rootReducer = combineReducers({
  status: statusReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;
