import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import customSagas from "./sagas";
const persistConfig = {
    key: "bookshelf",
    storage, 
    whitelist: ["results", "library"]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(
    persistedReducer,
    compose( applyMiddleware(sagaMiddleware), devTools ));
let persistor = persistStore(store);
sagaMiddleware.run(customSagas);
export { persistor };
export default store;