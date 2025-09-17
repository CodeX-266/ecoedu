import React from "react";
import { motion } from "framer-motion";

function ScoreBoard({ score, total }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center text-lg font-semibold text-cyan-400"
    >
      Score: {score} / {total}
    </motion.div>
  );
}

export default ScoreBoard;
