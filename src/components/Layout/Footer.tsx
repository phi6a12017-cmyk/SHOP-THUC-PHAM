import './Footer.css'

const Footer = () => {
    return (
        <footer className="app-footer">
            <span>© {new Date().getFullYear()} NestMart. Grocery & Organic Food.</span>
            <div className="footer-links">
                <button className="footer-link">Chính sách bảo mật</button>
                <button className="footer-link">Điều khoản sử dụng</button>
                <button className="footer-link">Liên hệ</button>
            </div>
        </footer>
    )
}

export default Footer
