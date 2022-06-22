import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../models/User";

interface IState {
    chatbox: IUser[]
}

const initialState: IState = {
    chatbox: []
};

const chatBoxSlice = createSlice({
    name: "chatSlice",
    initialState,
    reducers: {
        openChatBox: (state, {payload}: PayloadAction<IUser>) => {
            state.chatbox = [...state.chatbox, payload];
        },
        closeChatBox: (state, {payload}: PayloadAction<IUser>) => {
            state.chatbox = state.chatbox.filter(item => item.id !== payload.id);
        }
    },
    extraReducers: {}
});

export const {openChatBox, closeChatBox} = chatBoxSlice.actions;

export default chatBoxSlice.reducer;