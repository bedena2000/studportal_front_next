"use client";
import { motion } from "motion/react";

export default function AnimatedWrapper({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -100,
      }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="border-2 p-4 rounded-3xl w-full text-white h-[700px] overflow-auto"
    >
      <div className="overflow-auto h-full">{children}</div>
    </motion.div>
  );
}
