export interface LoginResponse {
    message: string;
    data: {
        userInfo: UserInfo;
    };
}

export interface UserInfo {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'Admin' | 'Member';
}
