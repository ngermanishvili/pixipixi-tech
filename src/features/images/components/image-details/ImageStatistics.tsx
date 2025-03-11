import React from 'react';
import { Eye, ThumbsUp, MessageSquare, Star, Download, BarChart2 } from 'lucide-react';
import { StatCard } from './StatCard';
import { PixabayImage } from '@/types/pixabay'; // შეცვალეთ თქვენი Image ტიპის იმპორტი

interface ImageStatisticsProps {
    image: PixabayImage;
}

export const ImageStatistics = React.memo(({ image }: ImageStatisticsProps) => {
    return (
        <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center mb-4">
                <BarChart2 className="h-4 w-4 mr-2" />
                IMAGE STATISTICS
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <StatCard
                    title="Views"
                    value={image.views}
                    icon={<Eye className="h-4 w-4 text-blue-500 dark:text-blue-400 cursor-pointer" />}
                    color="blue"
                />
                <StatCard
                    title="Likes"
                    value={image.likes}
                    icon={<ThumbsUp className="h-4 w-4 text-pink-500 dark:text-pink-400 cursor-pointer" />}
                    color="pink"
                />
                <StatCard
                    title="Comments"
                    value={image.comments}
                    icon={<MessageSquare className="h-4 w-4 text-purple-500 dark:text-purple-400 cursor-pointer" />}
                    color="purple"
                />
                <StatCard
                    title="Favorites"
                    value={image.collections}
                    icon={<Star className="h-4 w-4 text-amber-500 dark:text-amber-400 cursor-pointer" />}
                    color="amber"
                />
                <StatCard
                    title="Downloads"
                    value={image.downloads}
                    icon={<Download className="h-4 w-4 text-emerald-500 dark:text-emerald-400 cursor-pointer" />}
                    color="emerald"
                />
            </div>
        </div>
    );
});