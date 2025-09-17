import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

function QuizCard3D({ question, onAnswer }) {
  const cardRef = useRef();

  // Simple rotation animation
  useFrame(({ clock }) => {
    if (cardRef.current) {
      cardRef.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.2;
      cardRef.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <group ref={cardRef}>
      {/* 3D card box */}
      <mesh>
        <boxGeometry args={[2, 1, 0.1]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>

      {/* Question as HTML overlay */}
      <Html center>
        <div className="text-white text-center p-2">
          <p className="font-bold">{question.question}</p>
          <div className="mt-2 flex flex-col space-y-2">
            {question.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => onAnswer(idx)}
                className="bg-cyan-600 hover:bg-cyan-500 px-2 py-1 rounded"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}

export default QuizCard3D;
