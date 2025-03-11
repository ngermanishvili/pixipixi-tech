import React from 'react';

interface EmptyStateProps {
    searchQuery?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ searchQuery }) => {
    return (
        <div className="text-center py-12">
            <div className="inline-flex justify-center items-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <svg className="h-6 w-6 text-gray-600 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Images Found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                {searchQuery
                    ? `We couldn't find any images matching "${searchQuery}". Try a different search term.`
                    : "Try searching for something like 'nature', 'animals', or 'technology'."}
            </p>
        </div>
    );
};