export type User = {
    name: string
    username: string
}

export type Message = {
    id: number
    from: 'user' | 'bot'
    text: string
    time: string
}

export type CartItem = {
    id: number
    qty: number
}

export type Product = {
    id: number
    name: string
    description: string
    price: string
    oldPrice: string
    badge: string
    badgeClass: string
    category: string
    emoji: string
    imgClass: string
    rating: number
}
