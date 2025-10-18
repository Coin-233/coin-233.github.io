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
                Last Update {__BUILD_DATE__} <br />
                <IoIosGitBranch /> {__COMMIT_ID__} <br/><br/>
                <span title="Copyright 2025 All rights reserved">©2025 保留所有右边</span>
            </footer>
        </div>
    )
}

export default Layout
