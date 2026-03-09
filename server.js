import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server as SocketIOServer } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new SocketIOServer(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST'],
  },
})

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  }),
)
app.use(express.json())

// In-memory users & sessions (demo only)
const users = new Map() // username -> { username, password, name }
const sessions = new Map() // token -> username

function createToken(username) {
  return `demo_${Buffer.from(`${username}_${Date.now()}`).toString('base64')}`
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.replace('Bearer ', '').trim()
  if (!token || !sessions.has(token)) {
    return res.status(401).json({ error: 'Unauthenticated' })
  }
  const username = sessions.get(token)
  const user = users.get(username)
  if (!user) {
    return res.status(401).json({ error: 'User not found' })
  }
  req.user = user
  req.token = token
  next()
}

app.post('/api/auth/register', (req, res) => {
  const { username, password } = req.body || {}
  if (!username || !password) {
    return res.status(400).json({ error: 'Thiếu tên đăng nhập hoặc mật khẩu' })
  }
  if (users.has(username)) {
    return res.status(400).json({ error: 'Tên đăng nhập đã tồn tại' })
  }
  const name = username || 'User'
  const user = { username, password, name }
  users.set(username, user)
  const token = createToken(username)
  sessions.set(token, username)
  res.json({ token, user: { name, username } })
})

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body || {}
  if (!username || !password) {
    return res.status(400).json({ error: 'Thiếu tên đăng nhập hoặc mật khẩu' })
  }
  const user = users.get(username)
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Tên đăng nhập hoặc mật khẩu không đúng' })
  }
  const token = createToken(username)
  sessions.set(token, username)
  res.json({ token, user: { name: user.name, username: user.username } })
})

app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({ user: { name: req.user.name, username: req.user.username } })
})

// Demo cart endpoint
app.post('/api/cart/checkout', authMiddleware, (req, res) => {
  const { items } = req.body || {}
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Giỏ hàng trống' })
  }
  return res.json({
    status: 'ok',
    message: 'Đặt hàng demo thành công (chưa thực sự thanh toán).',
    itemsCount: items.length,
  })
})

// Socket.IO chat
io.on('connection', (socket) => {
  console.log('Client connected', socket.id)

  socket.on('chat:message', (payload) => {
    // Broadcast cho tất cả client
    io.emit('chat:message', {
      id: Date.now(),
      ...payload,
    })
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id)
  })
})

const PORT = process.env.PORT || 4001
server.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`)
})
