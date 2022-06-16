export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserRegister {
    email: string;
    password: string;
    birthday: string;
    firstName: string;
    lastName: string;
    gender: string; // 0: Nữ, 1: Nam
}