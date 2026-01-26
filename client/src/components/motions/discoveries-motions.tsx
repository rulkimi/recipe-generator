"use client";

import { motion, AnimatePresence, Variants } from "motion/react";
import { ReactNode } from "react";

// ----------------------- Variants -----------------------
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.18, ease: [0.42, 0, 0.58, 1] }
  },
  exit: { opacity: 0, transition: { duration: 0.12 } }
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.23,
      ease: [0.42, 0, 0.58, 1]
    }
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.17, ease: [0.42, 0, 0.58, 1] }
  }
};

// ----------------------- Motion Components -----------------------

export const MotionContainer = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    className={className}
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    <AnimatePresence>
      {children}
    </AnimatePresence>
  </motion.div>
);

export const MotionCard = ({
  children,
  className = "",
  transitionOverride,
  motionKey
}: {
  children: ReactNode;
  className?: string;
  transitionOverride?: any;
  motionKey?: string | number;
}) => (
  <motion.div
    className={className}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    transition={transitionOverride}
    // whileHover={{
    //   scale: 1.022,
    //   boxShadow: "0 6px 28px 0 rgba(0,0,0,0.04)",
    //   transition: { type: "spring", stiffness: 340, damping: 17 }
    // }}
    whileTap={{ scale: 0.985 }}
    key={motionKey}
    layout
  >
    {children}
  </motion.div>
);
