import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { useAudio } from "../components/AudioContext";
import { ChatSimulation } from "../components/ChatSimulation";

// Simple UI Components
const Button: React.FC<{ onClick: () => void; children: React.ReactNode; disabled?: boolean; variant?: 'primary' | 'secondary' }> = ({ onClick, children, disabled, variant = 'primary' }) => (
  <motion.button
    whileHover={{ scale: disabled ? 1 : 1.05 }}
    whileTap={{ scale: disabled ? 1 : 0.95 }}
    onClick={onClick}
    disabled={disabled}
    className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
      disabled ? "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300 shadow-none" : 
      variant === 'secondary' ? "bg-white border border-[var(--color-primary-light)] text-[var(--color-primary)] shadow-sm hover:shadow-md" :
      "bg-[var(--color-primary)] text-white shadow-lg shadow-pink-200"
    }`}
  >
    {children}
  </motion.button>
);

const Balloons = () => (
  <div className="fixed inset-0 pointer-events-none z-10 flex justify-around">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={`balloon-${i}`}
        initial={{ y: "100vh" }}
        animate={{ y: "-10vh" }}
        transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
      >
        <svg width="60" height="90" viewBox="0 0 60 90">
          <ellipse cx="30" cy="35" rx="28" ry="33" fill={["#fbcfe8", "#f9a8d4", "#f472b6"][i % 3]} />
          <path d="M 30 68 L 25 75 L 35 75 Z" fill={["#fbcfe8", "#f9a8d4", "#f472b6"][i % 3]} />
          <path d="M 30 75 Q 20 90 30 100" stroke="#cbd5e1" fill="none" strokeWidth="1" />
        </svg>
      </motion.div>
    ))}
  </div>
);

const FairyLights = () => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    className="fixed top-0 left-0 right-0 w-full flex justify-around px-4 opacity-70 pointer-events-none z-20"
  >
    {[...Array(9)].map((_, i) => (
      <motion.div
        key={`light-${i}`}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5 + Math.random(), repeat: Infinity }}
        className={`w-4 h-4 bg-yellow-200 rounded-full shadow-[0_0_15px_#FDE68A] ${i % 2 === 0 ? "mt-4" : "mt-2"}`}
      />
    ))}
  </motion.div>
);

