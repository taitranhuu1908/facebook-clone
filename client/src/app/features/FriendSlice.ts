import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserFull} from "../models/User";
import {friendService} from "../services/FriendService";
import {Response} from "../models/Response";
import {IFriendFull} from "../models/Friend";

interface IState {
    friends: IFriendFull[]
    friendRequest: IUserFull[],
    requestHasSend: IUserFull[],
}

const initialState: IState = {
    friends: [],
    friendRequest: [],
    requestHasSend: [],
};

const postSlice = createSlice({
    name: "postSlice",
    initialState,
    reducers: {
        appendFriendRequest: (state, {payload}: PayloadAction<IUserFull>) => {
            state.friendRequest = [payload, ...state.friendRequest];
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            friendService.endpoints.getFriends.matchFulfilled,
            (state: IState, {payload}: PayloadAction<Response<IFriendFull[]>>) => {
                if (payload.data) {
                    state.friends = [...payload.data];
                }
            }
        );
        builder.addMatcher(
            friendService.endpoints.getFriendRequest.matchFulfilled,
            (state: IState, {payload}: PayloadAction<Response<IUserFull[]>>) => {
                if (payload.data) {
                    state.friendRequest = [...payload.data];
                }
            }
        );
        builder.addMatcher(
            friendService.endpoints.getFriendHasSend.matchFulfilled,
            (state: IState, {payload}: PayloadAction<Response<IUserFull[]>>) => {
                if (payload.data) {
                    state.requestHasSend = [...payload.data];
                }
            }
        )
    },
});

export const {appendFriendRequest} = postSlice.actions;


export default postSlice.reducer;
