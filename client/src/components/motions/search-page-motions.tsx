"use client";

import { motion, Variants } from "motion/react";
import { ReactNode } from "react";

// ----------------------- Variants -----------------------
export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeUpWithTransition = (
  delay = 0,
  duration = 0.35,
  ease: [number, number, number, number] = [0.42, 0, 0.58, 1]
) => ({
  initial: "hidden",
  animate: "visible",
  exit: { opacity: 0, y: 8, transition: { duration: duration / 2 } },
  transition: { delay, duration, ease },
});

// ----------------------- Motion Components -----------------------
export const FadeUp = ({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    variants={fadeUpVariant}
    initial="hidden"
    animate="visible"
    transition={{ delay, duration: 0.35, ease: [0.42, 0, 0.58, 1] }}
  >
    {children}
  </motion.div>
);

export const MotionContainer = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 32 }}
    animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] } }}
    exit={{ opacity: 0, y: 20, transition: { duration: 0.22 } }}
  >
    {children}
  </motion.div>
);
