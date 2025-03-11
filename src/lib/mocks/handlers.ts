import { http, HttpResponse } from 'msw'
import { LoginRequest, RegisterRequest, User, AuthResponse } from '@/types/auth'

// იმიტირებული მომხმარებლების მონაცემთა ბაზა
const users: (User & { password: string })[] = [
    {
        id: '1',
        email: 'test@example.com',
        password: 'password123',
        age: 30,
    },
];

export const handlers = [
    http.post('/api/login', async ({ request }) => {
        await new Promise(resolve => setTimeout(resolve, 600));

        const { email, password } = await request.json() as LoginRequest;

        const user = users.find(u => u.email === email);

        if (!user || user.password !== password) {
            return new HttpResponse(
                JSON.stringify({ message: 'Invalid email or password' }),
                { status: 401 }
            );
        }

        const { password: _, ...userWithoutPassword } = user;

        const response: AuthResponse = {
            user: userWithoutPassword,
            token: 'fake-jwt-token-' + Math.random().toString(36).substring(2, 10),
        };

        return HttpResponse.json(response);
    }),


    http.post('/api/register', async ({ request }) => {
        await new Promise(resolve => setTimeout(resolve, 800));

        const { email, password, age } = await request.json() as RegisterRequest;

        // ვამოწმებთ, მოცემული იმეილი უკვე ხომ არ არსებობს
        if (users.some(u => u.email === email)) {
            return new HttpResponse(
                JSON.stringify({ message: 'User with this email already exists' }),
                { status: 400 }
            );
        }

        // ახალი მომხმარებლის შექმნა
        const newUser = {
            id: Date.now().toString(),
            email,
            password,
            age,
        };

        users.push(newUser);

        const { password: _, ...userWithoutPassword } = newUser;

        const response: AuthResponse = {
            user: userWithoutPassword,
            token: 'fake-jwt-token-' + Math.random().toString(36).substring(2, 10),
        };

        return HttpResponse.json(response, { status: 201 });
    }),
];