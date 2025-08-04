export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    tokenExpiresAt?: number;
}

export interface SignInCredentials {
    username: string;
    password: string;
}

export interface SignUpCredentials {
    username: string;
    email: string;
    password: string;
}

export interface SignInResponse {
    message: string;
    data: {
        user: {
            id: string;
            email?: string;
            username: string;
            role: string;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    };
}
