import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import walletReducer from './wallet/wallet.slice';
import battleReducer from './battle/battle.slice';

const store = configureStore({
    reducer: {
        wallet: walletReducer,
        battle: battleReducer
    },
    middleware: [...getDefaultMiddleware({ serializableCheck: false })]
});

export default store;