import chatBoxSlice from "./features/ChatBoxSlice";
import userSlice from "./features/UserSlice";
import authSlice from "./features/AuthSlice";
import postSlice from "./features/PostSlice";
import { userService } from "./services/UserService";
import { authService } from "./services/AuthService";
import { postService } from "./services/PostService";

export const reducers = {
    chatBoxSlice,
    userSlice,
    authSlice,
    postSlice,
    [userService.reducerPath]: userService.reducer,
    [authService.reducerPath]: authService.reducer,
    [postService.reducerPath]: postService.reducer,
};
