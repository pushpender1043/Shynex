import React, { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';
import { BsChatQuoteFill, BsX, BsSend, BsRobot, BsLightningFill } from "react-icons/bs"; 
import { motion, AnimatePresence } from "framer-motion";

const BACKEND_URL = 'https://shynex.onrender.com/api/chatbot/message'; 

// ✅ Common Customer Problems (Quick Prompts)
const QUICK_ACTIONS = [
    "Where is my order?",
    "Return Policy",
    "Shipping Charges",
    "Contact Support"
];

function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'ai', text: "Welcome to Shynex Concierge. How may I assist you today?" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null); 

    useEffect(() => { if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth" }); }, [messages, isOpen]); 

    // ✅ Updated sendMessage to accept manual text input (from chips)
    const sendMessage = useCallback(async (manualText = null) => {
        const text = (typeof manualText === 'string' ? manualText : input).trim();
        if (!text || loading) return;

        const newUserMessage = { sender: 'user', text: text };
        setMessages(prev => [...prev, newUserMessage]);
        
        if (!manualText) setInput(''); // Clear input only if typed manually
        setLoading(true);

        try {
            const response = await 
            axios.post(BACKEND_URL, { prompt: text });

            setMessages(prev => [...prev, { sender: 'ai', text: response.data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'ai', text: "I am currently offline. Please contact support via email." }]);
        } finally { setLoading(false); }
    }, [input, loading, messages]);

    return (
        <motion.div drag dragMomentum={false} className="fixed bottom-[90px] md:bottom-8 right-8 z-[100]">
            
            {/* --- TOGGLE BUTTON --- */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`group w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center transition-all duration-500 border border-[#d4af37]/50 relative overflow-hidden ${
                    isOpen ? 'bg-[#0a0a0a]' : 'bg-black hover:scale-110'
                }`}
            >
                <div className="absolute inset-0 bg-[#d4af37] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                
                <div className={`transition-all duration-500 transform ${isOpen ? 'rotate-90 opacity-0 absolute' : 'scale-100 opacity-100'}`}>
                   <BsChatQuoteFill className="text-[#d4af37] text-2xl" />
                </div>
                <div className={`transition-all duration-500 transform ${isOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 opacity-0 absolute'}`}>
                   <BsX className="text-[#d4af37] text-4xl" />
                </div>
            </button>

            {/* --- CHAT WINDOW --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute bottom-24 right-0 w-[350px] sm:w-[380px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-[#d4af37]/30 shadow-2xl rounded-sm flex flex-col overflow-hidden origin-bottom-right"
                        style={{ height: '550px', maxHeight: '80vh' }}
                    >
                        {/* Header Line */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>

                        {/* Title Bar */}
                        <div className="p-5 bg-white/5 border-b border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full border border-[#d4af37]/50 flex items-center justify-center bg-black">
                                    <BsRobot className="text-[#d4af37] text-sm" />
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-white text-sm tracking-wide">SHYNEX CONCIERGE</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                        <p className="text-[9px] text-gray-400 uppercase tracking-widest">Always Active</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Messages Area */}
                        <div className="flex-1 p-5 overflow-y-auto scrollbar-hide flex flex-col gap-4">
                            
                            {messages.map((msg, index) => (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                    key={index} 
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-lg ${
                                        msg.sender === 'user' 
                                        ? 'bg-[#d4af37] text-black font-medium rounded-br-none rounded-lg' 
                                        : 'bg-white/10 text-gray-200 border border-white/10 rounded-bl-none rounded-lg'
                                    }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}

                            {/* ✅ QUICK ASSIST CHIPS (Only show if few messages) */}
                            {messages.length < 3 && !loading && (
                                <div className="mt-2">
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 ml-1 flex items-center gap-1">
                                        <BsLightningFill className='text-[#d4af37]'/> Quick Assist
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {QUICK_ACTIONS.map((action, idx) => (
                                            <button 
                                                key={idx}
                                                onClick={() => sendMessage(action)}
                                                className="text-xs text-[#d4af37] border border-[#d4af37]/30 bg-[#d4af37]/5 py-2 px-3 rounded-sm hover:bg-[#d4af37] hover:text-black transition-all text-left truncate"
                                            >
                                                {action}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {loading && (
                                <div className="flex gap-1 ml-4 items-center">
                                    <div className="w-1 h-1 bg-[#d4af37] rounded-full animate-bounce"></div>
                                    <div className="w-1 h-1 bg-[#d4af37] rounded-full animate-bounce delay-100"></div>
                                    <div className="w-1 h-1 bg-[#d4af37] rounded-full animate-bounce delay-200"></div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-black/40 border-t border-white/10">
                            <div className="flex items-center gap-2 bg-white/5 px-4 py-2.5 border border-white/10 rounded-full focus-within:border-[#d4af37]/50 transition-all">
                                <input 
                                    type="text" 
                                    value={input} 
                                    onChange={(e) => setInput(e.target.value)} 
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()} 
                                    placeholder="Type your request..." 
                                    disabled={loading} 
                                    className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-500 font-light" 
                                />
                                <button 
                                    onClick={() => sendMessage()} 
                                    disabled={loading || !input.trim()} 
                                    className={`p-2 rounded-full transition-all ${input.trim() ? 'text-[#d4af37] bg-white/10 hover:bg-[#d4af37] hover:text-black' : 'text-gray-600'}`}
                                >
                                    <BsSend size={14} />
                                </button>
                            </div>
                            <p className="text-[9px] text-gray-600 text-center mt-2">Powered by Shynex AI</p>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default ChatWidget;