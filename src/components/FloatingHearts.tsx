import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Generate some stable hearts on mount
    const makeHearts = () => {
      const newHearts = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      }));
      setHearts(newHearts);
    };

    makeHearts();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-300 opacity-40 select-none"
          initial={{ 
            x: `${heart.x}vw`, 
            y: "110vh", 
            scale: heart.size / 20, 
            rotate: 0 
          }}
          animate={{ 
            y: "-10vh",
            x: [`${heart.x}vw`, `${heart.x + (Math.random() > 0.5 ? 5 : -5)}vw`],
            rotate: 360
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear"
          }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  );
};
