import { AuthResponse, ErrorResponse, LoginRequest, RegisterRequest } from '@/types/auth';

const BASE_URL = ''; //? რეალური აპისთვის

async function handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();

    if (!response.ok) {
        const error = data as ErrorResponse;
        throw new Error(error.message || 'An error occurred');
    }

    return data as T;
}

export const authApi = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await fetch(`${BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        return handleResponse<AuthResponse>(response);
    },

    register: async (userData: RegisterRequest): Promise<AuthResponse> => {
        const response = await fetch(`${BASE_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        return handleResponse<AuthResponse>(response);
    },
};