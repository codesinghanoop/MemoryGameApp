import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk'
import * as reducers from './reducer'

const finalReducers = combineReducers({ ...reducers })
const persistConfig = {
    key: 'root',
    storage,
    version: 10
  }

const persistedReducer = persistReducer(persistConfig, finalReducers)




export default () => {
    const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));
    let persistor = persistStore(store)
    return { store, persistor }
}