const Cake: React.FC<{ onCut: () => void }> = ({ onCut }) => {
  const [isCut, setIsCut] = useState(false);

  const handlePanEnd = (event: any, info: any) => {
    // If dragged horizontally far enough, slice it!
    if (Math.abs(info.offset.x) > 60 && !isCut) {
      setIsCut(true);
      onCut();
    }
  };

  return (
    <div className="relative mt-8">
      {!isCut && (
        <div className="absolute top-0 w-full flex justify-center text-[10px] text-[var(--color-primary)] font-bold uppercase tracking-widest bg-white/60 px-3 py-1 rounded-full border border-[var(--color-primary-light)] animate-pulse">
          Drag to Cut Cake
        </div>
      )}
      
      <motion.div
        onPanEnd={handlePanEnd}
        className="relative w-64 h-64 mx-auto cursor-pointer touch-none"
      >
        <div className="absolute inset-0 flex justify-center items-end pb-8">
          {/* Base shadow */}
          <div className="absolute bottom-6 w-56 h-8 bg-black/10 rounded-full blur-md"></div>
          
          {/* Plate */}
          <div className="absolute bottom-4 w-64 h-6 bg-gray-200 rounded-[50%] border-b-4 border-gray-300"></div>

          {/* Sliced Cake Container */}
          <div className="relative w-48 h-36 flex">
            
            {/* Left Half */}
            <motion.div 
              className="w-1/2 h-full relative"
              animate={isCut ? { x: -20, rotate: -6 } : { x: 0, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 10, mass: 0.8 }}
            >
              {/* Icing Top */}
              <div className="absolute top-0 w-full h-[50%] bg-[#ffb6c1] rounded-tl-xl z-20"></div>
              {/* Cake Body */}
              <div className="absolute bottom-0 w-full h-[60%] bg-[#ffe4bc] rounded-bl-sm z-10 border-l-2 border-b-2 border-orange-200/50"></div>
              {/* Middle filling */}
              <div className="absolute top-[50%] w-full h-2 bg-pink-400 z-15"></div>
              
              {/* Candle left */}
              {!isCut && (
                <div className="absolute top-[-30px] right-2 w-2 h-10 bg-blue-200 z-30 ml-4 rounded-t-sm shadow-md">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }} 
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    className="absolute -top-4 -left-1 w-4 h-5 bg-yellow-400 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-[0_0_10px_#facc15]"
                  />
                </div>
              )}
              {isCut && (
                <div className="absolute top-[-30px] right-2 w-2 h-10 bg-blue-200 z-30 ml-4 rounded-t-sm shadow-inner opacity-60">
                   {/* Blown out */}
                   <div className="absolute -top-2 left-0 w-1 h-2 bg-gray-400 rounded-full animate-pulse" />
                </div>
              )}
            </motion.div>

            {/* Right Half */}
            <motion.div 
              className="w-1/2 h-full relative overflow-hidden"
              animate={isCut ? { x: 20, rotate: 6 } : { x: 0, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 10, mass: 0.8 }}
            >
               {/* Inside slice view (only visible when cut, handled by bg colors showing) */}
               {/* Icing Top */}
              <div className="absolute top-0 w-full h-[50%] bg-[#ffb6c1] rounded-tr-xl z-20"></div>
              {/* Cake Body */}
              <div className="absolute bottom-0 w-full h-[60%] bg-[#ffe4bc] rounded-br-sm z-10 border-r-2 border-b-2 border-orange-200/50"></div>
              {/* Middle filling */}
              <div className="absolute top-[50%] w-full h-2 bg-pink-400 z-15"></div>
            </motion.div>

            {/* Particle Crumbs */}
            {isCut && [...Array(12)].map((_, i) => (
               <motion.div
                 key={`crumb-${i}`}
                 className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full z-30 ${i % 3 === 0 ? 'bg-[#ffb6c1]' : 'bg-[#ffe4bc]'}`}
                 initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                 animate={{ 
                   x: (Math.random() - 0.5) * 120, 
                   y: Math.random() * 80 + 30, 
                   opacity: [1, 1, 0],
                   rotate: Math.random() * 360,
                   scale: Math.random() * 1.5 + 0.5
                 }}
                 transition={{ duration: 0.8 + Math.random() * 0.4, ease: "easeOut" }}
               />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Letter: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const message = `Dear Triveni 💖,

Happy Birthday Deyamm 🎉

I just wanted to take a moment to tell you how important you are to me as a friend.
You’re honestly one of those people who makes everything feel lighter, easier, and a lot more fun just by being around.

All our random talks, silly arguments, laughs, and moments…
they mean more to me than I usually say.

And honestly… offline lo full introvert 😭
Kani online ki vachaka edo confidence vachinattu nonstop matladtha 😂

And yeah… I know I overthink sometimes and end up asking weird or uncomfortable questions 😅
My brain literally goes: “Don’t ask…”
and then Skyy asks anyway 🤦‍♂️
So sorry for that—please adjust with me 😂

But genuinely, it all comes from how much I value this friendship.

You have your own vibe, your own strength, and a way of being yourself that I really respect.
Don’t ever change that for anyone.

And btw… keep annoying me like always 😄
because honestly, it wouldn’t feel the same without that.

Also… I didn’t forget what you said — “I never take gifts” 😏
so I made this… technically not a gift, just Skyy effort 😂

On your birthday, I just wish you happiness, success, and a lot of peaceful, beautiful moments ahead 💕

Stay the same, Deyamm.
And congrats… you unlocked Skyy as your permanent bestie 😎🎉
Once again, Happy Birthday Triveni 🎂💖`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, rotate: -3 }}
      animate={{ opacity: 1, y: 0, rotate: -3 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="max-w-md mx-auto bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white mt-12 hover:rotate-0 transition-transform duration-500"
    >
      <span className="text-xs text-[var(--color-primary)] font-bold uppercase tracking-widest block mb-4">From your Skyy</span>
      <motion.p
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.03 }
          }
        }}
        className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--color-text-main)] font-serif"
      >
        {message.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.p>

      <div className="mt-4 border-t border-pink-100 pt-2 text-right italic font-serif text-pink-400">— From your Skyy 💫</div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: message.length * 0.03 + 0.5 }}
        className="mt-6 flex flex-col items-center gap-6"
      >
        <img 
          src="https://media.tenor.com/eQ-YMs9MK-8AAAAj/tkthao219-bubududu.gif" 
          alt="Teddy Hug" 
          className="w-48 rounded-lg shadow-md"
        />
        <Button onClick={onComplete} variant="primary">One Last Thing... 🎁</Button>
      </motion.div>
    </motion.div>
  );
};

const TenorFinalMeme = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-64 max-w-full mx-auto rounded-xl overflow-hidden shadow-xl mt-4">
      <div 
        className="tenor-gif-embed" 
        data-postid="4898267061862288588" 
        data-share-method="host" 
        data-aspect-ratio="1.44" 
        data-width="100%"
      >
        <a href="https://tenor.com/view/showing-attitude-shanmukh-jaswanth-reaction-latest-manner-gif-4898267061862288588">Showing Attitude.Gif GIF</a> 
        from <a href="https://tenor.com/search/showing+attitude-gifs">Showing Attitude GIFs</a>
      </div>
    </div>
  );
};

const FinalTwist = () => {
  const [phase, setPhase] = useState<'black' | 'pink'>('black');

  useEffect(() => {
    const timer = setTimeout(() => setPhase('pink'), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto">
      <AnimatePresence mode="wait">
        {phase === 'black' && (
          <motion.div
            key="black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-[#111] flex items-center justify-center p-4"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-white text-2xl md:text-3xl font-serif italic text-center drop-shadow-md"
            >
              Wait… one last thing…
            </motion.p>
          </motion.div>
        )}
        {phase === 'pink' && (
          <motion.div
            key="pink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-[var(--color-bg-base)] flex flex-col items-center justify-center p-4"
          >
            <div className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(circle_at_center,_#FFFFFF_0%,_#FFE4E8_100%)]"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="z-10 text-center flex flex-col items-center"
            >
              <h2 className="text-3xl md:text-5xl font-serif italic text-[var(--color-primary)] drop-shadow-sm mb-8 leading-relaxed">
                No matter what…<br/>Skyy is always there for you 😄
              </h2>
              <TenorFinalMeme />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SurprisePage: React.FC = () => {
  const [step, setStep] = useState(0);
  const { playSound } = useAudio();

  const handleNextStep = () => {
    playSound('pop');
    if (step === 2) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffb6c1', '#fbcfe8', '#f9a8d4', '#fef08a']
      });
    }
    setStep(s => s + 1);
  };

  const handleCakeCut = () => {
    playSound('slice');
    setTimeout(() => {
      playSound('cheer');
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.4 },
        colors: ['#ffb6c1', '#fbcfe8', '#f9a8d4', '#fef08a']
      });
      setStep(6); // Step 6 is Letter
    }, 500);
  };

  const getButtonText = () => {
    switch (step) {
      case 0: return "Bring the Balloons! 🎈";
      case 1: return "Turn on the Lights! ✨";
      case 2: return "Pop the Confetti! 🎉";
      case 3: return "Wait! Incoming message... 📱";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen pt-12 pb-24 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {step >= 1 && <Balloons />}
      {step >= 2 && <FairyLights />}
      
      <div className="z-30 w-full max-w-xl text-center flex flex-col items-center">
        {step < 4 ? (
          <>
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-serif italic text-[var(--color-primary)] drop-shadow-sm mb-4"
              >
                Let's set up the party!
              </motion.h1>
              <p className="text-xs md:text-sm tracking-widest uppercase text-[var(--color-text-muted)] font-light mb-12">
                A special surprise for my dearest bestie
              </p>
              
              <div className="w-full max-w-xs mb-8 flex flex-col items-center">
                <div className="flex items-center justify-between w-full mb-3 px-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-primary)]">Surprise Progress</span>
                  <span className="text-[11px] font-bold text-[var(--color-primary)]">Step {step}/4</span>
                </div>
                <div className="w-full h-2 bg-pink-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / 4) * 100}%` }}
                    className="h-full bg-[var(--color-primary)] rounded-full"
                  />
                </div>
              </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8"
              >
                <Button onClick={handleNextStep}>
                  {getButtonText()}
                </Button>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
            {step === 4 && <ChatSimulation onComplete={() => setStep(5)} />}
            {step === 5 && <Cake onCut={handleCakeCut} />}
            {step >= 6 && <Letter onComplete={() => setStep(7)} />}
            {step === 7 && <FinalTwist />}
          </motion.div>
        )}
      </div>
    </div>
  );
};
