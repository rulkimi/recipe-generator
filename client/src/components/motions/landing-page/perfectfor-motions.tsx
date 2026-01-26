"use client";

import { motion, Variants } from "motion/react";
import { ReactNode } from "react";

// ----------------------- Variants -----------------------
export const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};

export const tagVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.65 } },
};

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.7 } },
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
    whileInView="visible"
    viewport={{ once: true, amount: 0.35 }}
  >
    {children}
  </motion.div>
);

export const MotionTag = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.span
    className={className}
    variants={tagVariants}
  >
    {children}
  </motion.span>
);

export const FadeUp = ({
  children,
  className = "",
  viewportAmount = 0.6,
}: {
  children: ReactNode;
  className?: string;
  viewportAmount?: number;
}) => (
  <motion.div
    className={className}
    variants={fadeUpVariant}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: viewportAmount }}
  >
    {children}
  </motion.div>
);
