import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAudio } from "./AudioContext";

interface ChatSimulationProps {
  onComplete: () => void;
}

interface Message {
  id: number;
  sender: 'skyy' | 'deyamm';
  text: string;
  isDeleted?: boolean;
}

export const ChatSimulation: React.FC<ChatSimulationProps> = ({ onComplete }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState<'skyy' | 'deyamm' | null>(null);
  const [showButton, setShowButton] = useState(false);
  const { playSound } = useAudio();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fullConversation: Message[] = [
    { id: 1, sender: 'skyy', text: "Happy Birthday Deyamm 💖" },
    { id: 2, sender: 'deyamm', text: "😄" },
    { id: 3, sender: 'skyy', text: "Navvindi challu le… cake cut chai 🎂😄" },
    { id: 4, sender: 'deyamm', text: "ok" },
    { id: 5, sender: 'skyy', text: "Ok ah? 😒" },
    { id: 6, sender: 'deyamm', text: "haaa😄" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  useEffect(() => {
    let timeoutIds: NodeJS.Timeout[] = [];

    const simulateChat = async () => {
      // Message 1 from Skyy
      setTyping('skyy');
      await new Promise(r => { const t = setTimeout(r, 1500); timeoutIds.push(t); });
      setTyping(null);
      setMessages(prev => [...prev, fullConversation[0]]);
      playSound('pop');

      // Delay before Deyamm starts typing
      await new Promise(r => { const t = setTimeout(r, 1000); timeoutIds.push(t); });
      
      // Message 2 from Deyamm
      setTyping('deyamm');
      await new Promise(r => { const t = setTimeout(r, 2000); timeoutIds.push(t); });
      setTyping(null);
      setMessages(prev => [...prev, fullConversation[1]]);
      playSound('pop');

      // Delay before Skyy starts typing to make it feel natural
      await new Promise(r => { const t = setTimeout(r, 1500); timeoutIds.push(t); });
      
      // Message 3 from Skyy
      setTyping('skyy');
      await new Promise(r => { const t = setTimeout(r, 2000); timeoutIds.push(t); });
      setTyping(null);
      setMessages(prev => [...prev, fullConversation[2]]);
      playSound('pop');

      // Delay before Deyamm's reply
      await new Promise(r => { const t = setTimeout(r, 1500); timeoutIds.push(t); });

      // Message 4 from Deyamm
      setTyping('deyamm');
      await new Promise(r => { const t = setTimeout(r, 1500); timeoutIds.push(t); });
      setTyping(null);
      setMessages(prev => [...prev, fullConversation[3]]);
      playSound('pop');

      // Skyy reacts quickly
      await new Promise(r => { const t = setTimeout(r, 800); timeoutIds.push(t); });
      setTyping('skyy');
      await new Promise(r => { const t = setTimeout(r, 1200); timeoutIds.push(t); });
      setTyping(null);
      setMessages(prev => [...prev, fullConversation[4]]);
      playSound('pop');

      // Deyamm deletes it
      await new Promise(r => { const t = setTimeout(r, 1500); timeoutIds.push(t); });
      setTyping('deyamm');
      await new Promise(r => { const t = setTimeout(r, 1000); timeoutIds.push(t); });
      setMessages(prev => prev.map(msg => msg.id === 4 ? { ...msg, isDeleted: true, text: "🚫 This message was deleted" } : msg));
      
      // Deyamm finishes typing "haaa😄"
      await new Promise(r => { const t = setTimeout(r, 1500); timeoutIds.push(t); });
      setTyping(null);
      setMessages(prev => [...prev, fullConversation[5]]);
      playSound('pop');

      // Show button
      await new Promise(r => { const t = setTimeout(r, 1500); timeoutIds.push(t); });
      setShowButton(true);
    };

    simulateChat();

    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto bg-white/40 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-white mt-8 flex flex-col h-[400px]"
    >
      {/* Chat Header */}
      <div className="bg-white/80 p-4 border-b border-pink-100 flex items-center gap-3 shadow-sm z-10">
        <div className="w-10 h-10 rounded-full shadow-inner overflow-hidden border-2 border-white flex-shrink-0">
          <img src="https://i.postimg.cc/3w3R2LPD/Whats-App-Image-2026-04-27-at-6-26-07-AM.jpg" alt="Deyamm" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-[var(--color-primary)] font-serif text-lg leading-none">Deyamm</span>
          <AnimatePresence mode="wait">
            {typing === 'deyamm' ? (
              <motion.span 
                key="typing"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-xs text-pink-400 italic"
              >
                typing...
              </motion.span>
            ) : (
              <motion.span 
                key="online"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-xs text-pink-400/70"
              >
                online
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 relative scroll-smooth">
        <div className="absolute inset-0 bg-[#fff0f5] opacity-30 select-none pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fbcfe8 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="z-10 flex flex-col gap-3">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex w-full ${msg.sender === 'skyy' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[75%] p-3 rounded-2xl shadow-sm text-sm relative
                    ${msg.sender === 'skyy' 
                      ? 'bg-pink-100/90 text-gray-800 rounded-tr-sm border border-pink-200' 
                      : 'bg-white text-gray-800 rounded-tl-sm border border-gray-100'
                    }`}
                >
                  <p className={`font-sans whitespace-pre-wrap ${msg.isDeleted ? 'italic text-gray-400' : ''}`}>{msg.text}</p>
                  <span className="text-[10px] text-gray-400 float-right mt-1 ml-2">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {typing && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`flex w-full ${typing === 'skyy' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`p-3 rounded-2xl shadow-sm text-sm flex gap-1 items-center ${typing === 'skyy' ? 'bg-pink-100/90 rounded-tr-sm border border-pink-200' : 'bg-white rounded-tl-sm border border-gray-100'}`}>
                <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Footer */}
      <AnimatePresence>
        {showButton && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-white/80 border-t border-pink-100 z-10 flex justify-center"
          >
            <button
              onClick={onComplete}
              className="w-full bg-[var(--color-primary)] text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-pink-200 text-xs uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Go Cut the Cake 🎂
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
