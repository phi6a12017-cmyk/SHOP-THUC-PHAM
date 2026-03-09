import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { io, type Socket } from 'socket.io-client'

// Types
import type { User, Message, CartItem, Product } from './types'

// Mock Data
import { demoProducts } from './data/products'

// Helpers
import { renderStars } from './utils/helpers'

// Components
import Header from './components/Layout/Header'
import Sidebar from './components/Layout/Sidebar'
import Footer from './components/Layout/Footer'
import AuthModal from './components/UI/AuthModal'
import CartModal from './components/UI/CartModal'
import ProductDetailModal from './components/UI/ProductDetailModal'
import ChatWidget from './components/UI/ChatWidget'

// Pages
import ProductsPage from './pages/ProductsPage'
import CollectionsPage from './pages/CollectionsPage'
import OffersPage from './pages/OffersPage'

import './App.css'

const API_BASE = 'http://localhost:4001'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [showAuth, setShowAuth] = useState(false)
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [authError, setAuthError] = useState<string | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: 'bot',
      text: 'Chào bạn 👋, mình là trợ lý mua sắm NestMart. Cần tư vấn sản phẩm gì hôm nay?',
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [chatInput, setChatInput] = useState('')
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [socket, setSocket] = useState<Socket | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const isLoggedIn = Boolean(user && token)

  useEffect(() => {
    const savedToken = localStorage.getItem('aurora_token')
    const savedUser = localStorage.getItem('aurora_user')
    if (savedToken && savedUser) {
      setToken(savedToken)
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        /* ignore */
      }
    }
  }, [])

  useEffect(() => {
    if (!isLoggedIn) return
    const s = io(API_BASE, { transports: ['websocket', 'polling'] })
    setSocket(s)

    s.on('chat:message', (payload: Message) => {
      setMessages((prev) => [...prev, payload])
    })

    return () => {
      s.disconnect()
      setSocket(null)
    }
  }, [isLoggedIn])

  async function handleAuthSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!username || !password) {
      setAuthError('Vui lòng điền đầy đủ thông tin.')
      return
    }

    if (authTab === 'register' && password !== confirmPassword) {
      setAuthError('Mật khẩu nhập lại không khớp.')
      return
    }

    setIsAuthLoading(true)
    setAuthError(null)
    try {
      const endpoint =
        authTab === 'login' ? `${API_BASE}/api/auth/login` : `${API_BASE}/api/auth/register`
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setAuthError(data?.error || (authTab === 'login' ? 'Đăng nhập thất bại' : 'Đăng ký thất bại'))
        return
      }
      const u: User = { name: data.user.name, username: data.user.username }
      setUser(u)
      setToken(data.token)
      localStorage.setItem('aurora_token', data.token)
      localStorage.setItem('aurora_user', JSON.stringify(u))
      setShowAuth(false)
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          from: 'bot',
          text: `Xin chào ${u.name} ✨, chào mừng bạn đến NestMart!`,
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } catch (err) {
      console.error(err)
      setAuthError('Không kết nối được server. Hãy chắc chắn backend đang chạy.')
    } finally {
      setIsAuthLoading(false)
    }
  }

  function handleLogout() {
    setUser(null)
    setToken(null)
    setUsername('')
    setPassword('')
    setConfirmPassword('')
    localStorage.removeItem('aurora_token')
    localStorage.removeItem('aurora_user')
  }

  function handleSendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!chatInput.trim()) return
    const time = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    const userMessage: Message = { id: Date.now(), from: 'user', text: chatInput.trim(), time }
    if (socket) {
      socket.emit('chat:message', userMessage)
    } else {
      setMessages((prev) => [...prev, userMessage])
    }
    setChatInput('')
  }

  function addToCart(productId: number) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === productId)
      if (existing) {
        return prev.map((i) => (i.id === productId ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { id: productId, qty: 1 }]
    })
    setCheckoutMessage(null)
    setIsCartOpen(true)
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const filteredProducts = demoProducts.filter((p) => {
    const matchesSearch =
      !searchTerm.trim() ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      activeCategory === 'All' ||
      (activeCategory === 'Sữa & Bơ' && p.category === 'Sữa & Bơ') ||
      (activeCategory === 'Đồ uống' && p.category === 'Đồ uống') ||
      (activeCategory === 'Thú cưng' && p.category === 'Thú cưng') ||
      (activeCategory === 'Rau củ' && p.category === 'Rau củ') ||
      (activeCategory === 'Bánh & Ngũ cốc' && p.category === 'Bánh & Ngũ cốc') ||
      (activeCategory.includes('Bánh') && p.category.includes('Bánh')) ||
      (activeCategory.includes('Cà phê') && p.category.includes('Cà phê')) ||
      (activeCategory.includes('Rau củ') && p.category.includes('Rau củ')) ||
      (activeCategory.includes('Trái cây') && p.category.includes('Trái cây')) ||
      (activeCategory.includes('Thịt') && p.category.includes('Thịt')) ||
      (activeCategory.includes('Gia vị') && p.category.includes('Gia vị')) ||
      p.category.includes(activeCategory)

    return matchesSearch && matchesCategory
  })

  async function handleCheckout() {
    if (!token) return
    if (cart.length === 0) return
    setIsCheckingOut(true)
    setCheckoutMessage(null)
    try {
      const res = await fetch(`${API_BASE}/api/cart/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: cart }),
      })
      const data = await res.json()
      if (!res.ok) {
        setCheckoutMessage(data?.error || 'Thanh toán thất bại')
        return
      }
      setCheckoutMessage(data.message || 'Đặt hàng thành công! 🎉')
      setCart([])
    } catch (err) {
      console.error(err)
      setCheckoutMessage('Không kết nối được server checkout.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  function handleCategoryClick(catName: string) {
    const map: Record<string, string> = {
      'Rau Củ Quả': 'Rau củ',
      'Bánh & Sữa': 'Bánh',
      'Trái Cây Tươi': 'Trái cây',
      'Thịt & Hải Sản': 'Thịt',
      'Cà Phê & Trà': 'Cà phê',
      'Thức Ăn Thú Cưng': 'Thú cưng',
      'Đồ uống': 'Đồ uống',
      'Gia Vị & Nước Chấm': 'Gia vị',
    }
    setActiveCategory(map[catName] || catName)
    setSidebarOpen(false)
    setTimeout(() => {
      const el = document.getElementById('product-section')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <div className="app-root">
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isLoggedIn={isLoggedIn}
        user={user}
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
        setShowAuth={setShowAuth}
        handleLogout={handleLogout}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setActiveCategory={setActiveCategory}
      />

      <div className="app-body">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          handleCategoryClick={handleCategoryClick}
        />

        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element={
                <ProductsPage
                  addToCart={addToCart}
                  products={filteredProducts}
                  renderStars={renderStars}
                  setActiveCategory={setActiveCategory}
                  activeCategory={activeCategory}
                  setSelectedProduct={setSelectedProduct}
                  handleCategoryClick={handleCategoryClick}
                />
              }
            />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/offers" element={<OffersPage />} />
          </Routes>
        </main>
      </div>

      <Footer />

      {cartCount > 0 && (
        <div className="cart-pill" onClick={() => setIsCartOpen(true)}>
          <span className="cart-pill-label">🛒 Giỏ hàng</span>
          <span className="cart-pill-count">{cartCount}</span>
        </div>
      )}

      <ProductDetailModal
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        renderStars={renderStars}
        addToCart={addToCart}
      />

      <CartModal
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        demoProducts={demoProducts}
        checkoutMessage={checkoutMessage}
        isLoggedIn={isLoggedIn}
        handleCheckout={handleCheckout}
        isCheckingOut={isCheckingOut}
        setShowAuth={setShowAuth}
      />

      <AuthModal
        showAuth={showAuth}
        setShowAuth={setShowAuth}
        authTab={authTab}
        setAuthTab={setAuthTab}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        handleAuthSubmit={handleAuthSubmit}
        authError={authError}
        isAuthLoading={isAuthLoading}
      />

      <ChatWidget
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        messages={messages}
        chatInput={chatInput}
        setChatInput={setChatInput}
        handleSendMessage={handleSendMessage}
      />
    </div>
  )
}

export default App
