import React from 'react';
import { User } from 'lucide-react';
import { PixabayImage } from '@/types/pixabay';

interface UserInfoProps {
    image: PixabayImage;
}

export const UserInfo: React.FC<UserInfoProps> = ({ image }) => {
    return (
        <div className="flex items-center space-x-4 mb-8 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl">
            {image.userImageURL ? (
                <img
                    src={image.userImageURL}
                    alt={image.user}
                    className="w-14 h-14 rounded-full border-2 border-white dark:border-gray-600 shadow-md"
                />
            ) : (
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-800 flex items-center justify-center border-2 border-white dark:border-gray-600 shadow-md">
                    <span className="text-xl font-bold text-white">
                        {image.user.charAt(0).toUpperCase()}
                    </span>
                </div>
            )}

            <div className="flex items-center">

                <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        {image.user}
                    </h3>
                    <div className="flex items-center mt-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Pixabay Contributor
                        </p>

                    </div>
                </div>
            </div>

            <div className="ml-auto">
                <a
                    href={`https://pixabay.com/users/${image.user.toLowerCase()}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                    <User className="h-3 w-3 mr-1" />
                    View Profile
                </a>
            </div>
        </div>
    );
};