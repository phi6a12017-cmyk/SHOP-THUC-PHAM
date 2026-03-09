import './AuthModal.css'

type AuthModalProps = {
    showAuth: boolean
    setShowAuth: (show: boolean) => void
    authTab: 'login' | 'register'
    setAuthTab: (tab: 'login' | 'register') => void
    username: string
    setUsername: (email: string) => void
    password: string
    setPassword: (password: string) => void
    confirmPassword: string
    setConfirmPassword: (password: string) => void
    handleAuthSubmit: (e: React.FormEvent) => void
    authError: string | null
    isAuthLoading: boolean
}

export default function AuthModal({
    showAuth,
    setShowAuth,
    authTab,
    setAuthTab,
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleAuthSubmit,
    authError,
    isAuthLoading,
}: AuthModalProps) {
    if (!showAuth) return null

    return (
        <div className="modal-backdrop" onClick={() => setShowAuth(false)}>
            <div className="modal auth-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setShowAuth(false)}>
                    ×
                </button>
                <div className="auth-header">
                    <div className="auth-logo">🛒</div>
                    <h2>{authTab === 'login' ? 'Chào mừng trở lại!' : 'Tham gia NestMart'}</h2>
                    <p>
                        {authTab === 'login'
                            ? 'Đăng nhập để nhận ưu đãi hấp dẫn.'
                            : 'Tạo tài khoản để bắt đầu mua sắm.'}
                    </p>
                </div>
                <div className="auth-tabs">
                    <button
                        className={`auth-tab-btn ${authTab === 'login' ? 'active' : ''}`}
                        onClick={() => setAuthTab('login')}
                    >
                        Đăng nhập
                    </button>
                    <button
                        className={`auth-tab-btn ${authTab === 'register' ? 'active' : ''}`}
                        onClick={() => setAuthTab('register')}
                    >
                        Đăng ký
                    </button>
                </div>
                <form className="auth-form" onSubmit={handleAuthSubmit}>
                    <div className="form-group">
                        <label>Tên đăng nhập</label>
                        <input
                            type="text"
                            placeholder="Nhập tên đăng nhập"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {authTab === 'register' && (
                        <div className="form-group">
                            <label>Nhập lại mật khẩu</label>
                            <input
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    {authError && <div className="auth-error">{authError}</div>}
                    <button className="primary-btn auth-submit-btn" disabled={isAuthLoading}>
                        {isAuthLoading
                            ? 'Đang xử lý...'
                            : authTab === 'login'
                                ? 'Đăng nhập'
                                : 'Tạo tài khoản'}
                    </button>
                </form>
                <div className="auth-divider">
                    <span>Hoặc tiếp tục với</span>
                </div>
                <div className="auth-social">
                    <button className="social-btn">
                        <span className="social-icon">G</span> Google
                    </button>
                    <button className="social-btn">
                        <span className="social-icon">f</span> Facebook
                    </button>
                </div>
            </div>
        </div>
    )
}
