'use client';

import { persistor, store } from '@/libs/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default StoreProvider;
