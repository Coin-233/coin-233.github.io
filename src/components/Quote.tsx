 import { useState,useEffect } from 'react'
 import { motion, AnimatePresence } from 'framer-motion'

            interface QuoteItem {
                text: string
                otext: string
                source: string
            }

            const quotes: QuoteItem[] = [
                { text: '我很好奇！',otext: '私、気になります！', source: '千反田爱瑠 《冰菓》' },
                { text: '奇迹和魔法都是存在的',otext: '奇跡も、魔法も、あるんだよ', source:'美树沙耶香 《魔法少女小圆》'},
                { text: '喵帕斯', otext: 'にゃんぱすー', source:'宫内莲华 《悠哉日常大王》'}
            ]

            function Quote() {
                const [index, setIndex] = useState(0)
                const [key, setKey] = useState(0)

                useEffect(() => {
                    const randomIndex = Math.floor(Math.random() * quotes.length)
                    setIndex(randomIndex)
                }, [])

                const handleClick = () => {
                    let newIndex = Math.floor(Math.random() * quotes.length)
                    while (newIndex === index) {
                        newIndex = Math.floor(Math.random() * quotes.length) // 避免连续重复
                    }
                    setIndex(newIndex)
                    setKey(prev => prev + 1)
                }

                const current = quotes[index]

                return (
                    <div
                        className="quote-area"
                        onClick={handleClick}
                        title="点击更换"
                        style={{ cursor: 'pointer' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                        <div className="quote-text">{`「${current.text}」`}</div>
                        <div className="quote-text quote-text">{`『${current.otext}』`}</div>
                        <div className="quote-source">{`—— ${current.source}`}</div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )
            }

            export default Quote
