import React, { createContext, useState, useContext, useRef, useEffect, ReactNode, useCallback } from 'react';

interface SearchContextType {
    searchQuery: string;
    debouncedQuery: string;
    setSearchQuery: (query: string) => void;
    resetSearch: () => void;
    filters: {
        q: string;
        page: number;
        perPage: number;
    };
    updateFilters: (newFilters: { q?: string }) => void;
    resetFilters: () => void;
}

//  შევქმენით კონტექსტ default-ად
const ImageSearchContext = createContext<SearchContextType>({
    searchQuery: '',
    debouncedQuery: '',
    setSearchQuery: () => { },
    resetSearch: () => { },
    filters: {
        q: '',
        page: 1,
        perPage: 20
    },
    updateFilters: () => { },
    resetFilters: () => { }
});

interface ImageSearchProviderProps {
    children: ReactNode;
    defaultPerPage?: number;
}

export const ImageSearchProvider: React.FC<ImageSearchProviderProps> = ({
    children,
    defaultPerPage = 20
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // ფილტრის სთეიღ
    const filters = {
        q: searchQuery,
        page: 1,
        perPage: defaultPerPage
    };

    //  განახლება - მემოიზებული
    const updateFilters = useCallback((newFilters: { q?: string }) => {
        if (newFilters.q !== undefined) {
            setSearchQuery(newFilters.q);

            // დალოდება
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

            timerRef.current = setTimeout(() => {
                setDebouncedQuery(newFilters.q || '');
            }, 500);
        }
    }, []);

    // გაწმენდა - მემოიზებული
    const resetFilters = useCallback(() => {
        setSearchQuery('');
        setDebouncedQuery('');
    }, []);

    // სერჩ ქვერის ვაყენებთ - მემოიზებული
    const handleSetSearchQuery = useCallback((query: string) => {
        setSearchQuery(query);

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);
    }, []);

    // გასუფთავება - მემოიზებული
    const resetSearch = useCallback(() => {
        setSearchQuery('');
        setDebouncedQuery('');
    }, []);

    // ტაიმერის გასუფთავება
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    const contextValue = React.useMemo(() => ({
        searchQuery,
        debouncedQuery,
        setSearchQuery: handleSetSearchQuery,
        resetSearch,
        filters,
        updateFilters,
        resetFilters
    }), [
        searchQuery,
        debouncedQuery,
        handleSetSearchQuery,
        resetSearch,
        filters,
        updateFilters,
        resetFilters
    ]);

    return (
        <ImageSearchContext.Provider value={contextValue}>
            {children}
        </ImageSearchContext.Provider>
    );
};

//! ვიყენებთ ამ ჰუკს 
export const useImageSearch = () => useContext(ImageSearchContext);