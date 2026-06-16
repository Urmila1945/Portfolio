import React, { useState, useRef, useEffect } from 'react';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "👋 Hi! I'm Urmila's portfolio assistant. Ask me about her skills, projects, or how to reach her!" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    const msg = inputValue.trim();
    if (!msg) return;

    setMessages(prev => [...prev, { sender: 'user', text: msg }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const API_URL = '/api';
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
      });
      const data = await response.json();
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text: "Sorry, something went wrong. Please try again.", error: true }]);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  return (
    <>
      <div id="chatbot-icon" title="Chat with AI Assistant" aria-label="Open chatbot" onClick={toggleChatbot}>💬</div>
      
      {/* Remove display:none from inline styles, rely on CSS classes or conditional rendering */}
      <div id="chatbot-popup" className={isOpen ? 'open' : ''} role="dialog" aria-label="AI Assistant" style={{ display: isOpen ? 'flex' : 'none' }}>
        <div className="chat-header">
          <span>🤖 AI Assistant</span>
          <button onClick={toggleChatbot} aria-label="Close chat">×</button>
        </div>
        
        <div className="chat-body" id="chat-body" ref={chatBodyRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              <div className="bubble" style={msg.error ? { color: '#f87171' } : {}}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="chat-message bot" id="typing-indicator">
              <div className="bubble" style={{ opacity: 0.6, fontStyle: 'italic' }}>Typing...</div>
            </div>
          )}
        </div>
        
        <div className="chat-footer">
          <input 
            type="text" 
            id="userInput" 
            placeholder="Ask something..." 
            autoComplete="off"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }} 
          />
          <button onClick={sendMessage} id="send-btn">Send</button>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
