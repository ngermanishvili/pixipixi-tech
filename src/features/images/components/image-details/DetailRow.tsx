import React, { ReactNode } from 'react';

interface DetailRowProps {
    icon: ReactNode;
    label: string;
    value: string | number;
}

export const DetailRow = React.memo(({ icon, label, value }: DetailRowProps) => {
    return (
        <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-4">
                {icon}
            </div>
            <div className="flex-1">
                <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">{label}</div>
                <div className="font-medium text-gray-900 dark:text-white">
                    {value}
                </div>
            </div>
        </div>
    );
});