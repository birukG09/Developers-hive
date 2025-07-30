"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Code, Zap, Star, Sparkles, Moon, Rocket } from "lucide-react"

export function FloatingElements() {
  const [elements, setElements] = useState<
    Array<{
      id: number
      x: number
      y: number
      icon: React.ReactNode
      size: number
      speed: number
      rotation: number
      rotationSpeed: number
    }>
  >([])

  useEffect(() => {
    const icons = [
      <Code key="code" className="text-purple-400" />,
      <Zap key="zap" className="text-yellow-400" />,
      <Star key="star" className="text-blue-400" />,
      <Sparkles key="sparkles" className="text-pink-400" />,
      <Moon key="moon" className="text-yellow-300" />,
      <Rocket key="rocket" className="text-red-400" />,
    ]

    const newElements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      icon: icons[Math.floor(Math.random() * icons.length)],
      size: Math.random() * 20 + 10,
      speed: Math.random() * 0.5 + 0.1,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1,
    }))

    setElements(newElements)

    const interval = setInterval(() => {
      setElements((prev) =>
        prev.map((element) => ({
          ...element,
          y: element.y - element.speed,
          rotation: element.rotation + element.rotationSpeed,
          ...(element.y < -50 && {
            y: window.innerHeight + 50,
            x: Math.random() * window.innerWidth,
          }),
        })),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute opacity-20 animate-pulse"
          style={{
            left: element.x,
            top: element.y,
            transform: `rotate(${element.rotation}deg)`,
            fontSize: element.size,
          }}
        >
          {element.icon}
        </div>
      ))}
    </div>
  )
}
