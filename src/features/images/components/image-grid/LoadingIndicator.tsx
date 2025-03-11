import React from 'react';
import { ImageCardSkeleton } from '../../components/ImageCardSkeleton';

interface LoadingIndicatorProps {
    count?: number;
    isInfiniteScroll?: boolean;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
    count = 12,
    isInfiniteScroll = false
}) => {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: count }).map((_, index) => (
                    <ImageCardSkeleton key={`skeleton-${index}`} />
                ))}
            </div>
            {isInfiniteScroll && (
                <div className="flex justify-center mt-8">
                    <div className="animate-pulse flex space-x-1">
                        <div className="h-2 w-2 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
                        <div className="h-2 w-2 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
                        <div className="h-2 w-2 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
                    </div>
                </div>
            )}
        </>
    );
};