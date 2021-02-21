import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import phonebookReducer from './phonebook/phonebook-reducer';
import logger from 'redux-logger';
import { persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'contacts',
    storage,
    blacklist: ['filter']
}

const middleware = [...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
}), logger];

const rootReducer = combineReducers({
    contacts: persistReducer(persistConfig, phonebookReducer)
})


const store = configureStore({
    reducer: rootReducer,
    middleware: middleware,
    devTools: process.env.NODE_ENV === 'development'
});

const persistor = persistStore(store)

const exportObj = {store, persistor}

export default exportObj;