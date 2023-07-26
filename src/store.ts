import { useDispatch, useSelector } from 'react-redux';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { PERSIST, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import loginReducer from './feature/login/loginSlice'

const rootReducer = combineReducers({
    login: loginReducer,
  });
  
  const persistConfig = {
    key: 'root',
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [PERSIST],
        },
      }),
  });
  
  export default store;
  
  export const persistor = persistStore(store);
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  export const useAppDispatch: () => AppDispatch = useDispatch;
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  export const selectLoginState = () => useSelector((state: RootState) => state.login);