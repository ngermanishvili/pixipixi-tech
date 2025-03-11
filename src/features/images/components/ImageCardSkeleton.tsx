import React from 'react';

export const ImageCardSkeleton = React.memo(() => {
    return (
        <div className="rounded-lg overflow-hidden shadow-md dark:bg-gray-800">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 animate-pulse"></div>

            <div className="p-4">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                </div>

                <div className="mt-3 flex space-x-2">
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse"></div>
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse"></div>
                </div>

                <div className="mt-4 flex justify-between">
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                    <div className="h-8 w-24 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                </div>
            </div>
        </div>
    );
});