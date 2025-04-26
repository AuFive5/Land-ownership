import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const BlockchainAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circles: { x: number; y: number; size: number; color: string }[] = [];
  
  // Create array of circle positions
  for (let i = 0; i < 8; i++) {
    circles.push({
      x: 50 + Math.sin(i * Math.PI / 4) * 120,
      y: 50 + Math.cos(i * Math.PI / 4) * 80,
      size: 12 + Math.random() * 8,
      color: i % 2 === 0 ? '#1E40AF' : '#3B82F6'
    });
  }

  // Create connecting lines
  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
    [0, 3], [1, 4], [2, 5], [3, 6], [4, 7], [5, 0], [6, 1], [7, 2]
  ];

  return (
    <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden" ref={containerRef}>
      <svg width="100%" height="100%" className="absolute">
        {connections.map((connection, index) => (
          <motion.line
            key={index}
            x1={circles[connection[0]].x}
            y1={circles[connection[0]].y}
            x2={circles[connection[1]].x}
            y2={circles[connection[1]].y}
            stroke="#E2E8F0"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.05,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: Math.random() * 2
            }}
          />
        ))}
        
        {circles.map((circle, index) => (
          <motion.circle
            key={index}
            cx={circle.x}
            cy={circle.y}
            r={circle.size}
            fill={circle.color}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring"
            }}
          />
        ))}
      </svg>

      {/* Animated data blocks */}
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-8 h-8 rounded bg-blue-500/20 border border-blue-600"
          initial={{ 
            x: circles[index].x, 
            y: circles[index].y, 
            opacity: 0 
          }}
          animate={{ 
            x: [
              circles[index].x,
              circles[(index + 1) % 8].x,
              circles[(index + 2) % 8].x,
              circles[(index + 3) % 8].x,
              circles[index].x
            ],
            y: [
              circles[index].y,
              circles[(index + 1) % 8].y,
              circles[(index + 2) % 8].y,
              circles[(index + 3) % 8].y,
              circles[index].y
            ],
            opacity: [0, 1, 1, 1, 0]
          }}
          transition={{
            duration: 8,
            delay: index * 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default BlockchainAnimation;