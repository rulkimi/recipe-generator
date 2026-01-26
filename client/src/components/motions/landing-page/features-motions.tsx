"use client";

import { motion, Variants } from "motion/react";
import { ReactNode } from "react";

// ----------------------- Variants -----------------------
export const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16 } },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", duration: 0.68 },
  },
};

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 0.7 },
  },
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
    viewport={{ once: true, amount: 0.4 }}
  >
    {children}
  </motion.div>
);

export const MotionCard = ({
  children,
  className = "",
  whileHover,
}: {
  children: ReactNode;
  className?: string;
  whileHover?: any;
}) => (
  <motion.div
    className={className}
    variants={cardVariants}
    whileHover={whileHover}
    transition={{ type: "spring", stiffness: 240 }}
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
  <motion.div
    className={className}
    variants={fadeUpVariant}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
  >
    {children}
  </motion.div>
);
