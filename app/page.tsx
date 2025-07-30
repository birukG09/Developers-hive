"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Users, Zap, Trophy, Calendar, Bot, Github, Linkedin, Star, Sparkles, Rocket, Moon } from "lucide-react"
import Link from "next/link"
import { AnimatedBackground } from "@/components/animated-background"
import { FloatingElements } from "@/components/floating-elements"

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Live Code Rooms",
      description:
        "Collaborate in real-time with other developers using our advanced code editor with syntax highlighting and live cursors.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Micro Knowledge Drops",
      description:
        "Share quick coding insights and tips in 280 characters or less. Vote on the best drops and build your reputation.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "Smart Assistant",
      description:
        "Get intelligent code suggestions, summaries, and relevant resources to enhance your coding experience and productivity.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Gamified Reputation",
      description:
        "Earn points for contributions, climb the leaderboard, and showcase your expertise to the developer community.",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Scheduled Sessions",
      description:
        "Join competitive coding sessions, practice interviews, or host study groups with timed challenges and scoreboards.",
      gradient: "from-red-500 to-pink-500",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Developer Community",
      description:
        "Connect with developers worldwide, from bootcamp students to senior engineers, all in one collaborative space.",
      gradient: "from-indigo-500 to-purple-500",
    },
  ]

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/birukG09",
      color: "hover:text-gray-300",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/biruk-gebre-230935238/",
      color: "hover:text-blue-400",
    },
    {
      name: "Reddit",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
      ),
      href: "https://www.reddit.com/user/Safe-Present-1030/",
      color: "hover:text-orange-400",
    },
  ]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <AnimatedBackground />
      <FloatingElements />

      {/* Cursor glow effect */}
      <div
        className="fixed pointer-events-none z-50 w-96 h-96 rounded-full opacity-20 bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl transition-all duration-300"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Header */}
      <header className="relative z-40 border-b border-slate-800/50 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl flex items-center justify-center animate-pulse">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-bounce">
                <Sparkles className="h-3 w-3 text-black m-0.5" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                DevHive
              </span>
              <div className="flex items-center space-x-1 text-xs">
                <Moon className="h-3 w-3 text-yellow-400" />
                <span className="text-slate-400">Space Edition</span>
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#features"
              className="text-slate-300 hover:text-white transition-all duration-300 hover:scale-105"
            >
              Features
            </Link>
            <Link
              href="#community"
              className="text-slate-300 hover:text-white transition-all duration-300 hover:scale-105"
            >
              Community
            </Link>
            <div className="flex items-center space-x-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className={`text-slate-400 transition-all duration-300 hover:scale-110 ${social.color}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
            <Link href="/login" className="text-slate-300 hover:text-white transition-all duration-300 hover:scale-105">
              Login
            </Link>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white border-0 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            >
              <Link href="/register">
                <Rocket className="h-4 w-4 mr-2" />
                Launch
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-30 py-32 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-sm animate-pulse">
              <Star className="h-3 w-3 mr-1" />
              Real-time Collaboration Platform
              <Sparkles className="h-3 w-3 ml-1" />
            </Badge>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-pulse">
              Code in the
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Cosmic Void
            </span>
          </h1>

          <p className="text-xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join thousands of developers in our cosmic coding universe. Share knowledge drops like shooting stars,
            collaborate in live rooms across the galaxy, and let intelligent assistance guide your journey through the
            infinite possibilities of code.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white text-lg px-12 py-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-110 group"
            >
              <Link href="/dashboard" className="flex items-center">
                <Rocket className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                Launch Into Space
                <Sparkles className="h-4 w-4 ml-2 group-hover:animate-spin" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-slate-600 text-slate-300 hover:bg-slate-800/50 text-lg px-12 py-4 rounded-full bg-black/20 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-purple-500/50"
            >
              <Moon className="h-5 w-5 mr-2" />
              Explore Galaxy
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-30 py-32 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Cosmic Features
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Discover the tools that will transform your coding journey across the digital universe
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group bg-black/40 border border-slate-800/50 hover:border-slate-600/50 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardHeader className="relative z-10">
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <CardTitle className="text-white text-xl group-hover:text-purple-200 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-30 py-32 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50K+", label: "Cosmic Developers", color: "from-purple-400 to-pink-400" },
              { value: "200K+", label: "Knowledge Stars", color: "from-blue-400 to-cyan-400" },
              { value: "5K+", label: "Daily Missions", color: "from-green-400 to-emerald-400" },
              { value: "∞", label: "Smart Assistance", color: "from-yellow-400 to-orange-400" },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div
                  className={`text-6xl font-bold mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.value}
                </div>
                <div className="text-slate-300 text-lg group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Integration Section */}
      <section className="relative z-30 py-32 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Connect Across the Universe
            </span>
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Share your cosmic coding journey across all platforms and connect with developers throughout the galaxy
          </p>

          <div className="flex justify-center space-x-8">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center space-y-3 p-6 rounded-2xl bg-black/40 border border-slate-800/50 hover:border-slate-600/50 backdrop-blur-xl transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                <div className="p-4 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/40 group-hover:to-pink-500/40 transition-all duration-300">
                  <div className={`text-slate-400 group-hover:scale-110 transition-all duration-300 ${social.color}`}>
                    {social.icon}
                  </div>
                </div>
                <span className="text-slate-300 group-hover:text-white transition-colors duration-300 font-medium">
                  {social.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-30 py-32 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto p-12 rounded-3xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-slate-800/50 backdrop-blur-xl">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Ready to Join the Cosmic Hive?
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
              Embark on an interstellar coding adventure. Share knowledge like shooting stars, collaborate across
              dimensions, and let intelligent assistance be your cosmic guide.
            </p>
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white text-xl px-16 py-6 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-110 group"
            >
              <Link href="/register" className="flex items-center">
                <Rocket className="h-6 w-6 mr-3 group-hover:animate-bounce" />
                Launch Your Journey
                <Star className="h-5 w-5 ml-3 group-hover:animate-spin" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-30 border-t border-slate-800/50 bg-black/20 backdrop-blur-xl py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                    DevHive
                  </span>
                  <div className="flex items-center space-x-1 text-xs">
                    <Moon className="h-2 w-2 text-yellow-400" />
                    <span className="text-slate-400">Space Edition</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">
                The ultimate cosmic platform for developer collaboration and learning. Code among the stars and share
                knowledge across the universe.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-slate-400 transition-all duration-300 hover:scale-110 ${social.color}`}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {[
              {
                title: "Platform",
                links: [
                  { name: "Live Rooms", href: "/rooms" },
                  { name: "Knowledge Drops", href: "/drops" },
                  { name: "Scheduled Sessions", href: "/sessions" },
                  { name: "Leaderboard", href: "/leaderboard" },
                ],
              },
              {
                title: "Community",
                links: [
                  { name: "Discord", href: "/discord" },
                  { name: "GitHub", href: "https://github.com/birukG09" },
                  { name: "Blog", href: "/blog" },
                  { name: "Help Center", href: "/help" },
                ],
              },
              {
                title: "Company",
                links: [
                  { name: "About", href: "/about" },
                  { name: "Careers", href: "/careers" },
                  { name: "Privacy", href: "/privacy" },
                  { name: "Terms", href: "/terms" },
                ],
              },
            ].map((section) => (
              <div key={section.title}>
                <h3 className="text-white font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-slate-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800/50 mt-12 pt-8 text-center">
            <p className="text-slate-400">
              &copy; 2025 DevHive Space Edition. Built by Biruk Gebre. All rights reserved across the universe.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
