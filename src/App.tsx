import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About';

function App() {
    const location = useLocation();

    return (
        <>
            <Layout>
                <ScrollToTop />
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                    </Routes>
                </AnimatePresence>
            </Layout>
        </>
    );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ minHeight: 'calc(100vh - 120px)', padding: '20px' }} // 保持页面有些padding
        >
            {children}
        </motion.div>
    );
}

export default App;
