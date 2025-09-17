import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles"; 
import bgImage from "../assets/background.jpg";
import "@fontsource/cinzel-decorative";

export default function Landing() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen w-screen overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-10"
        options={{
          fpsLimit: 60,
          background: { color: "transparent" },
          particles: {
            number: { value: 100, density: { enable: true, area: 800 } },
            size: { value: 5, random: { enable: true, minimumValue: 3 } },
            color: { value: "#ffffff" },
            move: { enable: true, speed: 1.5, outModes: { default: "bounce" } },
            opacity: { value: 1, random: true },
            shape: { type: "circle" },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 120 } },
          },
        }}
      />

      {/* Floating Shapes */}
      <motion.div
        className="absolute w-24 h-24 bg-white rounded-full opacity-40 z-10"
        animate={{ y: [0, 20, 0], x: [0, 15, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-32 h-32 bg-white rounded-full opacity-35 z-10"
        animate={{ y: [0, -25, 0], x: [0, -15, 0], rotate: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Hero Content */}
      <div className="relative z-20 text-center px-4 flex flex-col items-center justify-center h-full max-w-full">
        <motion.h1
          style={{
            color: "white",
            textShadow: "0 0 15px rgba(255,255,255,0.7)",
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "12vw",
            lineHeight: 1,
          }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          InTutor
        </motion.h1>

        <motion.p
          className="mt-6 text-2xl md:text-4xl text-white opacity-90 font-semibold"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        >
          Gamified Environmental Learning
        </motion.p>

        <motion.a
          href="/dashboard"
          className="mt-8 inline-block px-10 py-4 bg-white text-green-700 font-bold rounded-lg shadow-lg hover:bg-green-100 transition-all"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.9)" }}
        >
          Enter Dashboard
        </motion.a>
      </div>
    </div>
  );
}