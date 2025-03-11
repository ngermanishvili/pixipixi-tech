import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { RegisterForm } from './RegisterForm';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';

vi.mock('@/store/authStore');
vi.mock('react-router-dom');

describe('RegisterForm', () => {
    const mockNavigate = vi.fn();
    const mockRegister = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockNavigate);
        (useAuthStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            register: mockRegister,
            isLoading: false,
            error: null
        });
    });

    it('should render the registration form correctly', () => {
        render(<RegisterForm />);
        expect(screen.getByText('Create your account')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Age')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
        expect(screen.getByText('Already have an account?')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    });

    it('should validate all form fields correctly', async () => {
        const user = userEvent.setup();
        render(<RegisterForm />);

        // Submit with empty fields to trigger validation
        await user.click(screen.getByRole('button', { name: 'Register' }));

        // Check email validation
        await user.type(screen.getByLabelText('Email'), 'invalid-email');
        await user.tab(); // Move focus to trigger validation
        expect(screen.getByText('Invalid email address')).toBeInTheDocument();

        // Check password validation
        const passwordInput = screen.getByLabelText('Password');
        await user.clear(passwordInput);
        await user.type(passwordInput, '12345');
        await user.tab();
        expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();

        // Check age validation
        const ageInput = screen.getByLabelText('Age');
        await user.clear(ageInput);
        await user.type(ageInput, '17');
        await user.tab();

        await waitFor(() => {
            const ageErrors = screen.getAllByText(/18/);
            expect(ageErrors.length).toBeGreaterThan(0);
        });
    });

    it('should submit valid registration data', async () => {
        const user = userEvent.setup();
        render(<RegisterForm />);

        await user.type(screen.getByLabelText('Email'), 'test@example.com');
        await user.type(screen.getByLabelText('Password'), 'password123');
        await user.clear(screen.getByLabelText('Age'));
        await user.type(screen.getByLabelText('Age'), '25');
        await user.click(screen.getByRole('button', { name: 'Register' }));

        await waitFor(() => {
            expect(mockRegister).toHaveBeenCalledWith('test@example.com', 'password123', 25);
        });

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });
});