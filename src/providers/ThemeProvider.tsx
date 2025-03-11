import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const THEME_LIGHT = 'app-theme-light';
const THEME_DARK = 'app-theme-dark';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    // Start with light theme as default
    const [theme, setTheme] = useState<Theme>('light');
    const isDark = theme === 'dark';

    // Apply theme effect
    useEffect(() => {
        // First try to get from localStorage
        const savedTheme = localStorage.getItem('app-theme');
        const initialTheme = (savedTheme === 'light' || savedTheme === 'dark')
            ? savedTheme as Theme
            : 'light'; // Force light as default

        setTheme(initialTheme);
    }, []);


    useEffect(() => {
        document.body.classList.remove(THEME_LIGHT, THEME_DARK);
        document.documentElement.classList.remove('dark', 'light');

        if (theme === 'dark') {
            document.body.classList.add(THEME_DARK);
        } else {
            document.body.classList.add(THEME_LIGHT);
        }
        localStorage.setItem('app-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            console.log('Theme toggled to:', newTheme);
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
};
