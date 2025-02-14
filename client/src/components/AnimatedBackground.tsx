import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-orange-200/20 blur-3xl -top-48 -right-48 animate-pulse" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-orange-300/20 blur-2xl -bottom-24 -left-24 animate-pulse delay-1000" />

      {/* Animated hexagons */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            opacity: 0.1,
            scale: 0.8,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1.1, 0.8],
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-24 h-24 rotate-45 border-2 border-orange-300/20 backdrop-blur-sm" />
        </motion.div>
      ))}

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <motion.path
          d="M0 100 Q 250 250 500 100 T 1000 100"
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(251, 146, 60)" />
            <stop offset="100%" stopColor="rgb(251, 146, 60)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: 15 + Math.random() * 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Block mining animation */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`block-${i}`}
          className="absolute"
          initial={{
            opacity: 0,
            scale: 0.5,
            x: window.innerWidth * 0.2 + (i * window.innerWidth * 0.3),
            y: window.innerHeight,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
            y: [window.innerHeight, window.innerHeight * 0.3, -100],
          }}
          transition={{
            duration: 8,
            delay: i * 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="relative">
            <div className="w-16 h-16 bg-orange-400/10 backdrop-blur-sm rounded-lg border border-orange-300/30 rotate-45">
              <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                <span className="text-xs font-mono text-orange-600/40">BLOCK</span>
              </div>
            </div>
            <motion.div
              className="absolute inset-0 bg-orange-400/20 rounded-lg"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}