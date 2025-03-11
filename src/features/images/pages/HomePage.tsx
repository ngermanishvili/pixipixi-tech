import React, { useCallback, useMemo } from 'react';
import { useImages } from '@/hooks/useImages';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ImageFilter } from '../components/ImageFilter';
import { ImageGrid } from '../components/image-grid';
import { ImageSearchProvider, useImageSearch } from '../components/search/ImageSearchContext';

const HomePageContentBase: React.FC = () => {
    const {
        searchQuery,
        debouncedQuery,
        filters,
        updateFilters,
        resetFilters
    } = useImageSearch();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError
    } = useImages(debouncedQuery);

    const handleFilterChange = useCallback((newFilters: { q?: string }) => {
        updateFilters(newFilters);
    }, [updateFilters]);

    const handleResetFilters = useCallback(() => {
        resetFilters();
    }, [resetFilters]);

    const handleFetchNextPage = useCallback(() => {
        fetchNextPage();
    }, [fetchNextPage]);

    const images = useMemo(() =>
        data?.pages.flatMap(page => page.hits) || []
        , [data?.pages]);

    const totalHits = useMemo(() =>
        data?.pages[0]?.totalHits || 0
        , [data?.pages]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Header
                showSearch={true}
                searchQuery={searchQuery}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <ImageFilter
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onResetFilters={handleResetFilters}
                />
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ImageGrid
                    images={images}
                    isLoading={isLoading}
                    isError={isError}
                    searchQuery={debouncedQuery}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    fetchNextPage={handleFetchNextPage}
                    totalHits={totalHits}
                />
            </main>
            <Footer />
        </div>
    );
};


const HomePageContent = React.memo(HomePageContentBase);

export const HomePage: React.FC = () => {
    return (
        <ImageSearchProvider>
            <HomePageContent />
        </ImageSearchProvider>
    );
};