import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import ethReducer from "./ethereum";
import moneyReducer from "./reloadMoney.js";
import rewardReducer from "./reloadSumReward";

export default configureStore({
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
    reducer: {
        eth: ethReducer,
        money:moneyReducer,
        sumReward:rewardReducer
    },
    devTools: true,
});
