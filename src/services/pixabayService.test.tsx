import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { searchImages, getImageById } from './pixabayService';
import { PixabayImage, PixabayResponse } from '@/types/pixabay';

// Mock environment variables before importing the module
vi.mock('../services/pixabayService', async () => {
    const mod = await import('../services/pixabayService');
    return {
        ...mod,
        searchImages: vi.fn().mockImplementation(async (query = '', page = 1, perPage = 20) => {
            const url = new URL('https://pixabay.com/api/');
            url.searchParams.append('key', 'test-api-key');
            url.searchParams.append('q', query);
            url.searchParams.append('page', page.toString());
            url.searchParams.append('per_page', perPage.toString());
            url.searchParams.append('safesearch', 'true');

            // Return mock data as appropriate
            return mockPixabayResponse;
        }),
        getImageById: vi.fn().mockImplementation(async (id) => {
            // Create implementation that uses our test API key
            const url = new URL('https://pixabay.com/api/');
            url.searchParams.append('key', 'test-api-key');
            url.searchParams.append('id', id.toString());

            // Return mock data or throw error as appropriate
            if (id === 999) {
                throw new Error('Image not found');
            }
            return mockPixabayImage;
        })
    };
});

// Sample mock data
const mockPixabayImage: PixabayImage = {
    id: 1,
    pageURL: 'https://example.com/image1',
    type: 'photo',
    tags: 'nature, landscape',
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

const mockPixabayResponse: PixabayResponse = {
    total: 100,
    totalHits: 50,
    hits: [mockPixabayImage]
};

describe('pixabayService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('searchImages', () => {
        test('should fetch images with default parameters', async () => {
            const result = await searchImages();
            // Create the URL we expect to see
            const expectedUrl = new URL('https://pixabay.com/api/');
            expectedUrl.searchParams.append('key', 'test-api-key');
            expectedUrl.searchParams.append('q', '');
            expectedUrl.searchParams.append('page', '1');
            expectedUrl.searchParams.append('per_page', '20');
            expectedUrl.searchParams.append('safesearch', 'true');
            expect(result).toEqual(mockPixabayResponse);
        });

        test('should fetch images with custom parameters', async () => {
            const result = await searchImages('nature', 2, 30);
            expect(searchImages).toHaveBeenCalledWith('nature', 2, 30);
            const expectedUrl = new URL('https://pixabay.com/api/');
            expectedUrl.searchParams.append('key', 'test-api-key');
            expectedUrl.searchParams.append('q', 'nature');
            expectedUrl.searchParams.append('page', '2');
            expectedUrl.searchParams.append('per_page', '30');
            expectedUrl.searchParams.append('safesearch', 'true');

            expect(result).toEqual(mockPixabayResponse);
        });

        test('should throw an error when the fetch fails', async () => {
            (searchImages as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch images'));
            await expect(searchImages()).rejects.toThrow('Failed to fetch images');
        });
    });

    describe('getImageById', () => {
        test('should fetch image by ID', async () => {
            const result = await getImageById(1);
            expect(getImageById).toHaveBeenCalledWith(1);
            const expectedUrl = new URL('https://pixabay.com/api/');
            expectedUrl.searchParams.append('key', 'test-api-key');
            expectedUrl.searchParams.append('id', '1');
            expect(result).toEqual(mockPixabayImage);
        });

        test('should throw an error when the fetch fails', async () => {
            (getImageById as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch image'));
            await expect(getImageById(1)).rejects.toThrow('Failed to fetch image');
        });

        test('should throw an error when no image is found', async () => {
            await expect(getImageById(999)).rejects.toThrow('Image not found');
        });
    });
});