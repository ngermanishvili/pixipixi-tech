import React, { useRef, useCallback } from 'react';
import { ImageCard } from '../../components/ImageCard';
import { ImageCardSkeleton } from '../../components/ImageCardSkeleton';
import { PixabayImage } from '@/types/pixabay';
import { LoadingIndicator } from './LoadingIndicator';
import { ErrorState } from './ErrorState';
import { EmptyState } from './EmptyState';
import { ImageCounter } from './ImageCounter';
import { EndOfResultsMessage } from './EndOfResultsMessage';

interface ImageGridProps {
    images: PixabayImage[];
    isLoading: boolean;
    isError: boolean;
    searchQuery?: string;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
    fetchNextPage: () => void;
    totalHits?: number;
}

export const ImageGrid = React.memo(({
    images,
    isLoading,
    isError,
    searchQuery,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    totalHits = 0
}: ImageGridProps) => {
    const observer = useRef<IntersectionObserver | null>(null);
    const lastImageRef = useCallback((node: HTMLDivElement) => {
        if (isLoading || isFetchingNextPage) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        });

        if (node) observer.current.observe(node);
    }, [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage]);

    const handleRetry = useCallback(() => {
        window.location.reload();
    }, []);

    if (isError) {
        return <ErrorState onRetry={handleRetry} />;
    }

    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (images.length === 0) {
        return <EmptyState searchQuery={searchQuery} />;
    }

    return (
        <>
            {totalHits > 0 && (
                <ImageCounter totalHits={totalHits} searchQuery={searchQuery} />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((image, index) => {
                    if (images.length === index + 1) {
                        return (
                            <div ref={lastImageRef} key={`${image.id}-${index}`}>
                                <ImageCard image={image} />
                            </div>
                        );
                    } else {
                        return <ImageCard key={`${image.id}-${index}`} image={image} />;
                    }
                })}

                {isFetchingNextPage && (
                    <>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <ImageCardSkeleton key={`scroll-skeleton-${index}`} />
                        ))}
                    </>
                )}
            </div>

            {isFetchingNextPage && (
                <LoadingIndicator count={0} isInfiniteScroll={true} />
            )}

            {/* ფინალლლ ჩექ */}
            {!hasNextPage && images.length > 0 && (
                <EndOfResultsMessage />
            )}
        </>
    );
});