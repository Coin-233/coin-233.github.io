import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Terminal from '../components/Terminal';
import {useState} from "react";

const menuItems = [
    { name: 'Homepage', path: '/' },
    { name: 'About', path: '/about' }
];

function Header() {
    const location = useLocation();
    const currentIndex = menuItems.findIndex(item => item.path === location.pathname);
    const [clickCount, setClickCount] = useState(0)

    const handleLocationClick = () => {
        setClickCount(prev => prev + 1)
    }

    return (
        <motion.div
            className="container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/*<p className="location">&gt; here</p>*/}
            {clickCount < 5 ? (
                <p className="location" onClick={handleLocationClick}>
                    &gt; here
                </p>
            ) : (
                <Terminal />
            )}
            <header>
                <h1>Disorientation</h1>

                <nav className="nav" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    flexWrap: 'wrap',
                    position: 'relative',
                }}>
                    {menuItems.map((item, index) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                position: 'relative',
                                cursor: 'pointer',
                                padding: '8px 4px',
                                textDecoration: 'none',
                                color: '#ff6b6b',
                                userSelect: 'none',
                            }}
                        >
                            {item.name}
                            {currentIndex === index && (
                                <motion.div
                                    layoutId="nav-underline"
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        height: '3px',
                                        backgroundColor: 'white',
                                        borderRadius: '2px',
                                    }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 500,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </Link>
                    ))}
                </nav>
            </header>
        </motion.div>
    );
}

export default Header;
