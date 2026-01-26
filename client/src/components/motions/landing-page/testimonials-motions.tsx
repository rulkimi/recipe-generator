"use client";

import { motion, Variants } from "motion/react";
import { ReactNode } from "react";

// ----------------------- Variants -----------------------
export const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", duration: 0.72 } },
};

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.6 } },
};

// ----------------------- Motion Components -----------------------
export const MotionContainer = ({
  children,
  className = "",
  viewportAmount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  viewportAmount?: number;
}) => (
  <motion.div
    className={className}
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: viewportAmount }}
  >
    {children}
  </motion.div>
);

export const MotionCard = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    className={className}
    variants={cardVariants}
  >
    {children}
  </motion.div>
);

export const FadeUp = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div className={className} variants={fadeUpVariant}>
    {children}
  </motion.div>
);
