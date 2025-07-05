import Header from './Header'
import { IoIosGitBranch } from "react-icons/io";


interface LayoutProps {
    children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
    return (
        <div className="container">
            <Header />
            <main className="content">
                {children}
            </main>
            <footer>
                Last Update 2025-04-28<br />
                <IoIosGitBranch /> {import.meta.env.VITE_COMMIT_ID} <br/><br/>
                <span title="Copyright 2025 All rights reserved">©2025 保留所有右边</span>
            </footer>
        </div>
    )
}

export default Layout
