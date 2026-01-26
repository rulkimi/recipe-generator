// components/motion/motions.tsx
"use client";

import { motion, Variants } from "motion/react";
import { ReactNode } from "react";

// ----------------------- Variants -----------------------
export const containerVariant: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.7 } },
};

export const scaleFadeVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export const imageVariant: Variants = {
  hidden: { scale: 0.98, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", duration: 0.8 } },
};

export const blurVariant = (opacity = 0.8): Variants => ({
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity, scale: 1, transition: { duration: 0.8 } },
});

// ----------------------- Motion Components -----------------------
export const FadeUp = ({ children }: { children: ReactNode }) => (
  <motion.div variants={fadeUpVariant}>{children}</motion.div>
);

export const ScaleFade = ({ children }: { children: ReactNode }) => (
  <motion.div variants={scaleFadeVariant}>{children}</motion.div>
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
    variants={containerVariant}
    initial="hidden"
    animate="visible"
  >
    {children}
  </motion.div>
);

export const MotionImage = ({
  src,
  alt,
  className,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <motion.img
    src={src}
    alt={alt}
    className={className}
    style={style}
    variants={imageVariant}
    initial="hidden"
    animate="visible"
  />
);

export const MotionBlur = ({
  className,
  opacity,
}: {
  className?: string;
  opacity?: number;
}) => (
  <motion.div
    className={className}
    variants={blurVariant(opacity)}
    initial="hidden"
    animate="visible"
  />
);
