import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useAuthStore } from '@/store/authStore';
import { Menu, X, User, Search } from 'lucide-react';

interface HeaderProps {
    showSearch?: boolean;
    searchQuery?: string;
    onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    title?: string;
    showBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
    showSearch = true,
    searchQuery = '',
    onSearchChange,
    title = 'pixi-pixi',
    showBackButton = false,
}) => {
    const navigate = useNavigate();
    const { logout, user } = useAuthStore();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    return (
        <header className="bg-white dark:bg-gray-800 shadow sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                {/* Main header row - reduced padding and fixed height */}
                <div className="flex justify-between items-center h-12">
                    <div className="flex items-center space-x-2">
                        {showBackButton && (
                            <button
                                onClick={() => navigate('/')}
                                className="p-1 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                aria-label="Go back"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                        <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">{title}</h1>
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden md:flex items-center space-x-3">
                        <ThemeToggle />

                        {user && (
                            <div className="flex items-center text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                                <User className="h-3 w-3 mr-1" />
                                <span className="truncate max-w-[150px]">{user.email}</span>
                            </div>
                        )}

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={logout}
                            className="text-red-600 dark:text-red-400 border-red-300 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs py-1 px-2 h-auto"
                        >
                            Log out
                        </Button>
                    </div>

                    {/* Mobile navigation controls */}
                    <div className="flex md:hidden items-center space-x-1">
                        {showSearch && onSearchChange && (
                            <button
                                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                                className="p-1 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                aria-label="Toggle search"
                            >
                                <Search className="h-4 w-4" />
                            </button>
                        )}
                        <ThemeToggle />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-1 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Desktop search field */}
                {showSearch && onSearchChange && !mobileSearchOpen && (
                    <div className="mt-2 mb-2 relative hidden md:block">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search images..."
                            value={searchQuery}
                            onChange={onSearchChange}
                            className="block w-full pl-10 pr-4 py-1 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-sm h-8"
                        />
                    </div>
                )}

                {/* Mobile search field - shown when mobile search is toggled */}
                {showSearch && onSearchChange && mobileSearchOpen && (
                    <div className="mt-2 mb-2 relative md:hidden">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search images..."
                            value={searchQuery}
                            onChange={onSearchChange}
                            className="block w-full pl-10 pr-4 py-1 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white text-sm h-8"
                            autoFocus
                        />
                    </div>
                )}
            </div>

            {mobileMenuOpen && (
                <div className="absolute left-0 right-0 bg-white dark:bg-gray-800 shadow-md border-t border-gray-200 dark:border-gray-700 z-10 md:hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                        {user && (
                            <div className="flex items-center text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-md mb-2">
                                <User className="h-3 w-3 mr-2 flex-shrink-0" />
                                <span className="truncate">{user.email}</span>
                            </div>
                        )}

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={logout}
                            className="w-full text-red-600 dark:text-red-400 border-red-300 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs py-1"
                        >
                            Log out
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}