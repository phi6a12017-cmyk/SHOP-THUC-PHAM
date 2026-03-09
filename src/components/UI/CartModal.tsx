import type { CartItem, Product } from '../../types'
import './CartModal.css'

type CartModalProps = {
    isCartOpen: boolean
    setIsCartOpen: (open: boolean) => void
    cart: CartItem[]
    demoProducts: Product[]
    checkoutMessage: string | null
    isLoggedIn: boolean
    handleCheckout: () => void
    isCheckingOut: boolean
    setShowAuth: (show: boolean) => void
}

export default function CartModal({
    isCartOpen,
    setIsCartOpen,
    cart,
    demoProducts,
    checkoutMessage,
    isLoggedIn,
    handleCheckout,
    isCheckingOut,
    setShowAuth,
}: CartModalProps) {
    if (!isCartOpen) return null

    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

    return (
        <div className="modal-backdrop" onClick={() => setIsCartOpen(false)}>
            <div className="modal modal-cart" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>🛒 Giỏ hàng ({cartCount})</h3>
                    <button className="modal-close" onClick={() => setIsCartOpen(false)}>
                        ×
                    </button>
                </div>
                {cart.length === 0 ? (
                    <p className="modal-desc">Giỏ hàng đang trống. Hãy thêm sản phẩm! 🛍️</p>
                ) : (
                    <>
                        <ul className="cart-list">
                            {cart.map((item) => {
                                const product = demoProducts.find((p) => p.id === item.id)
                                if (!product) return null
                                return (
                                    <li key={item.id} className="cart-item">
                                        <div>
                                            <div className="cart-item-name">
                                                {product.emoji} {product.name}
                                            </div>
                                            <div className="cart-item-meta">
                                                {item.qty} × {product.price}
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                        {checkoutMessage && <p className="checkout-message">{checkoutMessage}</p>}
                        {isLoggedIn ? (
                            <button
                                className="primary-btn primary-btn-full"
                                onClick={handleCheckout}
                                disabled={isCheckingOut}
                            >
                                {isCheckingOut ? 'Đang xử lý...' : '💳 Thanh toán'}
                            </button>
                        ) : (
                            <button
                                className="primary-btn primary-btn-full"
                                onClick={() => {
                                    setIsCartOpen(false)
                                    setShowAuth(true)
                                }}
                            >
                                Đăng nhập để thanh toán
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
