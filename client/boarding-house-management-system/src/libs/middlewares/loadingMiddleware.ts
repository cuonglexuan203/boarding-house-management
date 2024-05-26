import { Middleware } from '@reduxjs/toolkit';
import { isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';
import { setLoading } from '../features/loadingSlice';
import { AppDispatch, RootState } from '../store';

const loadingMiddleware: Middleware<{}, RootState, AppDispatch> =
  (store) => (next) => (action) => {
    if (isPending(action)) {
      store.dispatch(setLoading(true));
    } else if (isFulfilled(action) || isRejected(action)) {
      store.dispatch(setLoading(false));
    }
    return next(action);
  };

export default loadingMiddleware;
