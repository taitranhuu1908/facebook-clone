import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IPostCreate, IPostFull} from "../models/Post";
import {Response} from "../models/Response";
import {ICommentCreate} from "../models/Comment";

const BASE_URL = process.env.REACT_APP_URL_API || "";

export const postService = createApi({
    reducerPath: "postService",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/posts`,
        prepareHeaders(headers) {
            const accessToken = localStorage.getItem("auth");
            headers.set("Authorization", `Bearer ${accessToken}`);
            return headers;
        },
    }),
    tagTypes: ["IPostFull", "IPostCreate"],
    endpoints: (build) => ({
        createPost: build.mutation<Response<IPostFull>, IPostCreate>({
            query: (data) => ({
                url: "/create",
                method: "POST",
                body: data,
            }),
        }),
        getPostsByMe: build.query<Response<IPostFull[]>, void>({
            query: () => `/all`,
        }),
        getPostsByFriend: build.query<Response<IPostFull[]>, void>({
            query: () => ({
                url: "/friends?page=0&size=10",
                method: "GET",
            }),
        }),
        sendCommentByPost: build.mutation<Response<IPostFull>, ICommentCreate>({
            query: (data) => ({
                url: `/comment/${data.postId}`,
                method: "POST",
                body: {
                    comment: data.comment,
                },
            })
        })
    }),
});

export const {
    useCreatePostMutation,
    useGetPostsByFriendQuery,
    useGetPostsByMeQuery,
    useSendCommentByPostMutation
} = postService;