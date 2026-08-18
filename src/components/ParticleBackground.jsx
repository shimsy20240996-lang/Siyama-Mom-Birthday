import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = 60;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 30 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-transparent">
      {/* Animated Gradient Background */}
      <motion.div 
        className="absolute inset-0 opacity-60 mix-blend-overlay"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, #F4D9D0 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, #E3B7AD 0%, transparent 50%)',
            'radial-gradient(circle at 0% 100%, #F2DCD4 0%, transparent 50%)',
            'radial-gradient(circle at 100% 0%, #F4D9D0 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, #F4D9D0 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute inset-0 opacity-40 mix-blend-multiply"
        animate={{
          background: [
            'radial-gradient(circle at 100% 50%, #E3B7AD 0%, transparent 60%)',
            'radial-gradient(circle at 0% 50%, #F4D9D0 0%, transparent 60%)',
            'radial-gradient(circle at 100% 50%, #E3B7AD 0%, transparent 60%)',
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
      
      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(108,76,74,0.05)_100%)]" />
    </div>
  );
};

export default ParticleBackground;
