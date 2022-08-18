import { createSlice } from "@reduxjs/toolkit";

export const walletSlice = createSlice({
    name: "wallet",
    initialState: {
        web3: null,
        provider: null,
        account: null,
        chainId: null
    },
    reducers: {
        setConnection(state, action) {
            const { _web3, _provider, _account, _chainId } = action.payload;
            state.web3 = _web3;
            state.provider = _provider;
            state.account = _account;
            state.chainId = _chainId;
        },
        setAccountChanged(state, action) {
            state.account = action.payload;
        },
        setChainChanged(state, action) {
            state.chainId = action.payload;
        },
        setProviderChanged(state, action) {
            state.provider = action.payload;
        }
    }
});

export const { setConnection, setAccountChanged, setChainChanged } = walletSlice.actions;

export default walletSlice.reducer;