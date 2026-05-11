import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react";

interface AudioContextType {
  playBGM: () => void;
  playSound: (type: 'pop' | 'slice' | 'cheer') => void;
}

const AudioContext = createContext<AudioContextType>({
  playBGM: () => {},
  playSound: () => {},
});

export const useAudio = () => useContext(AudioContext);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Beautiful Piano Romantic Track
    bgmRef.current = new Audio("https://cdn.pixabay.com/audio/2024/09/06/audio_0de18ecea7.mp3");
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.4;
  }, []);

  const playBGM = () => {
    if (bgmRef.current && !isPlaying) {
      bgmRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  };

  const toggleBGM = () => {
    if (bgmRef.current) {
      if (isPlaying) {
        bgmRef.current.pause();
      } else {
        bgmRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playSound = (type: 'pop' | 'slice' | 'cheer') => {
    let url = "";
    if (type === 'pop') url = "https://cdn.pixabay.com/audio/2022/03/15/audio_226500effc.mp3";
    if (type === 'slice') url = "https://cdn.pixabay.com/audio/2021/08/09/audio_924bb3ba9d.mp3";
    if (type === 'cheer') url = "https://cdn.pixabay.com/audio/2021/08/09/audio_82e8e0fc6f.mp3";
    
    if (url) {
      const audio = new Audio(url);
      audio.volume = type === 'pop' ? 0.4 : 0.6;
      audio.play().catch(console.error);
    }
  };

  return (
    <AudioContext.Provider value={{ playBGM, playSound }}>
      {children}
      {isPlaying && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-4 right-4 z-50 p-3 bg-white/80 backdrop-blur-md text-pink-500 rounded-full shadow-lg border border-pink-100"
          onClick={toggleBGM}
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </motion.button>
      )}
    </AudioContext.Provider>
  );
};
