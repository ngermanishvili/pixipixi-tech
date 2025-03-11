import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useImageDetails } from '@/hooks/useImages';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Package } from 'lucide-react';

import {
    UserInfo,
    ImageTags,
    ImageStatistics,
    TechnicalDetails
} from '../components/image-details';

export const ImageDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const {
        data: image,
        isLoading,
        isError
    } = useImageDetails(Number(id));

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header
                    showSearch={false}
                    showBackButton={true}
                />
                <div className="flex-grow bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        Loading ....
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (isError || !image) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header
                    showSearch={false}
                    showBackButton={true}

                />
                <div className="flex-grow bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
                            <Package size={24} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Image not found
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            The image you are looking for doesn't exist or has been removed.
                        </p>
                        <Button onClick={() => navigate('/')} className="w-full">
                            Back to Gallery
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const tags = image.tags.split(',').map(tag => tag.trim());

    const aspectRatio = image.imageWidth / image.imageHeight;
    const isLandscape = aspectRatio > 1;

    return (
        <div className="flex flex-col min-h-screen">
            <Header
                showSearch={false}
                showBackButton={true}
            />
            <main className="flex-grow bg-gray-50 dark:bg-gray-900  duration-300 py-4 sm:py-6 lg:py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transition-all duration-300">
                        <div className="flex flex-col lg:flex-row">
                            <div className="w-full p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800  border-gray-100 dark:border-gray-700">
                                <UserInfo image={image} />

                                <div className="mt-4 mb-6">
                                    <div className={`relative flex items-center justify-center ${isLandscape ? 'w-full' : 'h-full'}`}>
                                        <img
                                            src={image.largeImageURL}
                                            alt={image.tags}
                                            className={`
                                                ${isLandscape ? 'w-full h-auto' : 'h-full w-auto'} 
                                                object-contain transition-opacity duration-300
                                                max-h-[30vh] sm:max-h-[40vh] lg:max-h-[50vh]
                                                ${isImageLoaded ? 'opacity-100' : 'opacity-0'}
                                            `}
                                            onLoad={() => setIsImageLoaded(true)}
                                            loading="eager"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <ImageTags tags={tags} />
                                    <ImageStatistics image={image} />
                                    <TechnicalDetails image={image} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};