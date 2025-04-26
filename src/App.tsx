import { useState } from 'react';
import Header from './components/Header'
import Quote from './components/Quote'
import Section from './components/Section'
import ContactButtons from './components/ContactButtons'
import { IoIosGitBranch } from "react-icons/io";
import { motion } from 'framer-motion'
import Terminal from './components/Terminal';

function App() {
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
            <Header />
            <Quote />
            <p><strong>空白</strong> 是一个普通的互联网用户。</p>

            <Section title="简介">
                <ul>
                    <li><strong>游戏</strong>
                        <ul>
                            <li>似乎只喜欢音游</li>
                            <li>最不擅长竞技游戏，也不喜欢</li>
                        </ul>
                    </li>
                    <li><strong>喜欢的作品</strong>
                        <ul>
                            <li>废萌最和我胃口了</li>
                            <li>说到神作我认为是《<a href='https://bgm.tv/subject/9912' style={{ color:'#fb7299'}} >日常</a>》</li>
                            <li>galgame纯音乐，各类番剧OPED</li>

                        </ul>
                    </li>
                    <li>总想学新东西，总没有时间</li>
                </ul>
            </Section>

            <Section title="联系方式">
                <p>你可以在下面找到我：</p>
                <ContactButtons />
            </Section>

            <footer>
                Last Update 2025-04-26<br />
                <IoIosGitBranch /> {import.meta.env.VITE_COMMIT_ID}
            </footer>
        </motion.div>
    )
}

export default App
