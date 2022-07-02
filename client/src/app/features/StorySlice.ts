import { IStoryFull } from "./../models/Story";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storyService } from "../services/StoryService";
import { Response } from "../models/Response";

interface IState {
    storiesMe: IStoryFull[];
}

const initialState: IState = {
    storiesMe: [],
};

const storySlice = createSlice({
    name: "storySlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            storyService.endpoints.getStoriesByMe.matchFulfilled,
            (state: IState, { payload }: PayloadAction<Response<IStoryFull[]>>) => {
                state.storiesMe = payload.data;
            }
        );
    },
});

export default storySlice.reducer;
