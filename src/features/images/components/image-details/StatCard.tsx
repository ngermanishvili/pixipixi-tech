import React, { ReactNode, useMemo } from 'react';

interface StatCardProps {
    title: string;
    value: number;
    icon: ReactNode;
    color: string;
}

export const StatCard = React.memo(({ title, value, icon, color }: StatCardProps) => {
    // Tailwind-ში სტილების დინამიურად გამოყენება არ მუშაობს purgecss-ის გამო,
    // ასე რომ გვჭირდება ექსპლიციტური კლასები ყველა შესაძლო ფერისთვის
    const getColorClasses = (colorName: string) => {
        const classMap: Record<string, {
            container: string,
            iconBg: string,
            title: string,
            value: string
        }> = {
            blue: {
                container: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
                iconBg: "bg-blue-100 dark:bg-blue-800/30",
                title: "text-blue-700 dark:text-white",
                value: "text-blue-900 dark:text-white"
            },
            pink: {
                container: "bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20",
                iconBg: "bg-pink-100 dark:bg-pink-800/30",
                title: "text-pink-700 dark:text-white",
                value: "text-pink-900 dark:text-white"
            },
            purple: {
                container: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
                iconBg: "bg-purple-100 dark:bg-purple-800/30",
                title: "text-purple-700 dark:text-white",
                value: "text-purple-900 dark:text-white"
            },
            amber: {
                container: "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20",
                iconBg: "bg-amber-100 dark:bg-amber-800/30",
                title: "text-amber-700 dark:text-white",
                value: "text-amber-900 dark:text-white"
            },
            emerald: {
                container: "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20",
                iconBg: "bg-emerald-100 dark:bg-emerald-800/30",
                title: "text-emerald-700 dark:text-white",
                value: "text-emerald-900 dark:text-white"
            },
            default: {
                container: "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20",
                iconBg: "bg-gray-100 dark:bg-gray-800/30",
                title: "text-gray-700 dark:text-white",
                value: "text-gray-900 dark:text-white"
            }
        };

        return classMap[colorName] || classMap.default;
    };

    // მემოიზაცია სტილების კლასებისთვის
    const colorClasses = useMemo(() => getColorClasses(color), [color]);

    return (
        <div className={`${colorClasses.container} p-4 rounded-xl shadow-sm`}>
            <div className="flex items-center">
                <div className={`rounded-full ${colorClasses.iconBg} p-2 mr-3`}>
                    {icon}
                </div>
                <h4 className={`text-xs font-medium ${colorClasses.title}`}>
                    {title}
                </h4>
            </div>
            <p className={`mt-2 text-lg font-bold ${colorClasses.value}`}>
                {value.toLocaleString()}
            </p>
        </div>
    );
});