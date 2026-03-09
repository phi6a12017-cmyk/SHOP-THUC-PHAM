import { demoOffers } from '../data/offers'

export default function OffersPage() {
    return (
        <section className="offer-section">
            <div className="section-header">
                <div>
                    <h2 className="section-title">Ưu Đãi & Khuyến Mãi</h2>
                    <p className="section-subtitle">
                        Các chương trình khuyến mãi đang áp dụng – được tính tự động khi thanh toán.
                    </p>
                </div>
            </div>
            <div className="offer-grid">
                {demoOffers.map((o) => (
                    <article key={o.id} className="offer-card">
                        <div className="offer-tag">{o.tag}</div>
                        <h3 className="offer-title">{o.title}</h3>
                        <p className="offer-desc">{o.description}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}
