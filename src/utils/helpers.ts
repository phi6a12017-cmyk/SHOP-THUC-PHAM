export function renderStars(rating: number) {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5
    let stars = ''
    for (let i = 0; i < full; i++) stars += '★'
    if (half) stars += '☆'
    return stars + ` (${rating})`
}
