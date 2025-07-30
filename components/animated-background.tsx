"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Stars
    const stars: Array<{
      x: number
      y: number
      size: number
      opacity: number
      twinkleSpeed: number
      phase: number
    }> = []

    // Create stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
      })
    }

    // Shooting stars
    const shootingStars: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
    }> = []

    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.3,
        vx: Math.random() * 8 + 4,
        vy: Math.random() * 4 + 2,
        life: 0,
        maxLife: Math.random() * 60 + 40,
      })
    }

    // Create shooting stars periodically
    setInterval(createShootingStar, 3000)

    let animationFrame: number

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star, index) => {
        star.phase += star.twinkleSpeed
        const twinkle = Math.sin(star.phase) * 0.3 + 0.7

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`
        ctx.fill()

        // Add sparkle effect to some stars
        if (Math.random() < 0.001) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(147, 51, 234, ${star.opacity * 0.3})`
          ctx.fill()
        }
      })

      // Draw shooting stars
      shootingStars.forEach((shootingStar, index) => {
        shootingStar.x += shootingStar.vx
        shootingStar.y += shootingStar.vy
        shootingStar.life++

        if (
          shootingStar.life > shootingStar.maxLife ||
          shootingStar.x > canvas.width ||
          shootingStar.y > canvas.height
        ) {
          shootingStars.splice(index, 1)
          return
        }

        const opacity = 1 - shootingStar.life / shootingStar.maxLife

        // Draw trail
        ctx.beginPath()
        ctx.moveTo(shootingStar.x, shootingStar.y)
        ctx.lineTo(shootingStar.x - shootingStar.vx * 10, shootingStar.y - shootingStar.vy * 10)
        ctx.strokeStyle = `rgba(147, 51, 234, ${opacity * 0.8})`
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw head
        ctx.beginPath()
        ctx.arc(shootingStar.x, shootingStar.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)" }}
    />
  )
}
