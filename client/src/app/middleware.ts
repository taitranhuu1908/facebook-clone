import {getDefaultMiddleware} from "@reduxjs/toolkit";
import {userService} from "./services/UserService";
import {authService} from "./services/AuthService";

export const middleware = [
    ...getDefaultMiddleware(),
    userService.middleware,
    authService.middleware
];