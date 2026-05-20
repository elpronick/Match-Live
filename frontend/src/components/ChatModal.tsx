import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ChatModal({ room, partner, onClose }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = partner ? useState(true) : useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Simular que el match está escribiendo al abrir el chat
    if (!partner) return;

    const timer1 = setTimeout(() => {
      setIsTyping(false);
      setMessages([
        {
          id: 1,
          sender: 'partner',
          text: `¡Hola! He visto que has desbloqueado la habitación en ${room.location}. Tiene muy buena pinta.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);

    const timer2 = setTimeout(() => {
      setIsTyping(true);
    }, 2500);

    const timer3 = setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: 2,
          sender: 'partner',
          text: `¿Te encajaría el precio de ${room.price}? Yo estoy buscando compis para entrar pronto.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [partner, room.location, room.price]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'me',
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInput('');
    
    // Simular respuesta automática
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: Date.now(),
            sender: 'partner',
            text: '¡Genial! Si quieres lo hablamos mejor mañana. 😊',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 1500);
    }, 1000);
  };

  if (!partner || !room) return null;

  return createPortal(
    <div className="chat-modal-overlay" onClick={onClose} data-testid="chat-overlay">
      <div className="chat-modal" onClick={e => e.stopPropagation()} data-testid="chat-modal">
        
        <div className="chat-modal__header">
          <div className="chat-modal__user">
            <div className="avatar" style={{ backgroundImage: `url('${partner.image}')` }} />
            <div className="info">
              <strong>{partner.name}</strong>
              <span>En línea</span>
            </div>
          </div>
          <button className="chat-modal__close" onClick={onClose} data-testid="chat-close">
            <X size={24} />
          </button>
        </div>

        <div className="chat-modal__room-ref">
          <div className="ref-img" style={{ backgroundImage: `url('${room.image}')` }} />
          <div className="ref-text">
            Hablando sobre:
            <strong>{room.title}</strong>
          </div>
        </div>

        <div className="chat-modal__body">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-time">{msg.time}</div>
            </div>
          ))}
          
          {isTyping && (
            <div className="chat-message received">
              <div className="chat-bubble typing-indicator">
                <span /> <span /> <span />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-modal__footer" onSubmit={handleSend}>
          <div className="chat-input-wrapper">
            <input 
              type="text" 
              placeholder="Escribe un mensaje..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              data-testid="chat-input"
            />
            <button type="submit" disabled={!input.trim()} data-testid="chat-send">
              <Send size={18} />
            </button>
          </div>
        </form>

      </div>
    </div>,
    document.body
  );
}
