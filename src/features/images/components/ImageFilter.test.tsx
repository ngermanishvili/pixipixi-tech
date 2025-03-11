import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ImageFilter } from './ImageFilter';

describe('ImageFilter', () => {
    const mockOnFilterChange = vi.fn();
    const mockOnResetFilters = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should update filter on search button click', async () => {
        const user = userEvent.setup();
        render(
            <ImageFilter
                filters={{ q: '', page: 1, perPage: 20 }}
                onFilterChange={mockOnFilterChange}
                onResetFilters={mockOnResetFilters}
            />
        );

        // Type in search box
        await user.type(screen.getByPlaceholderText(/search images/i), 'nature');

        // Click search button - using exact text since there might be multiple buttons
        await user.click(screen.getByText('Search'));

        // Verify filter change was triggered
        expect(mockOnFilterChange).toHaveBeenCalledWith({ q: 'nature' });
    });

    it('should update filter on enter key press', async () => {
        const user = userEvent.setup();
        render(
            <ImageFilter
                filters={{ q: '', page: 1, perPage: 20 }}
                onFilterChange={mockOnFilterChange}
                onResetFilters={mockOnResetFilters}
            />
        );

        // Type in search box and press Enter
        const searchInput = screen.getByPlaceholderText(/search images/i);
        await user.type(searchInput, 'nature{Enter}');

        // Verify filter change was triggered
        expect(mockOnFilterChange).toHaveBeenCalledWith({ q: 'nature' });
    });

    it('should clear search when X button is clicked', async () => {
        // We need to provide an initial search term to make the X button appear
        const user = userEvent.setup();
        const { rerender } = render(
            <ImageFilter
                filters={{ q: 'nature', page: 1, perPage: 20 }}
                onFilterChange={mockOnFilterChange}
                onResetFilters={mockOnResetFilters}
            />
        );

        // The clear button should be visible with text containing "X" or an aria-label
        // Find it by its aria-label
        const clearButton = screen.getByLabelText('Clear search');
        await user.click(clearButton);

        // Verify filter was cleared
        expect(mockOnFilterChange).toHaveBeenCalledWith({ q: '' });
    });

    it('should reset filters when Reset button is clicked', async () => {
        const user = userEvent.setup();
        render(
            <ImageFilter
                filters={{ q: 'nature', page: 1, perPage: 20 }}
                onFilterChange={mockOnFilterChange}
                onResetFilters={mockOnResetFilters}
            />
        );

        // Click reset button by its text content
        await user.click(screen.getByText('Reset'));

        // Verify filter reset was triggered
        expect(mockOnResetFilters).toHaveBeenCalled();
    });
});