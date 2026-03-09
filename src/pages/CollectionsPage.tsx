import { demoCollections } from '../data/collections'

export default function CollectionsPage() {
    return (
        <section className="collection-section">
            <div className="section-header">
                <div>
                    <h2 className="section-title">Bộ Sưu Tập</h2>
                    <p className="section-subtitle">
                        Tổng hợp các bộ sưu tập sản phẩm theo chủ đề – chọn nhóm phù hợp nhu cầu của bạn.
                    </p>
                </div>
            </div>
            <div className="collection-grid">
                {demoCollections.map((c) => (
                    <article key={c.id} className="collection-card">
                        <div className="collection-header">
                            <h3>{c.title}</h3>
                            <span className="collection-status">{c.status}</span>
                        </div>
                        <p className="collection-desc">{c.description}</p>
                        <div className="collection-footer">
                            <span className="collection-count">{c.items} sản phẩm</span>
                            <button className="ghost-btn ghost-btn-small">Xem chi tiết →</button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
