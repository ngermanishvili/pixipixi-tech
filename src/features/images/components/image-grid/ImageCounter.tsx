import React from 'react';

interface ImageCounterProps {
    totalHits: number;
    searchQuery?: string;
}

export const ImageCounter: React.FC<ImageCounterProps> = ({ totalHits, searchQuery }) => {
    return (
        <div className="mb-6 flex items-center justify-between">
            <h2 className="text-gray-700 dark:text-gray-300 text-sm">
                {searchQuery
                    ? `Showing results for "${searchQuery}"`
                    : "Showing popular images"}
                <span className="ml-2 text-xs font-semibold px-2 py-0.5 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 rounded-full">
                    {totalHits.toLocaleString()} results
                </span>
            </h2>
        </div>
    );
};