import React from 'react';

interface EndOfResultsMessageProps {
    message?: string;
}

export const EndOfResultsMessage: React.FC<EndOfResultsMessageProps> = ({
    message = "You've reached the end of the results."
}) => {
    return (
        <div className="text-center mt-10 py-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
                {message}
            </p>
        </div>
    );
};