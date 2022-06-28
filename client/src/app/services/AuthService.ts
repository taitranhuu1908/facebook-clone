import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUserLogin, IUserRegister} from "../models/User";

const BASE_URL = process.env.URL_API || `http://localhost:1000/api`;

export const authService = createApi({
    reducerPath: "authService",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/v1/auth`,
        prepareHeaders(headers) {
            return headers;
        },
    }),
    endpoints: (build) => ({
        postRegister: build.mutation<void, IUserRegister>({
            query: (data) => ({
                url: `/register`,
                method: `POST`,
                body: data
            })
        }),
        postLogin: build.mutation<void, IUserLogin>({
            query: (data) => ({
                url: `/login`,
                method: `POST`,
                body: data
            })
        })
    }),
});

export const {usePostRegisterMutation, usePostLoginMutation} = authService;
