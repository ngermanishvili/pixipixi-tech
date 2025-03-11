import React from 'react';
import { Button } from '@/components/ui/Button';

interface ErrorStateProps {
    message?: string;
    onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
    message = 'We encountered a problem while trying to fetch the images. Please try again later.',
    onRetry
}) => {
    return (
        <div className="text-center py-12">
            <div className="inline-flex justify-center items-center w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                <svg className="h-6 w-6 text-red-600 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Failed to Load Images</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                {message}
            </p>
            <Button
                onClick={onRetry}
                variant="primary"
            >
                Retry
            </Button>
        </div>
    );
};