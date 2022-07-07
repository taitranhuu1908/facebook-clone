import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Response} from "../models/Response";
import {IFriendFull} from "../models/Friend";
import {IUserFull} from "../models/User";

const BASE_URL = process.env.REACT_APP_URL_API || "";

export const friendService = createApi({
    reducerPath: "friendService",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/friends`,
        prepareHeaders(headers) {
            const accessToken = localStorage.getItem("auth");
            headers.set("Authorization", `Bearer ${accessToken}`);
            return headers;
        },
    }),
    endpoints: (build) => ({
        getFriends: build.query<Response<IFriendFull[]>, void>({
            query: () => `/all`,
        }),
        getFriendRequest: build.query<Response<IUserFull[]>, void>({
            query: () => `/get-friend-request`,
        })
    }),
});

export const {useGetFriendsQuery, useGetFriendRequestQuery} = friendService;
