import { NavLink } from 'react-router-dom'
import { categories } from '../../data/categories'
import './Sidebar.css'

type SidebarProps = {
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
    activeCategory: string
    setActiveCategory: (cat: string) => void
    handleCategoryClick: (cat: string) => void
}

export default function Sidebar({
    sidebarOpen,
    setSidebarOpen,
    activeCategory,
    setActiveCategory,
    handleCategoryClick,
}: SidebarProps) {
    return (
        <>
            {/* Sidebar Hover Trigger (Left Edge) */}
            <div className="sidebar-hover-trigger" onMouseEnter={() => setSidebarOpen(true)} />

            {/* Sidebar overlay for mobile */}
            <div
                className={`sidebar-overlay${sidebarOpen ? ' open' : ''}`}
                onClick={() => setSidebarOpen(false)}
            />

            {/* Left Sidebar */}
            <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
                <div
                    className="sidebar-header"
                    onClick={() => setActiveCategory('All')}
                    style={{ cursor: 'pointer' }}
                >
                    <span className="sidebar-header-icon">☰</span>
                    Browse All Categories
                </div>

                <nav className="sidebar-nav">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            'nav-link' + (isActive && activeCategory === 'All' ? ' nav-link-active' : '')
                        }
                        end
                        onClick={() => {
                            setSidebarOpen(false)
                            setActiveCategory('All')
                        }}
                    >
                        <span className="nav-link-icon">🏠</span>
                        Trang chủ
                    </NavLink>
                    <NavLink
                        to="/collections"
                        className={({ isActive }) => 'nav-link' + (isActive ? ' nav-link-active' : '')}
                        onClick={() => setSidebarOpen(false)}
                    >
                        <span className="nav-link-icon">📦</span>
                        Bộ sưu tập
                    </NavLink>
                    <NavLink
                        to="/offers"
                        className={({ isActive }) => 'nav-link' + (isActive ? ' nav-link-active' : '')}
                        onClick={() => setSidebarOpen(false)}
                    >
                        <span className="nav-link-icon">🏷️</span>
                        Ưu đãi
                    </NavLink>
                </nav>

                <div className="sidebar-divider" />
                <div className="sidebar-section-title">Danh mục sản phẩm</div>

                <button
                    className={`category-link ${activeCategory === 'All' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('All')}
                >
                    <span className="category-link-icon">🌐</span>
                    Tất cả sản phẩm
                </button>

                {categories.map((cat) => (
                    <button
                        className={`category-link ${activeCategory === cat.name ? 'active' : ''}`}
                        key={cat.name}
                        onClick={() => handleCategoryClick(cat.name)}
                    >
                        <span className="category-link-icon">{cat.icon}</span>
                        {cat.name}
                        <span className="category-count">{cat.count}</span>
                    </button>
                ))}

                <div className="sidebar-divider" />

                <nav className="sidebar-nav">
                    <button className="nav-link" onClick={() => setSidebarOpen(false)}>
                        <span className="nav-link-icon">📞</span>
                        Liên hệ
                    </button>
                    <button className="nav-link" onClick={() => setSidebarOpen(false)}>
                        <span className="nav-link-icon">❓</span>
                        Trợ giúp
                    </button>
                </nav>
            </aside>
        </>
    )
}
