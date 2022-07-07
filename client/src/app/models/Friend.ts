import {IUserFull} from "./User";

export interface IFriendFull {
    status: string;
    friend: IUserFull;
}

export interface IAcceptFriend {
    status: string;
    emailTarget: string;
}