import type { Product } from '../../types'
import './ProductCard.css'

type ProductCardProps = {
    product: Product
    renderStars: (rating: number) => string
    addToCart: (id: number) => void
    setSelectedProduct: (p: Product) => void
    handleCategoryClick: (cat: string) => void
}

export default function ProductCard({
    product,
    renderStars,
    addToCart,
    setSelectedProduct,
    handleCategoryClick,
}: ProductCardProps) {
    return (
        <article className="product-card">
            <div
                className="product-media"
                onClick={() => setSelectedProduct(product)}
                style={{ cursor: 'pointer' }}
            >
                <span className={`product-badge ${product.badgeClass}`}>{product.badge}</span>
                <div className={`product-img-placeholder ${product.imgClass}`}>{product.emoji}</div>
            </div>
            <div className="product-content">
                <span
                    className="product-category"
                    onClick={(e) => {
                        e.stopPropagation()
                        handleCategoryClick(product.category)
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    {product.category}
                </span>
                <h3
                    className="product-name"
                    onClick={() => setSelectedProduct(product)}
                    style={{ cursor: 'pointer' }}
                >
                    {product.name}
                </h3>
                <p className="product-desc">{product.description}</p>
                <div className="product-rating">{renderStars(product.rating)}</div>
                <div className="product-meta">
                    <div>
                        <span className="product-price">{product.price}</span>
                        <span className="product-price-old">{product.oldPrice}</span>
                    </div>
                    <button
                        className="product-add-btn"
                        onClick={(e) => {
                            e.stopPropagation()
                            addToCart(product.id)
                        }}
                        title="Thêm vào giỏ"
                    >
                        +
                    </button>
                </div>
            </div>
        </article>
    )
}
