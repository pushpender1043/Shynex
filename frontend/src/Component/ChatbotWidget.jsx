// src/components/ChatWidget.jsx

import React, { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; 

// IMPORTANT: Ensure this matches your backend server address and port!
const BACKEND_URL = 'http://localhost:8000/api/chatbot/message'; 

function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'ai', text: "Hello! I'm your AI shopping assistant. How can I help you find what you need today?" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null); 

    // Auto-scroll to the latest message
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Function to send message and handle conversation history
    const sendMessage = useCallback(async () => {
        const text = input.trim();
        if (!text || loading) return;

        const newUserMessage = { sender: 'user', text: text };
        
        // 1. Optimistically add user message and clear input
        const newMessages = [...messages, newUserMessage];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            // 2. Send the full conversation history to the backend
            const response = await axios.post(BACKEND_URL, { 
                prompt: text,
                history: newMessages, // Send the updated history
            });

            const aiResponse = { sender: 'ai', text: response.data.reply };
            
            // 3. Add AI response
            setMessages(prev => [...prev, aiResponse]);
            
        } catch (error) {
            console.error("AI Chat Error:", error);
            toast.error("Sorry, the chat service is unavailable right now.");
            
            // Remove the loading indicator and the last user message to avoid confusion
            setMessages(newMessages.slice(0, -1)); 
        } finally {
            setLoading(false);
        }
    }, [input, loading, messages]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-gradient-to-l from-[#0f1c2c] to-[#1f3a40] text-white rounded-full shadow-2xl hover:bg-blue-700 transition-colors flex items-center justify-center text-2xl"
            >
                {isOpen ? '❌' : '💬'}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-80 h-96 bg-white border border-gray-300 shadow-2xl rounded-lg flex flex-col transform transition-all duration-300">
                    <div className="p-3 bg-gradient-to-l from-[#0f1c2c] to-[#1f3a40] text-white rounded-t-lg font-bold flex justify-between items-center">
                         Customer Support 
                        <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Message Area */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-gray-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <span className={`px-3 py-2 text-sm shadow-md max-w-[85%] ${
                                    msg.sender === 'user' 
                                        ? 'bg-gradient-to-l from-[#0f1c2c] to-[#1f3a40] text-white rounded-t-xl rounded-l-xl' 
                                        : 'bg-gray-200 text-gray-800 rounded-t-xl rounded-r-xl'
                                }`}>
                                    {msg.text}
                                </span>
                            </div>
                        ))}
                        {/* Auto-scroll anchor */}
                        <div ref={messagesEndRef} />
                        
                        {loading && (
                            <div className="text-start text-sm text-gray-500 mt-2">
                                <span className="inline-block animate-bounce mr-1">.</span>
                                <span className="inline-block animate-bounce mr-1" style={{ animationDelay: '0.2s' }}>.</span>
                                <span className="inline-block animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                                AI is typing...
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-3 border-t flex">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            disabled={loading}
                            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={loading || !input.trim()}
                            className="p-2 bg-gradient-to-l from-[#0f1c2c] to-[#1f3a40] text-white rounded-r-lg disabled:bg-blue-400 hover:bg-blue-700 transition-colors"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatWidget;