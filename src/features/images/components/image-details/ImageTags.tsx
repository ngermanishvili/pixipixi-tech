import React, { useMemo } from 'react';
import { Tag } from 'lucide-react';

interface ImageTagsProps {
    tags: string[];
}

export const ImageTags = React.memo(({ tags }: ImageTagsProps) => {
    // ტეგებისთვის ფერების გენერირება
    const tagStyles = useMemo(() => {
        return tags.map((_, index) => {
            const hue = (index * 20) % 360;
            return {
                backgroundColor: `hsla(${hue}, 70%, 95%, 1)`,
                color: `hsla(${hue}, 70%, 30%, 1)`,
            };
        });
    }, [tags]);

    return (
        <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center mb-3">
                <Tag className="h-4 w-4 mr-2" />
                TAGS
            </h3>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        style={tagStyles[index]}
                        className="px-3 py-1.5 rounded-full text-xs font-medium hover:shadow-md transition-all duration-200 transform hover:scale-105 cursor-pointer dark:bg-opacity-20 dark:text-opacity-90"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
});