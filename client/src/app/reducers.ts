import chatBoxSlice from "./features/ChatBoxSlice";
import userSlice from "./features/UserSlice";
import {userService} from "./services/UserService";
import {authService} from "./services/AuthService";

export const reducers = {
    chatBoxSlice,
    userSlice,
    [userService.reducerPath]: userService.reducer,
    [authService.reducerPath]: authService.reducer
};
