import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import ethReducer from "./ethereum";

export default configureStore({
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
    reducer: {
        eth: ethReducer
    },
    devTools: true,
});
