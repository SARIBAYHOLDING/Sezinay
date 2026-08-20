import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Film, Maximize2, Sparkles, Heart, Upload } from 'lucide-react';

interface LoveVideoPlayerProps {
  initialVideoUrl?: string;
}

export const LoveVideoPlayer: React.FC<LoveVideoPlayerProps> = ({
  initialVideoUrl = '/photos/memory_video.mp4',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [videoSrc, setVideoSrc] = useState<string>(initialVideoUrl);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);
  const [videoTitle, setVideoTitle] = useState<string>('Birlikte Geçirdiğimiz En Özel Video Anımız 🎥✨');

  useEffect(() => {
    // Check if default video exists or can load
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    const handleError = () => {
      setHasError(true);
    };

    const handleLoaded = () => {
      setHasError(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoaded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoaded);
    };
  }, [videoSrc]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasError(false);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const newTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setProgress(parseFloat(e.target.value));
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setVideoTitle(`Özel Video: ${file.name} 💕`);
      setHasError(false);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
          setIsPlaying(true);
        }
      }, 300);
    }
  };

  return (
    <section className="w-full my-12 text-center flex flex-col items-center">
      {/* Header Badge */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-mono uppercase tracking-wider mb-2 px-4 py-1.5 rounded-full bg-pink-950/80 border border-pink-400/40 shadow-lg">
          <Film className="w-4 h-4 text-pink-400" /> Aşkımızın Özel Sineması & Video Köşesi
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white font-heading drop-shadow-xl mt-1">
          Birlikte Anılarımız (Video) 🎬💖
        </h2>
        <p className="text-xs md:text-sm text-pink-100/90 mt-2 max-w-md mx-auto font-light leading-relaxed">
          Sevgilimle geçirdiğimiz en güzel, canlı anlarımız... Videomuzu buradaki sinema perdesinde izleyebilirsin! ✨
        </p>
      </div>

      {/* Luxury Player Card Container */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative w-full max-w-3xl rounded-3xl p-4 md:p-6 bg-gradient-to-b from-pink-950/90 via-purple-950/80 to-black/90 border-2 border-pink-300/50 shadow-2xl backdrop-blur-2xl overflow-hidden"
      >
        {/* Ambient Glow Effects */}
        <div className="absolute -top-12 -left-12 w-44 h-44 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Video Box */}
        <div className="relative w-full aspect-video rounded-2xl bg-black overflow-hidden border border-pink-400/40 shadow-2xl group flex items-center justify-center">
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            className="w-full h-full object-cover rounded-2xl"
          />

          {/* Fallback / Upload Prompt when video file is not yet dropped into public/photos/ */}
          {hasError && (
            <div className="absolute inset-0 bg-gradient-to-br from-rose-950/95 via-purple-950/95 to-black/95 p-6 flex flex-col items-center justify-center text-center backdrop-blur-md">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 rounded-full bg-pink-600/30 border-2 border-pink-400/60 flex items-center justify-center text-pink-300 mb-4 shadow-xl"
              >
                <Film className="w-8 h-8" />
              </motion.div>
              <h3 className="text-xl md:text-2xl font-bold text-white font-heading">
                Video Alanı Sezinay İçin Hazır! 📽️❤️
              </h3>
              <p className="text-xs md:text-sm text-pink-200/90 max-w-md mt-2 leading-relaxed">
                Atacağın harika videoyu bu kutuda oynatmaya sabırsızlanıyoruz! Aşağıdaki butona tıklayarak bilgisayarındaki videoyu hemen yükleyebilir veya doğrudan önizleyebilirsin.
              </p>

              {/* Quick Upload Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-5 px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-400 text-white font-bold text-sm tracking-wide shadow-xl border border-white/40 hover:scale-105 transition-transform flex items-center gap-2"
              >
                <Upload className="w-4 h-4" /> Videonu Seç & Oynat ✨
              </button>
            </div>
          )}

          {/* Center Play Overlay Button */}
          {!hasError && (
            <AnimatePresence>
              {!isPlaying && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={togglePlay}
                  className="absolute z-20 w-16 h-16 md:w-20 md:h-20 rounded-full bg-pink-600/80 hover:bg-pink-500 text-white flex items-center justify-center border-2 border-white shadow-2xl backdrop-blur-md transition-all transform hover:scale-110"
                >
                  <Play className="w-8 h-8 md:w-10 md:h-10 fill-white ml-1" />
                </motion.button>
              )}
            </AnimatePresence>
          )}

          {/* Floating Hearts overlay when playing */}
          {isPlaying && (
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 150, x: (i - 3) * 60 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    y: -150,
                    x: (i - 3) * 70 + Math.sin(i) * 20,
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: 'easeOut',
                  }}
                  className="absolute bottom-4 left-1/2 text-pink-400/60"
                >
                  <Heart className="w-6 h-6 fill-pink-400" />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Video Control Bar */}
        <div className="mt-4 p-3 rounded-2xl bg-black/60 border border-pink-400/30 backdrop-blur-md flex flex-col gap-2">
          {/* Progress Slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-1.5 bg-pink-950 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3 text-white">
              <button
                onClick={togglePlay}
                className="p-2 rounded-full hover:bg-white/10 text-pink-300 hover:text-white transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-pink-300" /> : <Play className="w-5 h-5 fill-pink-300 ml-0.5" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-2 rounded-full hover:bg-white/10 text-pink-300 hover:text-white transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <span className="text-xs font-heading font-semibold text-pink-100 truncate max-w-[200px] md:max-w-xs">
                {videoTitle}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                title="Yeni Video Yükle / Seç"
                className="px-3 py-1.5 rounded-full bg-pink-900/60 border border-pink-400/40 text-pink-200 text-xs font-mono flex items-center gap-1 hover:bg-pink-800 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" /> Video Değiştir
              </button>

              <button
                onClick={handleFullscreen}
                className="p-2 rounded-full hover:bg-white/10 text-pink-300 hover:text-white transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-pink-300/80 px-2 font-mono">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" /> Aşkımızın 4K Anıları
          </span>
          <span>SELO & Sezinay Sineması 🍿❤️</span>
        </div>
      </motion.div>
    </section>
  );
};
