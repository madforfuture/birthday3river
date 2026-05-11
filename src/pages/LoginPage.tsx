import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoginProps {
  onLoginComplete: () => void;
}

const TenorMeme = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Cleanup script tag on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
      className="w-full mt-4 rounded-xl overflow-hidden shadow-lg border border-pink-100"
    >
      <div 
        className="tenor-gif-embed" 
        data-postid="22530342" 
        data-share-method="host" 
        data-aspect-ratio="1.98758" 
        data-width="100%"
      >
        <a href="https://tenor.com/view/brahmi-king-irritated-abuse-stop-it-gif-22530342">Brahmi King GIF</a> 
        from <a href="https://tenor.com/search/brahmi-gifs">Brahmi GIFs</a>
      </div>
    </motion.div>
  );
};

export const LoginPage: React.FC<LoginProps> = ({ onLoginComplete }) => {
  const [step, setStep] = useState(1);
  const [inputVal, setInputVal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [shake, setShake] = useState(false);

  const triggerShake = (msg: string) => {
    setErrorMsg(msg);
    setSuccessMsg('');
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmitQ1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim() === '05/09/2025' || inputVal.trim() === '5/9/2025') {
       setErrorMsg('');
       setSuccessMsg('Good girl 💖');
       setTimeout(() => {
          setSuccessMsg('');
          setInputVal('');
          setStep(2);
       }, 2500);
    } else {
       triggerShake('Wrong answer 😒 Skyy disappoint ayyadu');
    }
  };

  const handleSubmitQ2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim().toLowerCase() === 'skyy') {
       setErrorMsg('');
       setSuccessMsg('Correct answer madam! 😎💖');
       setTimeout(() => {
          onLoginComplete();
       }, 2000);
    } else {
       triggerShake('Wrong answer accepted kadu 😒😂');
    }
  };

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white max-w-sm w-full text-center relative"
      >
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form 
              key="q1" 
              onSubmit={handleSubmitQ1}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col items-center"
            >
              <h2 className="text-xl font-serif text-[var(--color-primary)] font-bold mb-6">Nen nik apudu msg chaisano gurtu unda? 😌</h2>
              
              <motion.div 
                className="w-full"
                animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <input 
                  type="text" 
                  value={inputVal}
                  onChange={(e) => {
                    setInputVal(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="Date enter cheyyandi 👀 (DD/MM/YYYY)"
                  className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent text-center text-gray-700 shadow-inner mb-2 transition-all placeholder:text-sm"
                />
              </motion.div>
              <p className="text-xs text-gray-400 italic mb-6">Hint: Skyy ki anni dates gurthu untai 😎</p>

              <button 
                type="submit"
                className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform w-full"
              >
                Submit Check
              </button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form 
              key="q2" 
              onSubmit={handleSubmitQ2}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col items-center"
            >
              <h2 className="text-xl font-serif text-[var(--color-primary)] font-bold mb-6">Ni best friend evaru? 😎</h2>
              
              <motion.div 
                className="w-full"
                animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <input 
                  type="text" 
                  value={inputVal}
                  onChange={(e) => {
                    setInputVal(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="Answer cheppu madam 😌"
                  className="w-full px-4 py-3 rounded-xl border border-pink-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent text-center text-gray-700 shadow-inner mb-6 transition-all"
                />
              </motion.div>

              <button 
                type="submit"
                className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform w-full"
              >
                Submit
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="w-full mt-4 flex items-center justify-center flex-col min-h-[40px]">
          <AnimatePresence mode="wait">
            {errorMsg && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full flex items-center justify-center flex-col"
              >
                <p className="text-red-500 font-medium text-sm drop-shadow-sm mb-2">{errorMsg}</p>
                <TenorMeme />
              </motion.div>
            )}
            {successMsg && (
              <motion.p 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-green-500 font-bold text-md drop-shadow-sm"
              >
                {successMsg}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
