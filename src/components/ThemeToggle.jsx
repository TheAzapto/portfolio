import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import '../style/themetoggle.css';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className={`theme-toggle ${theme}`}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <span className="theme-toggle-knob">
                {theme === 'light' ? <Sun size={14} /> : <Moon size={14} />}
            </span>
        </button>
    );
}
