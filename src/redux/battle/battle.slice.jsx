import { createSlice } from "@reduxjs/toolkit";

export const battleSlice = createSlice({
    name: "battle",
    initialState: {
        tokenID: null,
        element: null,
        power: null,
        imageURL: null
    },
    reducers: {
        setPlayer(state, action) {
            const { _tokenID, _element, _power, _imageURL } = action.payload
            state.tokenID = _tokenID;
            state.element = _element;
            state.power = _power;
            state.imageURL = _imageURL;
        }
    }
});

export const { setPlayer } = battleSlice.actions;

export default battleSlice.reducer;