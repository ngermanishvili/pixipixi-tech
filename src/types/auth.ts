export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    age: number;
}

export interface User {
    id: string;
    email: string;
    age?: number;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface ErrorResponse {
    message: string;
}