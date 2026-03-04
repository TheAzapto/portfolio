import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        textAlign: 'center',
    };

    return (
        <>
            <Navbar />
            <div style={containerStyle}>
                <motion.h1
                    style={{ fontSize: "8rem", fontWeight: "bold", marginBottom: "0", lineHeight: 1 }}
                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        mass: 1.2,
                        delay: 0.2,
                    }}
                >
                    404
                </motion.h1>

                <motion.h2
                    style={{ fontSize: "1.8rem", fontWeight: "600", marginTop: "0.5rem", color: 'var(--accent-color)' }}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    Not Found
                </motion.h2>

                <motion.p
                    style={{ fontSize: "1.2rem", marginBottom: "0", marginTop: "1rem", opacity: 0.7 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.7 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    Oops! Looks like you are lost.
                </motion.p>

                <motion.p
                    style={{ fontSize: "1.2rem", marginBottom: "2rem", marginTop: "0.5rem", opacity: 0.5, fontStyle: 'italic' }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.5 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                >
                    Exploration can be fun, but not here.
                </motion.p>

                <motion.button
                    onClick={() => navigate('/')}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: 1.2,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Back to Home
                </motion.button>
            </div>
        </>
    )
}

export default NotFound