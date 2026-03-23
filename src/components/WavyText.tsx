import React, { useState } from "react"
import { motion } from "framer-motion"

interface WavyTextProps {
  text: string
  className?: string
}

export const WavyText: React.FC<WavyTextProps> = ({ text, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false)
  const letters = text.split("")

  return (
    <div
      className={`inline-block cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className='relative inline-flex overflow-hidden'
        style={{ height: "1.4em" }}
      >
        {letters.map((letter, index) => (
          <div
            key={index}
            className='relative inline-block'
            style={{ width: letter === " " ? "0.3em" : "auto" }}
          >
            {/* Original text moving up */}
            <motion.span
              className='inline-block'
              initial={{ y: 0 }}
              animate={{
                y: isHovered ? "-100%" : 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.03,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>

            {/* Duplicate text coming from bottom */}
            <motion.span
              className='inline-block absolute left-0'
              initial={{ y: "100%" }}
              animate={{
                y: isHovered ? 0 : "100%",
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.03,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  )
}
