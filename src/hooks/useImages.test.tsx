import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useImages, useImageDetails, useImageSearch } from './useImages';
import { searchImages, getImageById } from '@/services/pixabayService';
import { act } from 'react';
import { describe, test, expect, beforeEach, vi } from 'vitest';

// Mock the pixabayService
vi.mock('@/services/pixabayService');

// Mock data
const mockImageData = {
    id: 1,
    pageURL: 'https://example.com/image1',
    type: 'photo',
    tags: 'nature, landscape, mountain',
    previewURL: 'https://example.com/preview1.jpg',
    previewWidth: 150,
    previewHeight: 100,
    webformatURL: 'https://example.com/webformat1.jpg',
    webformatWidth: 800,
    webformatHeight: 600,
    largeImageURL: 'https://example.com/large1.jpg',
    imageWidth: 1920,
    imageHeight: 1080,
    imageSize: 1024000,
    views: 1000,
    downloads: 500,
    collections: 100,
    likes: 200,
    comments: 50,
    user_id: 101,
    user: 'testuser',
    userImageURL: 'https://example.com/user1.jpg'
};

const mockPixabayResponse = {
    total: 100,
    totalHits: 50,
    hits: [mockImageData]
};

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

describe('useImages', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        vi.mocked(searchImages).mockResolvedValue(mockPixabayResponse);
        vi.mocked(getImageById).mockResolvedValue(mockImageData);
    });

    test('useImages should fetch images with default parameters when no query is provided', async () => {
        const { result } = renderHook(() => useImages(), { wrapper: createWrapper() });
        expect(result.current.isLoading).toBe(true);
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(searchImages).toHaveBeenCalledWith('', 1, 20);
        expect(result.current.data?.pages[0]).toEqual(mockPixabayResponse);
    });

    test('useImages should fetch images with the provided query', async () => {
        const testQuery = 'nature';
        const { result } = renderHook(() => useImages(testQuery), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(searchImages).toHaveBeenCalledWith(testQuery, 1, 20);
        expect(result.current.data?.pages[0]).toEqual(mockPixabayResponse);
    });

    test('useImages should fetch the next page when fetchNextPage is called', async () => {
        const { result } = renderHook(() => useImages(), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        vi.mocked(searchImages).mockResolvedValueOnce({
            ...mockPixabayResponse,
            hits: [{ ...mockImageData, id: 2 }]
        });

        act(() => {
            result.current.fetchNextPage();
        });

        await waitFor(() => expect(result.current.data?.pages.length).toBe(2));
        expect(searchImages).toHaveBeenCalledWith('', 2, 20);
    });
});

describe('useImageDetails', () => {
    test('should fetch image details by id', async () => {
        const imageId = 1;
        const { result } = renderHook(() => useImageDetails(imageId), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(getImageById).toHaveBeenCalledWith(imageId);
        expect(result.current.data).toEqual(mockImageData);
    });
});

describe('useImageSearch', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        vi.mocked(searchImages).mockResolvedValue(mockPixabayResponse);
    });

    test('should initialize with default filter values', () => {
        const { result } = renderHook(() => useImageSearch(), { wrapper: createWrapper() });

        expect(result.current.filters).toEqual({
            q: '',
            category: '',
            colors: [],
            orientation: 'all',
            order: 'popular',
            perPage: 20,
            page: 1
        });
    });

    test('should update filters when updateFilters is called', async () => {
        vi.useFakeTimers();

        vi.mocked(searchImages).mockClear();

        const { result } = renderHook(() => useImageSearch(), { wrapper: createWrapper() });
        vi.mocked(searchImages).mockClear();
        act(() => {
            result.current.updateFilters({ q: 'landscape', category: 'nature' });
        });
        expect(result.current.filters).toEqual({
            q: 'landscape',
            category: 'nature',
            colors: [],
            orientation: 'all',
            order: 'popular',
            perPage: 20,
            page: 1
        });
        act(() => {
            vi.advanceTimersByTime(500);
        });
        expect(searchImages).toHaveBeenCalledTimes(1);
        expect(searchImages).toHaveBeenCalledWith('landscape', 1, 20);

        vi.useRealTimers();
    });


    test('should handle debouncing correctly', async () => {
        vi.useFakeTimers();

        // Clear any previous calls
        vi.mocked(searchImages).mockClear();

        const { result } = renderHook(() => useImageSearch(), { wrapper: createWrapper() });

        // Clear initial call
        vi.mocked(searchImages).mockClear();

        // Fast-forward to complete any initial debounced search
        act(() => {
            vi.advanceTimersByTime(500);
        });

        // Clear calls after initial setup
        vi.mocked(searchImages).mockClear();

        // Update query multiple times quickly
        act(() => {
            result.current.updateFilters({ q: 'test1' });
            // Wait a bit but not enough to trigger debounce
            vi.advanceTimersByTime(100);

            result.current.updateFilters({ q: 'test2' });
            vi.advanceTimersByTime(100);

            result.current.updateFilters({ q: 'test3' });
        });

        // Before timeout completes, searchImages should not have been called again
        expect(searchImages).toHaveBeenCalledTimes(0);

        // Fast-forward to complete the debounce timeout
        act(() => {
            vi.advanceTimersByTime(500);
        });

        // After timeout, should have made one call with the final value
        expect(searchImages).toHaveBeenCalledTimes(1);

        // Should use the last value ('test3')
        expect(searchImages).toHaveBeenCalledWith('test3', 1, 20);

        vi.useRealTimers();
    });
});