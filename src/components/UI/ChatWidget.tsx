import type { Message } from '../../types'
import './ChatWidget.css'

type ChatWidgetProps = {
    isChatOpen: boolean
    setIsChatOpen: (open: boolean) => void
    messages: Message[]
    chatInput: string
    setChatInput: (input: string) => void
    handleSendMessage: (e: React.FormEvent) => void
}

export default function ChatWidget({
    isChatOpen,
    setIsChatOpen,
    messages,
    chatInput,
    setChatInput,
    handleSendMessage,
}: ChatWidgetProps) {
    return (
        <div className="chat-root">
            {isChatOpen ? (
                <div className="chat-window">
                    <div className="chat-header">
                        <div>
                            <div className="chat-title">🤖 NestMart Bot</div>
                            <div className="chat-subtitle">Hỗ trợ mua sắm • Trả lời nhanh</div>
                        </div>
                        <button className="chat-toggle" type="button" onClick={() => setIsChatOpen(false)}>
                            −
                        </button>
                    </div>
                    <div className="chat-messages">
                        {messages.map((m) => (
                            <div
                                key={m.id}
                                className={'chat-msg' + (m.from === 'user' ? ' chat-msg-user' : ' chat-msg-bot')}
                            >
                                <div className="chat-msg-bubble">
                                    <p>{m.text}</p>
                                    <span className="chat-msg-time">{m.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <form className="chat-input-row" onSubmit={handleSendMessage}>
                        <input
                            className="chat-input"
                            placeholder="Hỏi về sản phẩm, vận chuyển..."
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                        />
                        <button className="chat-send-btn" type="submit">
                            ➤
                        </button>
                    </form>
                </div>
            ) : (
                <button className="chat-fab" type="button" onClick={() => setIsChatOpen(true)}>
                    💬 Chat hỗ trợ
                </button>
            )}
        </div>
    )
}
