import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
};

const reducer = combineReducers({
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
