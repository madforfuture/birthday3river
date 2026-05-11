import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AudioProvider, useAudio } from "./components/AudioContext";
import { FloatingHearts } from "./components/FloatingHearts";
import { EntryPage } from "./pages/Entry";
import { GreetingPage } from "./pages/Greeting";
import { SurprisePage } from "./pages/SurprisePage";

import { LoginPage } from "./pages/LoginPage";

const OpeningPopups: React.FC<{ start: boolean }> = ({ start }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!start) return;
    const t0 = setTimeout(() => setStep(1), 500); 
    const t1 = setTimeout(() => setStep(2), 2500); 
    const t2 = setTimeout(() => setStep(3), 4500);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, [start]);

  if (step === 0 || step === 3) return null;

  return (
    <div className="fixed top-12 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="popup1"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="bg-white/90 backdrop-blur-md text-[var(--color-primary)] px-6 py-3 rounded-2xl shadow-xl font-serif italic text-lg md:text-xl border border-[var(--color-primary-light)]"
          >
            Deyamm detected 💖
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="popup2"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="bg-white/90 backdrop-blur-md text-[var(--color-primary)] px-6 py-3 rounded-2xl shadow-xl font-serif italic text-lg md:text-xl border border-[var(--color-primary-light)]"
          >
            Smile please 😊
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PageContainer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'login' | 'entry' | 'greeting' | 'surprise'>('login');
  const { playBGM } = useAudio();

  const handleStart = () => {
    playBGM();
    setCurrentPage('greeting');
  };

  const handleSurprise = () => {
    setCurrentPage('surprise');
  };

  return (
    <>
      <FloatingHearts />
      <OpeningPopups start={currentPage !== 'login'} />
      <AnimatePresence mode="wait">
        {currentPage === 'login' && (
          <motion.div 
            key="login" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
            className="w-full flex-1 flex flex-col relative"
          >
            <LoginPage onLoginComplete={() => setCurrentPage('entry')} />
          </motion.div>
        )}
        {currentPage === 'entry' && (
          <motion.div 
            key="entry" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
            className="w-full flex-1 flex flex-col relative"
          >
            <EntryPage onContinue={handleStart} />
          </motion.div>
        )}
        {currentPage === 'greeting' && (
          <motion.div 
            key="greeting" 
            initial={{ opacity: 0, x: 100 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -100, transition: { duration: 0.5 } }}
            className="w-full flex-1"
          >
            <GreetingPage onNext={handleSurprise} />
          </motion.div>
        )}
        {currentPage === 'surprise' && (
          <motion.div 
            key="surprise" 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="w-full flex-1"
          >
            <SurprisePage />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function App() {
  return (
    <AudioProvider>
      <div className="flex min-h-screen text-[var(--color-text-main)] font-sans selection:bg-[var(--color-primary-light)] selection:text-[var(--color-text-main)]">
        <PageContainer />
      </div>
    </AudioProvider>
  );
}

