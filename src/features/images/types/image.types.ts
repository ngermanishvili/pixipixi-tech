export interface Image {
    id: number;
    pageURL: string;
    type: string;
    tags: string;
    previewURL: string;
    previewWidth: number;
    previewHeight: number;
    webformatURL: string;
    webformatWidth: number;
    webformatHeight: number;
    largeImageURL: string;
    imageWidth: number;
    imageHeight: number;
    imageSize: number;
    views: number;
    downloads: number;
    collections: number;
    likes: number;
    comments: number;
    user_id: number;
    user: string;
    userImageURL: string;
}

export interface ImageResponse {
    total: number;
    totalHits: number;
    hits: Image[];
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

export enum ImageCategory {
    ALL = '',
    BACKGROUNDS = 'backgrounds',
    FASHION = 'fashion',
    NATURE = 'nature',
    SCIENCE = 'science',
    EDUCATION = 'education',
    FEELINGS = 'feelings',
    HEALTH = 'health',
    PEOPLE = 'people',
    RELIGION = 'religion',
    PLACES = 'places',
    ANIMALS = 'animals',
    INDUSTRY = 'industry',
    COMPUTER = 'computer',
    FOOD = 'food',
    SPORTS = 'sports',
    TRANSPORTATION = 'transportation',
    TRAVEL = 'travel',
    BUILDINGS = 'buildings',
    BUSINESS = 'business',
    MUSIC = 'music'
}

export enum ImageColor {
    GRAYSCALE = 'grayscale',
    TRANSPARENT = 'transparent',
    RED = 'red',
    ORANGE = 'orange',
    YELLOW = 'yellow',
    GREEN = 'green',
    TURQUOISE = 'turquoise',
    BLUE = 'blue',
    LILAC = 'lilac',
    PINK = 'pink',
    WHITE = 'white',
    GRAY = 'gray',
    BLACK = 'black',
    BROWN = 'brown'
}

export enum ImageOrientation {
    ALL = 'all',
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
}

export enum ImageOrder {
    POPULAR = 'popular',
    LATEST = 'latest'
}