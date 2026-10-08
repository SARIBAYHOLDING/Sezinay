import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Key,
  Lock,
  ShieldAlert,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Trash2,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Film,
  Upload,
} from 'lucide-react';

interface MaintenanceScreenProps {
  initialVideoSrc?: string;
}

type SecretStep = 'IDLE' | 'COUNTDOWN' | 'WARNING_1' | 'WARNING_2' | 'VIDEO' | 'DELETED';

export function MaintenanceScreen({ initialVideoSrc = '/photos/selo_secret_video.mp4' }: MaintenanceScreenProps) {
  // Secret flow state
  const [step, setStep] = useState<SecretStep>('IDLE');
  const [countdown, setCountdown] = useState<number>(3);
  const [videoSrc, setVideoSrc] = useState<string>(initialVideoSrc);
  const [hasWatched, setHasWatched] = useState<boolean>(() => {
    return localStorage.getItem('selo_secret_video_watched') === 'true';
  });

  // Custom Video Player States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState<string>('00:00');
  const [durationFormatted, setDurationFormatted] = useState<string>('00:00');
  const [videoError, setVideoError] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle countdown logic
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (step === 'COUNTDOWN') {
      if (countdown > 1) {
        timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      } else if (countdown === 1) {
        timer = setTimeout(() => {
          setCountdown(3);
          setStep('WARNING_1');
        }, 1000);
      }
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  // Video time tracking (seeking is explicitly disabled)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || step !== 'VIDEO') return;

    const formatTime = (secs: number) => {
      const mins = Math.floor(secs / 60);
      const remainingSecs = Math.floor(secs % 60);
      return `${mins < 10 ? '0' : ''}${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
    };

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
        setCurrentTimeFormatted(formatTime(video.currentTime));
        setDurationFormatted(formatTime(video.duration));
      }
    };

    const handleVideoEnded = () => {
      setIsPlaying(false);
      localStorage.setItem('selo_secret_video_watched', 'true');
      setHasWatched(true);
      setStep('DELETED');
    };

    const handleError = () => {
      setVideoError(true);
    };

    const handleLoadedData = () => {
      setVideoError(false);
      if (video.duration) {
        setDurationFormatted(formatTime(video.duration));
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleVideoEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleVideoEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [step]);

  // Block keyboard seeking (ArrowLeft, ArrowRight, etc.)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (step === 'VIDEO') {
        if (['ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [step]);

  // Handle secret button click
  const handleSecretButtonClick = () => {
    if (hasWatched) {
      setStep('DELETED');
      return;
    }
    setCountdown(3);
    setStep('COUNTDOWN');
  };

  // Start playing video when user approves second warning
  const handleStartVideo = () => {
    setStep('VIDEO');
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          setVideoError(false);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }, 200);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
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
      setVideoError(false);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
          setIsPlaying(true);
        }
      }, 300);
    }
  };

  // Reset video state for testing/development
  const handleResetForTest = () => {
    localStorage.removeItem('selo_secret_video_watched');
    setHasWatched(false);
    setStep('IDLE');
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden select-none">
      {/* Subtle Ambient Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ================= SOL ÜST GİZLİ TUŞ (TOP-LEFT SECRET BUTTON) ================= */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="relative group"
        >
          <motion.button
            onClick={handleSecretButtonClick}
            whileHover={{ scale: 1.15, rotate: -6 }}
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 rounded-2xl bg-white/5 hover:bg-rose-950/80 border border-white/20 hover:border-pink-400/60 text-white/60 hover:text-pink-300 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:shadow-[0_0_30px_rgba(244,63,94,0.5)] transition-all cursor-pointer backdrop-blur-xl"
            title="🔒 Özel Gizli Kapı"
          >
            {hasWatched ? (
              <Lock className="w-5 h-5 text-rose-400" />
            ) : (
              <Key className="w-5 h-5 text-pink-400 group-hover:rotate-12 transition-transform" />
            )}
          </motion.button>
        </motion.div>
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-xl w-full flex flex-col items-center text-center p-8 md:p-14 rounded-3xl border border-white/15 bg-black/80 backdrop-blur-2xl shadow-[0_0_90px_rgba(255,255,255,0.08)]"
      >
        {/* Floating Heart Icon with Glow */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="mb-8 p-5 rounded-full bg-white/5 border border-white/20 text-white shadow-[0_0_40px_rgba(255,255,255,0.25)]"
        >
          <Heart className="w-12 h-12 text-white fill-white/20 animate-pulse" />
        </motion.div>

        {/* Maintenance Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 text-xs md:text-sm tracking-widest uppercase text-white/80 font-mono mb-6"
        >
          <Sparkles className="w-4 h-4 text-white/90 animate-spin-slow" /> GEÇİCİ BAKIM MODU
        </motion.div>

        {/* Primary Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-heading drop-shadow-[0_0_35px_rgba(255,255,255,0.6)] mb-4 leading-tight"
        >
          Geçici Bakımdayız
        </motion.h1>

        {/* Heartfelt Subtitle in Handwriting Font */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="font-handwriting text-4xl md:text-6xl text-white/95 drop-shadow-[0_0_25px_rgba(255,255,255,0.5)] my-3 leading-relaxed"
        >
          Ömrüm barışana kadar...
        </motion.p>

        {/* Decorative Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="w-32 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent my-6"
        />

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xs md:text-sm text-white/50 font-mono tracking-widest uppercase"
        >
          Selo & Sezinay ❤️
        </motion.p>
      </motion.div>

      {/* ================= OVERLAY MODALS ================= */}
      <AnimatePresence>
        {/* 1. COUNTDOWN STEP (3-2-1) */}
        {step === 'COUNTDOWN' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-pink-300 font-mono tracking-widest text-sm md:text-base uppercase mb-8"
            >
              Gizli Kapı Açılıyor... 🔑✨
            </motion.p>

            <motion.div
              key={countdown}
              initial={{ scale: 0.3, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 1.8, opacity: 0, rotate: 10 }}
              transition={{ duration: 0.5, ease: 'backOut' }}
              className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-pink-500/60 bg-gradient-to-br from-pink-600/30 to-purple-900/40 flex items-center justify-center shadow-[0_0_100px_rgba(244,63,94,0.6)] backdrop-blur-md"
            >
              <span className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-200 to-rose-500 font-heading">
                {countdown}
              </span>
            </motion.div>
          </motion.div>
        )}

        {/* 2. WARNING MODAL 1 ("Dikkat Selo Çıkabilir") */}
        {step === 'WARNING_1' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              className="max-w-md w-full rounded-3xl p-8 bg-gradient-to-b from-rose-950/90 via-black to-purple-950/90 border-2 border-rose-500/50 shadow-[0_0_80px_rgba(244,63,94,0.5)] backdrop-blur-2xl text-center flex flex-col items-center relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-400/50 flex items-center justify-center text-rose-400 mb-6 shadow-xl animate-bounce">
                <ShieldAlert className="w-9 h-9" />
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white font-heading tracking-tight mb-3">
                Uyarı! ⚠️
              </h3>

              <p className="text-lg md:text-xl font-bold text-rose-200 my-2">
                Dikkat Selo Çıkabilir
              </p>

              <p className="text-xs md:text-sm text-white/70 mt-2 mb-8 leading-relaxed">
                Devam etmek istediğinden emin misin? Özel içerik yüklenmek üzere.
              </p>

              {/* Action Buttons: Tamam & İstemez */}
              <div className="grid grid-cols-2 gap-4 w-full">
                <button
                  onClick={() => setStep('IDLE')}
                  className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <XCircle className="w-4 h-4 text-white/70" /> İstemez
                </button>

                <button
                  onClick={() => setStep('WARNING_2')}
                  className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 border border-rose-300 text-white font-bold text-sm shadow-lg shadow-rose-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" /> Tamam
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* 3. WARNING MODAL 2 ("Tek gönderimlik videodur...") */}
        {step === 'WARNING_2' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              className="max-w-md w-full rounded-3xl p-8 bg-gradient-to-b from-purple-950/90 via-black to-pink-950/90 border-2 border-purple-400/50 shadow-[0_0_80px_rgba(168,85,247,0.5)] backdrop-blur-2xl text-center flex flex-col items-center relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-400/50 flex items-center justify-center text-purple-300 mb-6 shadow-xl">
                <AlertTriangle className="w-9 h-9 animate-pulse" />
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white font-heading tracking-tight mb-3">
                Son Bildirim 🤫
              </h3>

              <div className="p-4 rounded-2xl bg-purple-900/40 border border-purple-400/40 my-3 text-purple-100 font-semibold text-sm md:text-base leading-relaxed shadow-inner">
                "Tek gönderimlik videodur, izlendikten sonra video kendini silecektir"
              </div>

              <p className="text-xs text-white/60 mt-1 mb-8">
                * Video bittiğinde otomatik olarak kapanacak ve tekrar oynatılamayacaktır.
              </p>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 w-full">
                <button
                  onClick={() => setStep('IDLE')}
                  className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <XCircle className="w-4 h-4 text-white/70" /> Vazgeç
                </button>

                <button
                  onClick={handleStartVideo}
                  className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:scale-[1.02] border border-pink-300 text-white font-bold text-sm shadow-lg shadow-purple-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Play className="w-4 h-4 text-white fill-white" /> Tamam, Aç 🎬
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* 4. RESTRICTED VIDEO PLAYER (NO SEEKING & ONE-TIME VIEWING) */}
        {step === 'VIDEO' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-8 select-none"
          >
            {/* Header info */}
            <div className="mb-4 text-center max-w-xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-mono uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5" /> Geri / İleri Sarma Engellendi • Tek İzlenimlik Video
              </span>
            </div>

            {/* Video Container */}
            <div className="relative w-full max-w-4xl max-h-[75vh] aspect-video rounded-3xl overflow-hidden border-2 border-pink-500/60 shadow-[0_0_100px_rgba(244,63,94,0.4)] bg-black group flex items-center justify-center">
              <video
                ref={videoRef}
                src={videoSrc}
                playsInline
                controls={false}
                onContextMenu={(e) => e.preventDefault()}
                className="w-full h-full object-contain mx-auto rounded-3xl"
              />

              {/* Fallback / Upload Prompt if video file is missing or not yet copied to public/photos/ */}
              {videoError && (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-950/95 via-black/95 to-rose-950/95 p-6 flex flex-col items-center justify-center text-center backdrop-blur-xl z-30">
                  <Film className="w-14 h-14 text-pink-400 mb-3 animate-pulse" />
                  <h3 className="text-xl md:text-2xl font-bold text-white font-heading">
                    Henüz Video Dosyası Yüklenmedi 📽️
                  </h3>
                  <p className="text-xs md:text-sm text-pink-200/90 max-w-md mt-2 leading-relaxed mb-6">
                    Video dosyasını projendeki <code className="bg-white/10 px-2 py-0.5 rounded text-amber-300">public/photos/selo_secret_video.mp4</code> konumuna atabilir veya hemen bilgisayarından seçip izleyebilirsin!
                  </p>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-amber-400 text-white font-bold text-sm tracking-wide shadow-xl border border-white/40 hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" /> Videonu Bilgisayarından Seç & Oynat ✨
                  </button>
                </div>
              )}

              {/* Floating Hearts overlay during playback */}
              {isPlaying && !videoError && (
                <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 120, x: (i - 2) * 80 }}
                      animate={{
                        opacity: [0, 0.7, 0],
                        y: -120,
                        x: (i - 2) * 90 + Math.sin(i) * 30,
                      }}
                      transition={{
                        duration: 3.5 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: 'easeOut',
                      }}
                      className="absolute bottom-6 left-1/2 text-pink-400/60"
                    >
                      <Heart className="w-6 h-6 fill-pink-400" />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Hidden file selector */}
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Custom Control Bar (Strictly Non-Seekable) */}
            <div className="w-full max-w-4xl mt-4 p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl flex flex-col gap-3">
              {/* Visual-only progress bar (Pointer Events Disabled so user CANNOT seek) */}
              <div className="relative w-full h-2 bg-white/20 rounded-full overflow-hidden pointer-events-none">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-400 transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-4 text-white">
                  <button
                    onClick={togglePlay}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-pink-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-pink-300" />
                    ) : (
                      <Play className="w-5 h-5 fill-pink-300 ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-pink-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>

                  <div className="text-xs font-mono text-pink-200 tracking-wider">
                    {currentTimeFormatted} / {durationFormatted}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    title="Video Yükle / Değiştir"
                    className="px-3 py-1.5 rounded-full bg-pink-950/80 border border-pink-400/40 text-pink-200 text-xs font-mono flex items-center gap-1.5 hover:bg-pink-900 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" /> Video Seç
                  </button>

                  <button
                    onClick={handleFullscreen}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-pink-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <p className="text-xs text-white/50 font-mono mt-3 text-center">
              ⚠️ Video bittiğinde otomatik kapanacak ve tek izlenimlik hakkı dolacaktır.
            </p>
          </motion.div>
        )}

        {/* 5. WATCHED / DELETED STEP */}
        {step === 'DELETED' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              className="max-w-md w-full rounded-3xl p-8 bg-gradient-to-b from-gray-950 via-black to-rose-950 border-2 border-white/20 shadow-2xl backdrop-blur-2xl text-center flex flex-col items-center relative"
            >
              <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-400/50 flex items-center justify-center text-rose-400 mb-6 shadow-xl">
                <Trash2 className="w-9 h-9 animate-bounce" />
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white font-heading tracking-tight mb-3">
                Video Silindi! 💥🔒
              </h3>

              <p className="text-sm md:text-base text-rose-200/90 my-2 leading-relaxed">
                Bu özel video tek kullanımlıktı. İzlendiği için sistem tarafından otomatik olarak silindi ve erişime kapatıldı.
              </p>

              <div className="w-full h-[1px] bg-white/10 my-6" />

              <div className="flex flex-col gap-3 w-full">
                <button
                  onClick={() => setStep('IDLE')}
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Bakım Moduna Dön
                </button>

                {/* Developer / Selo Reset Option to Re-test */}
                <button
                  onClick={handleResetForTest}
                  title="Sıfırla (Tekrar İzlemek İçin Test Butonu)"
                  className="w-full px-4 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 text-xs font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 mt-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> (Selo İçin) Videoyu Yeniden Kilitsiz Yap / Sıfırla
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
