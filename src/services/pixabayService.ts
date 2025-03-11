import { PixabayImage, PixabayResponse } from '@/types/pixabay';

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
const BASE_URL = 'https://pixabay.com/api/';

export async function searchImages(query = '', page = 1, perPage = 20): Promise<PixabayResponse> {
    const url = new URL(BASE_URL);

    url.searchParams.append('key', API_KEY);
    url.searchParams.append('q', query);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('per_page', perPage.toString());
    url.searchParams.append('safesearch', 'true');

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error('Failed to fetch images');
    }

    return response.json();
}

export async function getImageById(id: number): Promise<PixabayImage> {
    const url = new URL(BASE_URL);

    url.searchParams.append('key', API_KEY);
    url.searchParams.append('id', id.toString());

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error('Failed to fetch image');
    }

    const data = await response.json();

    if (!data.hits || data.hits.length === 0) {
        throw new Error('Image not found');
    }

    return data.hits[0];
}