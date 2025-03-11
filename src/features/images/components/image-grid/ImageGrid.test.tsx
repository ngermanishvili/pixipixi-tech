import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ImageGrid } from './ImageGrid';
import { PixabayImage } from '@/types/pixabay';
import { BrowserRouter } from 'react-router-dom';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

// Function to render component wrapped in Router
const renderWithRouter = (ui: React.ReactElement) => {
    return render(ui, { wrapper: BrowserRouter });
};

describe('ImageGrid', () => {
    const mockImages: PixabayImage[] = Array(10).fill(null).map((_, i) => ({
        id: i,
        pageURL: `https://example.com/page${i}`,
        tags: `tag${i}`,
        previewURL: `https://example.com/preview${i}.jpg`,
        previewWidth: 150,
        previewHeight: 100,
        webformatURL: `https://example.com/image${i}.jpg`,
        webformatWidth: 640,
        webformatHeight: 480,
        largeImageURL: `https://example.com/large-image${i}.jpg`,
        imageWidth: 800,
        imageHeight: 600,
        imageSize: 512000,
        views: 1000 + i,
        downloads: 200 + i,
        collections: 20 + i,
        likes: 100 + i,
        comments: 50 + i,
        user_id: 1000 + i,
        user: `user${i}`,
        userImageURL: `https://example.com/user${i}.jpg`,
        type: 'photo'
    }));

    const mockFetchNextPage = vi.fn();

    it('should render images correctly', () => {
        renderWithRouter(
            <ImageGrid
                images={mockImages}
                isLoading={false}
                isError={false}
                fetchNextPage={mockFetchNextPage}
                totalHits={100}
            />
        );

        // Instead of counting all images, we can look for specific elements or test user names
        // Each card should show the user name
        mockImages.forEach(image => {
            expect(screen.getByText(image.user)).toBeInTheDocument();
        });

        // Let's just check if all the user names are present in the document
        // This is a more reliable way to test that all images were rendered
        mockImages.forEach(image => {
            expect(screen.getByText(image.user)).toBeInTheDocument();
        });
    });

    it('should render empty state when no images', () => {
        renderWithRouter(
            <ImageGrid
                images={[]}
                isLoading={false}
                isError={false}
                fetchNextPage={mockFetchNextPage}
                searchQuery="nonexistent"
                totalHits={0}
            />
        );

        expect(screen.getByText(/no images found/i)).toBeInTheDocument();
        expect(screen.getByText(/couldn't find any images matching "nonexistent"/i)).toBeInTheDocument();
    });

    it('should render error state when error occurs', () => {
        renderWithRouter(
            <ImageGrid
                images={[]}
                isLoading={false}
                isError={true}
                fetchNextPage={mockFetchNextPage}
                totalHits={0}
            />
        );

        expect(screen.getByText(/failed to load images/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
    });

    it('should trigger fetchNextPage when last image is visible', async () => {
        // Setup the mock to simulate intersection
        mockIntersectionObserver.mockImplementation((callback) => {
            callback([{ isIntersecting: true }]);
            return {
                observe: vi.fn(),
                unobserve: vi.fn(),
                disconnect: vi.fn()
            };
        });

        renderWithRouter(
            <ImageGrid
                images={mockImages}
                isLoading={false}
                isError={false}
                hasNextPage={true}
                fetchNextPage={mockFetchNextPage}
                totalHits={100}
            />
        );

        // IntersectionObserver should trigger fetchNextPage
        await waitFor(() => {
            expect(mockFetchNextPage).toHaveBeenCalled();
        });
    });
});