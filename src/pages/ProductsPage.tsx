import { categories } from '../data/categories'
import './ProductsPage.css'
import type { Product } from '../types'
import ProductCard from '../components/UI/ProductCard'

type ProductsPageProps = {
    addToCart: (id: number) => void
    products: Product[]
    renderStars: (rating: number) => string
    setActiveCategory: (cat: string) => void
    activeCategory: string
    setSelectedProduct: (p: Product) => void
    handleCategoryClick: (cat: string) => void
}

export default function ProductsPage({
    addToCart,
    products,
    renderStars,
    setActiveCategory,
    activeCategory,
    setSelectedProduct,
    handleCategoryClick,
}: ProductsPageProps) {
    return (
        <>
            {/* Hero Banner */}
            <section className="hero-banner">
                <div className="hero-content">
                    <h1 className="hero-title">
                        <span>Rau Củ Tươi</span>
                        <br />
                        Giảm Giá Lớn
                    </h1>
                    <p className="hero-discount">Tiết kiệm đến 50% cho đơn hàng đầu tiên</p>
                    <div className="hero-subscribe">
                        <input className="hero-email-input" placeholder="Email của bạn..." />
                        <button className="hero-subscribe-btn">Đăng ký</button>
                    </div>
                    <div className="hero-dots">
                        <button className="hero-dot" />
                        <button className="hero-dot active" />
                    </div>
                </div>
                <div className="hero-image">
                    <div className="hero-image-placeholder">🥕🌽🥒</div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="feat-categories">
                <div className="section-header">
                    <div>
                        <h2 className="section-title">Danh Mục Nổi Bật</h2>
                    </div>
                    <div className="section-nav">
                        {['All', 'Bánh', 'Cà phê', 'Thú cưng', 'Rau củ'].map((c) => (
                            <button
                                className={`section-nav-link ${activeCategory === c ? 'active' : ''}`}
                                key={c}
                                onClick={() => handleCategoryClick(c)}
                            >
                                {c === 'All' ? 'Tất cả' : c}
                            </button>
                        ))}
                        <div className="section-arrows">
                            <button className="section-arrow">←</button>
                            <button className="section-arrow">→</button>
                        </div>
                    </div>
                </div>
                <div className="category-grid">
                    {categories.map((cat) => (
                        <div
                            className={`category-card ${activeCategory === cat.name ? 'active' : ''}`}
                            key={cat.name}
                            onClick={() => handleCategoryClick(cat.name)}
                        >
                            <span className="category-card-icon">{cat.icon}</span>
                            <span className="category-card-name">{cat.name}</span>
                            <span className="category-card-count">{cat.count} sản phẩm</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Products */}
            <section className="product-section" id="product-section">
                <div className="section-header">
                    <div>
                        <h2 className="section-title">
                            {activeCategory === 'All' ? 'Sản Phẩm Phổ Biến' : `Sản Phẩm: ${activeCategory}`}
                        </h2>
                        <p className="section-subtitle">
                            Sản phẩm tươi ngon, chất lượng cao được nhiều người chọn mua.
                        </p>
                    </div>
                    <button className="ghost-btn ghost-btn-small" onClick={() => handleCategoryClick('All')}>
                        Xem tất cả →
                    </button>
                </div>
                <div className="product-grid">
                    {products.length === 0 && (
                        <div className="empty-state">
                            <p>Không tìm thấy sản phẩm khớp từ khóa hoặc danh mục. 🔍</p>
                            <button
                                className="primary-btn"
                                onClick={() => setActiveCategory('All')}
                                style={{ marginTop: '10px' }}
                            >
                                Quay về tất cả sản phẩm
                            </button>
                        </div>
                    )}
                    {products.map((p) => (
                        <ProductCard
                            key={p.id}
                            product={p}
                            renderStars={renderStars}
                            addToCart={addToCart}
                            setSelectedProduct={setSelectedProduct}
                            handleCategoryClick={handleCategoryClick}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}
