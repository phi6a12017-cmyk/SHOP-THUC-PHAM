import type { Product } from '../../types'
import './ProductDetailModal.css'

type ProductDetailModalProps = {
    selectedProduct: Product | null
    setSelectedProduct: (p: Product | null) => void
    renderStars: (rating: number) => string
    addToCart: (id: number) => void
}

export default function ProductDetailModal({
    selectedProduct,
    setSelectedProduct,
    renderStars,
    addToCart,
}: ProductDetailModalProps) {
    if (!selectedProduct) return null

    return (
        <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
            <div className="modal product-detail-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close detail-close" onClick={() => setSelectedProduct(null)}>
                    ×
                </button>
                <div className="detail-grid">
                    <div className={`detail-media ${selectedProduct.imgClass}`}>
                        <span className="detail-badge">{selectedProduct.badge}</span>
                        <div className="detail-emoji">{selectedProduct.emoji}</div>
                    </div>
                    <div className="detail-info">
                        <span className="detail-category">{selectedProduct.category}</span>
                        <h2 className="detail-name">{selectedProduct.name}</h2>
                        <div className="detail-rating">
                            <span className="stars">{renderStars(selectedProduct.rating)}</span>
                            <span className="reviews">(50 đánh giá)</span>
                        </div>
                        <div className="detail-price-row">
                            <span className="detail-price">{selectedProduct.price}</span>
                            <span className="detail-price-old">{selectedProduct.oldPrice}</span>
                        </div>
                        <p className="detail-desc">{selectedProduct.description}</p>
                        <p className="detail-long-desc">
                            Sản phẩm được tuyển chọn kỹ lưỡng, đảm bảo tiêu chuẩn vệ sinh an toàn thực phẩm. Cam
                            kết tươi ngon mỗi ngày, giao hàng nhanh chóng trong 2 giờ.
                        </p>
                        <div className="detail-actions">
                            <div className="detail-qty">
                                <button className="qty-btn">-</button>
                                <input className="qty-input" defaultValue="1" readOnly />
                                <button className="qty-btn">+</button>
                            </div>
                            <button
                                className="primary-btn"
                                onClick={() => {
                                    addToCart(selectedProduct.id)
                                    setSelectedProduct(null)
                                }}
                            >
                                🛒 Thêm vào giỏ
                            </button>
                        </div>
                        <div className="detail-meta-list">
                            <div>
                                <span>Tag:</span> Organic, Fresh, Healthy
                            </div>
                            <div>
                                <span>MFG:</span> 02/03/2026
                            </div>
                            <div>
                                <span>LIFE:</span> 7 ngày
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
