import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function ProgressBar({ progress }) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedProgress((prev) => {
        if (prev < progress) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 10);
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="w-full bg-gray-900/50 h-5 rounded-full mt-4">
      <motion.div
        className="h-5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
        style={{ width: `${animatedProgress}%` }}
      />
    </div>
  );
}

export default ProgressBar;
