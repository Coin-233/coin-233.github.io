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
                <IoIosGitBranch /> {import.meta.env.VITE_COMMIT_ID}
            </footer>
        </div>
    )
}

export default Layout
