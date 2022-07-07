import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserFull} from "../models/User";
import {friendService} from "../services/FriendService";
import {Response} from "../models/Response";
import {IFriendFull} from "../models/Friend";

interface IState {
    friends: IFriendFull[]
    friendRequest: IUserFull[]

}

const initialState: IState = {
    friends: [],
    friendRequest: []
};

const postSlice = createSlice({
    name: "postSlice",
    initialState,
    reducers: {},
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
        )
    },
});


export default postSlice.reducer;
