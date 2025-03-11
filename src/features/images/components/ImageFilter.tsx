import React, { useState, useCallback } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface ImageFilterProps {
    filters: {
        q?: string;
        page?: number;
        perPage?: number;
    };
    onFilterChange: (filters: { q?: string }) => void;
    onResetFilters: () => void;
}

export const ImageFilter = React.memo(({
    filters,
    onFilterChange,
    onResetFilters
}: ImageFilterProps) => {
    const [searchTerm, setSearchTerm] = useState(filters.q || '');

    const handleSearch = useCallback(() => {
        onFilterChange({ q: searchTerm });
    }, [onFilterChange, searchTerm]);

    const handleClear = useCallback(() => {
        setSearchTerm('');
        onFilterChange({ q: '' });
    }, [onFilterChange]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }, [handleSearch]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6">
            <div className="flex items-center gap-2">
                <div className="relative flex-1">
                    <Input
                        type="text"
                        placeholder="Search images..."
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="pl-10 pr-3 py-2 w-full"
                    />

                    <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                    />
                </div>

                {searchTerm && (
                    <Button
                        variant="ghost"
                        onClick={handleClear}
                        className="flex-shrink-0 h-12 w-12 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        aria-label="Clear search"
                    >
                        <X className="h-6 w-6 text-red-500" />
                    </Button>
                )}

                <Button
                    variant="outline"
                    onClick={handleSearch}
                    className="flex-shrink-0"
                >
                    Search
                </Button>

                <Button
                    variant="outline"
                    onClick={onResetFilters}
                    className="flex-shrink-0 flex items-center gap-1"
                >
                    <Filter className="h-4 w-4 mr-1" />
                    Reset
                </Button>
            </div>
        </div>
    );
});