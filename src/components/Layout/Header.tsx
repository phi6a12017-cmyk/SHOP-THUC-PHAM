import type { User } from '../../types'
import './Header.css'

type HeaderProps = {
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
    isLoggedIn: boolean
    user: User | null
    cartCount: number
    setIsCartOpen: (open: boolean) => void
    setShowAuth: (show: boolean) => void
    handleLogout: () => void
    searchTerm: string
    setSearchTerm: (term: string) => void
    setActiveCategory: (cat: string) => void
}

export default function Header({
    sidebarOpen,
    setSidebarOpen,
    isLoggedIn,
    user,
    cartCount,
    setIsCartOpen,
    setShowAuth,
    handleLogout,
    searchTerm,
    setSearchTerm,
    setActiveCategory,
}: HeaderProps) {
    return (
        <header className="top-bar">
            <div className="top-bar-inner">
                <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    ☰
                </button>

                <div
                    className="logo-wrap"
                    onClick={() => {
                        setActiveCategory('All')
                        setSearchTerm('')
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="logo-icon">🛒</div>
                    <div>
                        <div className="logo-text">NestMart</div>
                        <span className="logo-text-accent">Online Grocery & Food</span>
                    </div>
                </div>

                <div className="search-box">
                    <input
                        className="search-input"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button className="search-clear" onClick={() => setSearchTerm('')}>
                            ×
                        </button>
                    )}
                    <button className="search-btn">🔍 Tìm kiếm</button>
                </div>

                <div className="header-actions">
                    <div className="hotline">
                        <span className="hotline-icon">📞</span>
                        <div>
                            <div className="hotline-number">1900.888.123</div>
                            <span className="hotline-text">Hỗ trợ 24/7</span>
                        </div>
                    </div>

                    <button className="header-action-item" onClick={() => setIsCartOpen(true)}>
                        <span className="action-icon">🛒</span>
                        <span className="action-label">Giỏ hàng</span>
                        {cartCount > 0 && <span className="action-badge">{cartCount}</span>}
                    </button>

                    {isLoggedIn ? (
                        <div className="user-chip">
                            <div className="user-avatar">{user!.name.charAt(0).toUpperCase()}</div>
                            <span className="user-name">{user!.name}</span>
                            <button className="chip-logout" onClick={handleLogout}>
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <button className="header-action-item" onClick={() => setShowAuth(true)}>
                            <span className="action-icon">👤</span>
                            <span className="action-label">Đăng nhập</span>
                        </button>
                    )}
                </div>
            </div>
        </header>
    )
}
