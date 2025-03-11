import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { searchImages, getImageById } from '@/services/pixabayService';
import { PixabayImage, PixabayResponse } from '@/types/pixabay';

export function useImages(query = '') {
    return useInfiniteQuery<PixabayResponse, Error>({
        queryKey: ['images', query],
        queryFn: ({ pageParam }) => searchImages(query, pageParam as number, 20),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const loadedImagesCount = allPages.length * 20;
            return loadedImagesCount < lastPage.totalHits ? allPages.length + 1 : undefined;
        },
        staleTime: 1000 * 60 * 5,
    });
}

export function useImageDetails(id: number) {
    return useQuery<PixabayImage, Error>({
        queryKey: ['image', id],
        queryFn: () => getImageById(id),
        staleTime: 1000 * 60 * 60,
    });
}

export interface ImageFilterOptions {
    q?: string;
    category?: string;
    colors?: string[];
    orientation?: 'all' | 'horizontal' | 'vertical';
    order?: 'popular' | 'latest';
    perPage?: number;
    page?: number;
}

export function useImageSearch() {
    const [filters, setFilters] = useState<ImageFilterOptions>({
        q: '',
        category: '',
        colors: [],
        orientation: 'all',
        order: 'popular',
        perPage: 20,
        page: 1
    });

    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [filters]);

    const { data, isLoading, isError, refetch } = useQuery<PixabayResponse, Error>({
        queryKey: ['filtered-images', debouncedFilters],
        queryFn: () => {
            let params: any = {
                page: debouncedFilters.page || 1,
                per_page: debouncedFilters.perPage || 20
            };

            if (debouncedFilters.q) params.q = debouncedFilters.q;
            if (debouncedFilters.category) params.category = debouncedFilters.category;
            if (debouncedFilters.colors && debouncedFilters.colors.length > 0)
                params.colors = debouncedFilters.colors.join(',');
            if (debouncedFilters.orientation && debouncedFilters.orientation !== 'all')
                params.orientation = debouncedFilters.orientation;
            if (debouncedFilters.order) params.order = debouncedFilters.order;
            return searchImages(params.q || '', params.page, params.per_page);
        },
        staleTime: 1000 * 60 * 5,
    });

    const updateFilters = (newFilters: Partial<ImageFilterOptions>) => {
        setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
    };

    const nextPage = () => {
        setFilters(prev => ({ ...prev, page: (prev.page || 1) + 1 }));
    };

    const prevPage = () => {
        setFilters(prev => ({
            ...prev,
            page: Math.max(1, (prev.page || 2) - 1)
        }));
    };

    const resetFilters = () => {
        setFilters({
            q: '',
            category: '',
            colors: [],
            orientation: 'all',
            order: 'popular',
            perPage: 20,
            page: 1
        });
    };

    return {
        filters,
        updateFilters,
        nextPage,
        prevPage,
        resetFilters,
        data,
        isLoading,
        isError,
        refetch
    };
}