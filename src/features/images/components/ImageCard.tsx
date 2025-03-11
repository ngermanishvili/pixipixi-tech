import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Download, ExternalLink, Maximize, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Image } from '../types/image.types';

interface ImageCardProps {
    image: Image;
    onLike?: (image: Image) => void;
    onDownload?: (image: Image) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({
    image,
    onLike,
    onDownload
}) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const tags = image.tags.split(',').map(tag => tag.trim()).slice(0, 3);

    // ფორმატს უკეთებს რიცხვებს
    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onLike) onLike(image);
    };

    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onDownload) onDownload(image);
        else {
            const link = document.createElement('a');
            link.href = image.largeImageURL;
            link.download = `image-${image.id}.jpg`;
            link.click();
        }
    };

    const navigateToDetail = () => {
        navigate(`/images/${image.id}`);
    };

    return (
        <div
            className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 h-full flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="relative cursor-pointer overflow-hidden"
                style={{ paddingBottom: '75%' }}
                onClick={navigateToDetail}
            >
                {!isImageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                )}
                <img
                    src={image.webformatURL}
                    srcSet={`${image.webformatURL} 640w, ${image.largeImageURL} 1280w`}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    alt={image.tags}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 
                        ${isHovered ? 'scale-110 brightness-90' : 'scale-100'}
                        ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setIsImageLoaded(true)}
                    loading="lazy"

                />

                <div
                    className={`absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 flex items-center justify-center
                    ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div className="flex space-x-3">
                        <button
                            onClick={handleLike}
                            className="flex items-center cursor-pointer justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 transition-all hover:scale-110 shadow-lg"
                            aria-label="Like image"
                        >
                            <Heart size={14} />
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex items-center cursor-pointer justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition-all hover:scale-110 shadow-lg"
                            aria-label="Download image"
                        >
                            <Download size={14} />
                        </button>

                    </div>
                </div>
            </div>

            <div className="p-4 flex-grow flex flex-col">
                <div className="flex items-center space-x-2 mb-3">
                    {image.userImageURL ? (
                        <img
                            src={image.userImageURL}
                            alt={image.user}
                            className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 object-cover"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold">
                            {image.user.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <a
                        href={`https://pixabay.com/users/${image.user.toLowerCase()}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {image.user}
                        <ExternalLink size={12} className="ml-1 opacity-70" />
                    </a>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center mt-auto">
                    <div className="flex space-x-3 text-gray-500 dark:text-gray-400 text-xs">
                        <div className="flex items-center">
                            <Heart size={14} className="mr-1" />
                            {formatNumber(image.likes)}
                        </div>
                        <div className="flex items-center">
                            <Download size={14} className="mr-1" />
                            {formatNumber(image.downloads)}
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={navigateToDetail}
                        className="text-xs cursor-pointer"
                    >
                        View Details
                    </Button>
                </div>
            </div>
        </div>
    );
};