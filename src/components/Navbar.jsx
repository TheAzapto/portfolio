import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import "../style/navbar.css";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
    const navigate = useNavigate();
    const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
    const [menuClass, setMenuClass] = useState("menu hidden");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        if (!isMenuOpen) {
            setBurgerClass("burger-bar clicked");
            setMenuClass("menu visible");
        } else {
            setBurgerClass("burger-bar unclicked");
            setMenuClass("menu hidden");
        }
        setIsMenuOpen(!isMenuOpen);
    };

    const menuItems = [
        { label: 'Home', path: '/' },
        { label: 'Project', path: '/project' },
        { label: 'Contact', path: '/contact' },
    ];

    const handleNavigate = (path) => {
        toggleMenu();
        setTimeout(() => navigate(path), 300);
    };

    return (
        <motion.div
            className="navbar"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        >
            <div className="logo" onClick={() => navigate('/')}></div>
            <nav>
                <ThemeToggle />
                <div className="burger-menu" onClick={toggleMenu}>
                    <span className={burgerClass}></span>
                    <span className={burgerClass}></span>
                    <span className={burgerClass}></span>
                </div>
            </nav>
            <div className={menuClass}>
                <ul>
                    <AnimatePresence>
                        {isMenuOpen && menuItems.map((item, idx) => (
                            <motion.li
                                key={item.path}
                                onClick={() => handleNavigate(item.path)}
                                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                exit={{ y: -30, opacity: 0 }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.1 + idx * 0.08,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                            >
                                {item.label}
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>
                <div className="holder"></div>
            </div>
        </motion.div>
    )
}

export default Navbar;