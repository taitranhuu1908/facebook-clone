import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPostFull} from "../models/Post";
import {Response} from "../models/Response";
import {postService} from "../services/PostService";
import {USER_DEFAULT} from "./AuthSlice";

interface IState {
    posts: IPostFull[];
    postsMe: IPostFull[];
}

export const POST_DEFAULT = {
    id: 0,
    createdAt: "",
    updatedAt: "",
    title: "",
    slug: "",
    thumbnail: "",
    description: "",
    body: "",
    views: "",
    cover: "",
    user: USER_DEFAULT,
    reactPosts: [],
    commentPosts: [],
    delete: false,
}

const initialState: IState = {
    posts: [],
    postsMe: [],
};

const postSlice = createSlice({
    name: "postSlice",
    initialState,
    reducers: {
        appendPosts: (state: IState, {payload}: PayloadAction<IPostFull>) => {
            state.postsMe = [payload, ...state.postsMe];
            state.posts = [payload, ...state.posts];
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            postService.endpoints.getPostsByFriend.matchFulfilled,
            (state: IState, {payload}: PayloadAction<Response<IPostFull[]>>) => {
                state.posts = [...payload.data];
            }
        );
        builder.addMatcher(
            postService.endpoints.getPostsByMe.matchFulfilled,
            (state: IState, {payload}: PayloadAction<Response<IPostFull[]>>) => {
                if (payload.data) {
                    state.postsMe = [...payload.data];
                }
            }
        )
    },
});

export const {appendPosts} = postSlice.actions;

export default postSlice.reducer;
