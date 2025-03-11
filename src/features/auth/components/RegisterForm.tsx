import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { registerSchema, RegisterFormData } from '@/lib/validators/auth';
import { useAuthStore } from '@/store/authStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    const { register: registerUser, isLoading, error } = useAuthStore();

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            age: 18,
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        await registerUser(data.email, data.password, data.age);
        if (!error) {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                        Create your account
                    </h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <Input
                            id="email"
                            label="Email"
                            type="email"
                            placeholder="your@email.com"
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        <Input
                            id="password"
                            label="Password"
                            type="password"
                            placeholder="••••••"
                            error={errors.password?.message}
                            {...register('password')}
                        />

                        <Input
                            id="age"
                            label="Age"
                            type="number"
                            placeholder="30"
                            error={errors.age?.message}
                            {...register('age', { valueAsNumber: true })}
                        />
                    </div>

                    {error && (
                        <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <Button
                        variant='outline'
                        type="submit"
                        fullWidth
                        isLoading={isLoading}
                    >
                        Register
                    </Button>

                    <div className="text-sm text-center">
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};