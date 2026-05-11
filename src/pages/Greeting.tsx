import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface GreetingPageProps {
  onNext: () => void;
}

export const GreetingPage: React.FC<GreetingPageProps> = ({ onNext }) => {
  const [showWish, setShowWish] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center max-w-md w-full"
      >
        <div className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-white/60 p-3 shadow-xl border border-white mb-8 backdrop-blur-md overflow-hidden flex items-center justify-center">
          <img 
            src="https://i.postimg.cc/3w3R2LPD/Whats-App-Image-2026-04-27-at-6-26-07-AM.jpg" 
            alt="Deyamm" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <motion.h1 
          className="text-4xl md:text-6xl font-serif italic text-[var(--color-primary)] drop-shadow-sm mb-2"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Happy Birthday Deyamm 💖
        </motion.h1>

        <p className="text-sm md:text-lg tracking-widest uppercase text-[var(--color-text-muted)] font-light mb-10">
          You made it to the next chapter of your life!
        </p>

        <div className="flex flex-col gap-6 w-full items-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="w-4/5 md:w-full max-w-sm bg-[var(--color-primary)] text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-pink-200 text-xs uppercase tracking-widest transition-transform"
          >
            Start Surprise 🎁
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowWish(true)}
            className="w-4/5 md:w-full max-w-sm bg-white border border-[var(--color-primary-light)] text-[var(--color-primary)] font-bold py-4 px-8 rounded-full shadow-sm hover:shadow-md text-xs uppercase tracking-widest transition-all"
          >
            Just a Wish 💌
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showWish && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-white shadow-xl max-w-sm w-full relative"
            >
              <button 
                onClick={() => setShowWish(false)}
                className="absolute top-4 right-4 text-[var(--color-primary)] hover:text-pink-800"
              >
                ✕
              </button>
              <span className="text-xs text-[var(--color-primary)] font-bold uppercase tracking-widest block mb-2 text-center">A Little Note</span>
              <h3 className="text-3xl font-serif italic text-[var(--color-primary)] mb-4 text-center">My Small Wish</h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-main)] font-serif text-center">
                May your day be filled with lots of love, smiles, and cake! You deserve all the wonderful things life has to offer. ✨
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
