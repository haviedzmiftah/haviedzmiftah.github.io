"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function FramerMotionProvider({ children }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.25,
          ease: "easeOut",
        }}
        className="flex-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
