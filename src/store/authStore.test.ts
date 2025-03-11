import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './authStore';
import { authApi } from '@/lib/api/client';

vi.mock('@/lib/api/client', () => ({
    authApi: {
        login: vi.fn(),
        register: vi.fn(),
    },
}));

describe('AuthStore', () => {
    beforeEach(() => {
        useAuthStore.setState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
        });
        vi.clearAllMocks();
    });

    it('should handle login success flow', async () => {
        const mockUser = { id: '1', email: 'test@example.com' };
        (authApi.login as any).mockResolvedValue({
            user: mockUser,
            token: 'token123',
        });

        const { login } = useAuthStore.getState();
        await login('test@example.com', 'password123');

        const state = useAuthStore.getState();
        expect(state.isAuthenticated).toBe(true);
        expect(state.user).toEqual(mockUser);
        expect(state.error).toBeNull();
        expect(authApi.login).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'password123',
        });
    });

    it('should handle login error', async () => {
        const errorMessage = 'Invalid credentials';
        (authApi.login as any).mockRejectedValue(new Error(errorMessage));

        const { login } = useAuthStore.getState();
        await login('wrong@example.com', 'wrongpass');

        const state = useAuthStore.getState();
        expect(state.isAuthenticated).toBe(false);
        expect(state.user).toBeNull();
        expect(state.error).toBe(errorMessage);
    });

    it('should persist auth state to local storage', async () => {
        // მოკავს localStorage
        const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

        // მოაგვარებს login-ს წარმატების ლოგიკით
        const mockUser = { id: '1', email: 'test@example.com' };
        (authApi.login as any).mockResolvedValue({
            user: mockUser,
            token: 'token123',
        });

        // შეასრულებს login-ს
        const { login } = useAuthStore.getState();
        await login('test@example.com', 'password123');

        // შეამოწმებს რომ localStorage-ში იქნა შენახული
        expect(setItemSpy).toHaveBeenCalledWith('auth-storage', expect.any(String));

        // გააწმენდს მოკს
        setItemSpy.mockRestore();
    });
});