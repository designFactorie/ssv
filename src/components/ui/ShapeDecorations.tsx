"use client";

import { motion } from "framer-motion";

export function Circle({
  className,
  color = "saffron",
  size = 80,
  blur = false,
}: {
  className?: string;
  color?: string;
  size?: number;
  blur?: boolean;
}) {
  const colorMap: Record<string, string> = {
    saffron: "bg-saffron",
    teal: "bg-teal",
    magenta: "bg-magenta",
    purple: "bg-purple",
    sunshine: "bg-sunshine",
    green: "bg-green",
    coral: "bg-coral",
    sky: "bg-sky",
  };

  return (
    <div
      className={`rounded-full ${colorMap[color] || "bg-saffron"} ${blur ? "blur-xl" : ""} ${className || ""}`}
      style={{ width: size, height: size }}
    />
  );
}

export function Star({ className, color = "#FFB800", size = 40 }: { className?: string; color?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

export function Squiggle({ className, color = "#FF6B35" }: { className?: string; color?: string }) {
  return (
    <svg
      className={className}
      width="120"
      height="20"
      viewBox="0 0 120 20"
      fill="none"
    >
      <path
        d="M2 10C10 2 20 18 30 10C40 2 50 18 60 10C70 2 80 18 90 10C100 2 110 18 118 10"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Triangle({ className, color = "#7B2FF7", size = 40 }: { className?: string; color?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
      <polygon points="12,2 22,20 2,20" />
    </svg>
  );
}

export function Plus({ className, color = "#4CAF50", size = 30 }: { className?: string; color?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
      <rect x="10" y="2" width="4" height="20" rx="2" />
      <rect x="2" y="10" width="20" height="4" rx="2" />
    </svg>
  );
}

export function Mandala({ className, size = 200 }: { className?: string; size?: number }) {
  return (
    <motion.svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    >
      {[0, 30, 60, 90, 120, 150].map((angle) => (
        <ellipse
          key={angle}
          cx="100"
          cy="100"
          rx="80"
          ry="30"
          fill="none"
          stroke="#FF6B35"
          strokeWidth="0.5"
          opacity="0.15"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
      {[0, 45, 90, 135].map((angle) => (
        <ellipse
          key={`inner-${angle}`}
          cx="100"
          cy="100"
          rx="50"
          ry="20"
          fill="none"
          stroke="#7B2FF7"
          strokeWidth="0.5"
          opacity="0.12"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
    </motion.svg>
  );
}

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-[10%] left-[5%]"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Circle color="saffron" size={60} blur />
      </motion.div>
      <motion.div
        className="absolute top-[20%] right-[10%]"
        animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Star size={35} color="#E91E63" />
      </motion.div>
      <motion.div
        className="absolute bottom-[30%] left-[10%]"
        animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Triangle size={45} color="#00B4D8" />
      </motion.div>
      <motion.div
        className="absolute top-[60%] right-[5%]"
        animate={{ y: [0, -12, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <Plus size={35} color="#4CAF50" />
      </motion.div>
      <motion.div
        className="absolute bottom-[15%] right-[20%]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <Circle color="purple" size={40} blur />
      </motion.div>
      <motion.div
        className="absolute top-[40%] left-[50%]"
        animate={{ y: [0, -25, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <Star size={25} color="#FFB800" />
      </motion.div>
    </div>
  );
}
