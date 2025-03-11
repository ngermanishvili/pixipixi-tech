import React from 'react';
import { Settings, Image as ImageIcon, HardDrive, FileType } from 'lucide-react';
import { DetailRow } from './DetailRow';
import { formatFileSize } from '../../utils/formatters';
import { PixabayImage } from '@/types/pixabay';

interface TechnicalDetailsProps {
    image: PixabayImage;
}

export const TechnicalDetails: React.FC<TechnicalDetailsProps> = ({ image }) => {
    return (
        <div className="bg-gray-50 dark:bg-gray-700/20 p-5 rounded-xl">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center mb-4">
                <Settings className="h-4 w-4 mr-2" />
                TECHNICAL DETAILS
            </h3>

            <div className="space-y-4 text-sm">
                <DetailRow
                    icon={<ImageIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
                    label="DIMENSIONS"
                    value={`${image.imageWidth} × ${image.imageHeight} pixels`}
                />
                <DetailRow
                    icon={<HardDrive className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
                    label="FILE SIZE"
                    value={formatFileSize(image.imageSize)}
                />
                <DetailRow
                    icon={<FileType className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
                    label="FILE TYPE"
                    value={image.type.toUpperCase()}
                />
            </div>
        </div>
    );
};