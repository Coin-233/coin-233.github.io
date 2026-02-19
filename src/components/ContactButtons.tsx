import { motion } from 'framer-motion'
import { FaBilibili, FaEnvelope,FaQq   } from "react-icons/fa6";
import { FaGithub, FaSteam, FaTwitter } from 'react-icons/fa'
import { SiOsu } from "react-icons/si";
import { RiTelegram2Fill } from "react-icons/ri";
// import BGM from '../assets/bangumi.svg?react'

const contacts = [
    {
      name: 'Bangumi',
      href: 'https://bgm.tv/user/afterdreams',
      // icon: <BGM fill='#fff' width={16} height={16} />,
      color: 'rgb(240,145,153)'
    },
    {
        name: 'Bilibili',
        href: 'https://space.bilibili.com/390801309',
        icon: <FaBilibili />,
        color: '#fb7299'
    },
    {
        name: 'GitHub',
        href: 'https://github.com/Coin-233',
        icon: <FaGithub />,
        color: '#333'
    },
    {
        name: 'osu!',
        href: 'https://osu.ppy.sh/users/26709416',
        icon: <SiOsu/>,
        color: '#ff79b8'
    },
    {
        name: 'Steam',
        href: 'https://steamcommunity.com/id/MineCoin/',
        icon: <FaSteam />,
        color: '#171a21'
    },
    {
        name: 'Twitter',
        href: 'https://twitter.com/Coin_233',
        icon: <FaTwitter />,
        color: '#1da1f2'
    },
    {
      name: 'QQ',
      href: 'https://res.abeim.cn/api/qq/?qq=3544719434',
      icon: <FaQq/>,
      color: '#1ebafc'

    },
    {
        name: 'Email',
        href: 'mailto:me@sakuras.in',
        icon: <FaEnvelope />,
        color: 'black'
            }
]

function ContactButtons() {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {contacts.map(({ name, href, icon, color }) => (
                <motion.a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        backgroundColor: color,
                        color: '#fff',
                        borderRadius: '999px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s ease'
                    }}
                >
                    {icon}
                    {name}
                </motion.a>
            ))}
        </div>
    )
}

export default ContactButtons
