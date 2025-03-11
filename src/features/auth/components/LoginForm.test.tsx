import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { LoginForm } from './LoginForm';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';


vi.mock('@/store/authStore');
vi.mock('react-router-dom');

describe('LoginForm', () => {
    const mockNavigate = vi.fn();
    const mockLogin = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockNavigate);
        (useAuthStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            login: mockLogin,
            isLoading: false,
            error: null
        });
    });

    it('renders the login form correctly', () => {
        render(<LoginForm />);
        expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
        expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
    });

    it('validates email input', async () => {
        const user = userEvent.setup();
        render(<LoginForm />);
        screen.debug();
        const emailInput = screen.getByLabelText('Email');
        // Test invalid email
        await user.type(emailInput, 'invalid-email');
        await user.tab();
        screen.debug();
    });

    it('submits the form with valid data', async () => {
        const user = userEvent.setup();
        render(<LoginForm />);
        await user.type(screen.getByLabelText('Email'), 'test@example.com');
        await user.type(screen.getByLabelText('Password'), 'password123');

        // Submit form
        await user.click(screen.getByRole('button', { name: 'Sign in' }));
        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
        });
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    it('displays error message when login fails', async () => {
        const user = userEvent.setup();
        (useAuthStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            login: mockLogin,
            isLoading: false,
            error: 'Invalid credentials'
        });
        render(<LoginForm />);

        await user.type(screen.getByLabelText('Email'), 'test@example.com');
        await user.type(screen.getByLabelText('Password'), 'password123');
        await user.click(screen.getByRole('button', { name: 'Sign in' }));

        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });

    it('shows loading state during form submission', async () => {
        const user = userEvent.setup();

        (useAuthStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            login: mockLogin,
            isLoading: true,
            error: null
        });

        render(<LoginForm />);

        // The button should be in loading state
        const submitButton = screen.getByRole('button', { name: 'Sign in' });
        expect(submitButton).toHaveAttribute('disabled');
    });

    it('navigates to register page when register link is clicked', async () => {
        const user = userEvent.setup();
        render(<LoginForm />);
        await user.click(screen.getByRole('button', { name: 'Register' }));
        expect(mockNavigate).toHaveBeenCalledWith('/register');
    });
});