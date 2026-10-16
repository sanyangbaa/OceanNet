import { Variants } from "framer-motion";

export const textVariant = (delay: number = 0): Variants => {
  return {
    hidden: {
      y: 6,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.2,
        delay: Math.min(delay, 0.02),
      },
    },
  };
};

export const fadeIn = (
  direction: "left" | "right" | "up" | "down" | "" = "",
  type: string = "tween",
  delay: number = 0,
  duration: number = 0.25
): Variants => {
  return {
    hidden: {
      x: direction === "left" ? 8 : direction === "right" ? -8 : 0,
      y: direction === "up" ? 8 : direction === "down" ? -8 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        delay: Math.min(delay, 0.02),
        duration: Math.min(duration, 0.25),
        ease: "easeOut",
      },
    },
  };
};

export const zoomIn = (delay: number = 0, duration: number = 0.2): Variants => {
  return {
    hidden: {
      scale: 0.98,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        delay: Math.min(delay, 0.02),
        duration: Math.min(duration, 0.2),
        ease: "easeOut",
      },
    },
  };
};

export const slideIn = (
  direction: "left" | "right" | "up" | "down",
  type: string = "tween",
  delay: number = 0,
  duration: number = 0.25
): Variants => {
  return {
    hidden: {
      x: direction === "left" ? -10 : direction === "right" ? 10 : 0,
      y: direction === "up" ? 10 : direction === "down" ? -10 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        delay: Math.min(delay, 0.02),
        duration: Math.min(duration, 0.25),
        ease: "easeOut",
      },
    },
  };
};

export const staggerContainer = (
  staggerChildren: number = 0.02,
  delayChildren: number = 0
): Variants => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: Math.min(staggerChildren, 0.02),
        delayChildren: delayChildren || 0,
      },
    },
  };
};

