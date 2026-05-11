import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface EntryPageProps {
  onContinue: () => void;
}

export const EntryPage: React.FC<EntryPageProps> = ({ onContinue }) => {
  const [reluctantHover, setReluctantHover] = useState(false);
  const [state, setState] = useState<'initial' | 'reluctant' | 'happy'>('initial');

  const onHappyClick = () => {
    setState('happy');
    setTimeout(() => {
      onContinue();
    }, 1500);
  };

  const onSadClick = () => {
    setState('reluctant');
    setTimeout(() => {
      onContinue();
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white/60 p-8 rounded-2xl shadow-xl border border-white flex flex-col items-center max-w-sm w-full backdrop-blur-md z-10">
        
        <div className="h-48 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {state === 'initial' && (
              <motion.img 
                key="initial"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                src="https://media.tenor.com/iqAGfe01Y9QAAAAj/teddy-bear-milk-and-mocha.gif" 
                alt="Bears fighting playfully"
                className="rounded-lg h-full object-contain"
              />
            )}
            {state === 'reluctant' && (
              <motion.img 
                key="reluctant"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                src="https://media.tenor.com/rXcOjZvRGbAAAAAj/milk-and-mocha-haha.gif" 
                alt="Bear dragging and laughing"
                className="rounded-lg h-full object-contain"
              />
            )}
            {state === 'happy' && (
               <motion.img 
                key="happy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: [1, 1.1, 1] }}
                exit={{ opacity: 0 }}
                src="https://media.tenor.com/Zk9i1K8sDEUAAAAi/milk-mocha-dance.gif" 
                alt="Bears celebrating"
                className="rounded-lg h-full object-contain"
              />
            )}
          </AnimatePresence>
        </div>

        <motion.h2 
          className="text-2xl font-serif italic text-[var(--color-primary)] drop-shadow-sm mt-6 mb-8 text-center"
          animate={state === 'reluctant' ? { opacity: 0 } : { opacity: 1 }}
        >
          {state === 'happy' ? "Yay! Let's go!" : "Do you want to continue?"}
        </motion.h2>

        {state === 'initial' && (
          <div className="flex gap-4 w-full justify-center relative">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onHappyClick}
              className="bg-[var(--color-primary)] text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-pink-200 text-xs uppercase tracking-widest transition-transform"
            >
              I want
            </motion.button>
            <motion.button 
              onHoverStart={() => setReluctantHover(true)}
              onHoverEnd={() => setReluctantHover(false)}
              onClick={onSadClick}
              className="bg-white border border-[var(--color-primary-light)] text-[var(--color-primary)] font-bold py-3 px-8 rounded-full shadow-sm hover:shadow-md text-xs uppercase tracking-widest transition-all"
            >
              I don't want
            </motion.button>
          </div>
        )}
      </div>

    </div>
  );
};
