import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getConversation, postMessage, type ChatMessage, type PartnerUser, type RoomItem } from '../api/messageApi';

interface ChatModalProps {
  room?: RoomItem | null;
  partner: PartnerUser;
  onClose: () => void;
}

export default function ChatModal({ room, partner, onClose }: ChatModalProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (!partner) return;

    let isMounted = true;

    async function loadMessages() {
      if (user) {
        try {
          setLoading(true);
          const history = await getConversation(partner.id, room?.id);
          if (isMounted) {
            if (history.length > 0) {
              setMessages(history);
            } else {
              // Si no hay historial previo, generamos el mensaje inicial de bienvenida
              initiateDefaultGreeting();
            }
          }
        } catch (err) {
          console.error('Error cargando historial de chat:', err);
          if (isMounted) initiateDefaultGreeting();
        } finally {
          if (isMounted) setLoading(false);
        }
      } else {
        // Modo invitado (demo)
        initiateDefaultGreeting();
      }
    }

    function initiateDefaultGreeting() {
      setIsTyping(true);
      const timer1 = setTimeout(() => {
        if (!isMounted) return;
        setIsTyping(false);
        const greetingText = room
          ? `¡Hola! He visto que te interesa la habitación en ${room.location}. ¿Buscamos compis para entrar pronto?`
          : `¡Hola! Hemos hecho match mutuo. ¿Qué tipo de piso estás buscando?`;

        setMessages([
          {
            id: 'init-1',
            sender: 'partner',
            text: greetingText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }, 1200);

      return () => clearTimeout(timer1);
    }

    loadMessages();

    return () => {
      isMounted = false;
    };
  }, [partner, room, user]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const messageText = input.trim();
    setInput('');

    // Si el usuario está autenticado, persistimos el mensaje en PostgreSQL
    if (user && partner.id) {
      try {
        const savedMessage = await postMessage(partner.id, messageText, room?.id);
        setMessages((prev) => [...prev, savedMessage]);

        // Simular respuesta del compañero y guardarla si es pertinente
        simulatePartnerReply();
      } catch (err) {
        console.error('Error enviando mensaje al backend:', err);
        // Fallback optimista local
        appendOptimisticMessage(messageText);
      }
    } else {
      // Modo invitado (local)
      appendOptimisticMessage(messageText);
      simulatePartnerReply();
    }
  };

  const appendOptimisticMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'me',
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const simulatePartnerReply = () => {
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: 'partner',
            text: '¡Genial! Me parece una excelente idea, podemos coordinar para visitarlo. 😊',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }, 1800);
    }, 1000);
  };

  if (!partner) return null;

  return createPortal(
    <div className="chat-modal-overlay" onClick={onClose} data-testid="chat-overlay">
      <div className="chat-modal" onClick={(e) => e.stopPropagation()} data-testid="chat-modal">
        <div className="chat-modal__header">
          <div className="chat-modal__user">
            <div
              className="avatar"
              style={{
                backgroundImage: `url('${partner.image || partner.profile?.avatarUrl || 'https://i.pravatar.cc/300'}')`,
              }}
            />
            <div className="info">
              <strong>{partner.name}</strong>
              <span>En línea • Match mutuo</span>
            </div>
          </div>
          <button className="chat-modal__close" onClick={onClose} data-testid="chat-close" aria-label="Cerrar chat">
            <X size={24} />
          </button>
        </div>

        {room && (
          <div className="chat-modal__room-ref">
            <div className="ref-img" style={{ backgroundImage: `url('${room.image || room.imageUrl}')` }} />
            <div className="ref-text">
              Hablando sobre:
              <strong>{room.title}</strong> ({room.price})
            </div>
          </div>
        )}

        <div className="chat-modal__body">
          {loading && (
            <div style={{ textAlign: 'center', padding: '16px', color: 'var(--color-muted)' }}>
              Cargando conversación...
            </div>
          )}

          {messages.map((msg) => (
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
            <button type="submit" disabled={!input.trim()} data-testid="chat-send" aria-label="Enviar mensaje">
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
