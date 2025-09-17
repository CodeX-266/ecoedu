import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import bgImage from "../assets/background.jpg"; // your dark full-screen background
import "@fontsource/cinzel-decorative"; // ✨ mystical font

export default function Landing() {
  return (
    <div
      className="relative flex items-center justify-center h-screen w-screen overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-500 to-green-300 opacity-30 z-0"></div>

      {/* Particle Background */}
      <Particles
        className="absolute inset-0 z-0"
        options={{
          fpsLimit: 60,
          particles: {
            number: { value: 70 },
            size: { value: 3 },
            color: { value: "#D1FAE5" },
            move: { speed: 1, outModes: { default: "bounce" } },
            opacity: { value: 0.6, random: true },
            shape: { type: "circle" },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
          },
        }}
      />

      {/* Floating Shapes */}
      <motion.div
        className="absolute w-24 h-24 bg-white rounded-full opacity-20 top-20 left-10 z-0"
        animate={{ y: [0, 20, 0], x: [0, 15, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-32 h-32 bg-white rounded-full opacity-15 bottom-32 right-20 z-0"
        animate={{ y: [0, -25, 0], x: [0, -15, 0], rotate: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Hero Content */}
      <div className="relative z-20 text-center px-4">
        {/* Title */}
        <motion.h1
          style={{
            color: "white",
            textShadow: "0 0 12px rgba(255,255,255,0.6)", // ✨ softer glow
            fontFamily: "'Cinzel Decorative', serif", // mystical font
          }}
          className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-extrabold leading-none"
          initial={{ y: 400, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          InTutor
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-3xl md:text-5xl text-white opacity-90 font-semibold"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        >
          Gamified Environmental Learning
        </motion.p>

        {/* Button */}
        <motion.a
          href="/dashboard"
          className="mt-10 inline-block px-14 py-6 bg-white text-green-700 font-bold rounded-xl shadow-2xl hover:bg-green-100 hover:scale-105 transition-all"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 35px rgba(255,255,255,0.9)",
          }}
        >
          Enter Dashboard
        </motion.a>
      </div>
    </div>
  );
}
