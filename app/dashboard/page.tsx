"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Code,
  Users,
  Zap,
  Trophy,
  Calendar,
  TrendingUp,
  Clock,
  Star,
  Rocket,
  Moon,
  Github,
  Linkedin,
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  const recentRooms = [
    {
      id: 1,
      name: "React Hooks Deep Dive",
      language: "JavaScript",
      participants: 12,
      status: "active",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: "Python Data Structures",
      language: "Python",
      participants: 8,
      status: "active",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: 3,
      name: "System Design Interview",
      language: "General",
      participants: 15,
      status: "scheduled",
      gradient: "from-purple-500 to-pink-500",
    },
  ]

  const topDrops = [
    {
      id: 1,
      content:
        "🚀 Quick tip: Use `Object.freeze()` to make objects immutable in JavaScript! Perfect for preventing state mutations in React! 🧊✨",
      author: "sarah_dev",
      votes: 42,
      tags: ["javascript", "react", "tips"],
      time: "2h ago",
      trending: true,
    },
    {
      id: 2,
      content:
        "🐍 Python list comprehension magic: `[x**2 for x in range(10) if x%2==0]` - squares of even numbers in one elegant line! 💫",
      author: "python_guru",
      votes: 38,
      tags: ["python", "optimization"],
      time: "4h ago",
      trending: true,
    },
    {
      id: 3,
      content:
        "🎨 CSS Grid responsive trick: `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` - auto-adjusting columns! 📱💻",
      author: "css_wizard",
      votes: 35,
      tags: ["css", "responsive", "grid"],
      time: "6h ago",
      trending: false,
    },
  ]

  const upcomingSessions = [
    {
      id: 1,
      title: "Algorithm Challenge: Binary Trees",
      time: "2:00 PM",
      participants: 25,
      difficulty: "Medium",
      color: "text-yellow-400",
    },
    {
      id: 2,
      title: "Code Review Session",
      time: "4:30 PM",
      participants: 12,
      difficulty: "All Levels",
      color: "text-green-400",
    },
    {
      id: 3,
      title: "Frontend Interview Prep",
      time: "7:00 PM",
      participants: 18,
      difficulty: "Intermediate",
      color: "text-blue-400",
    },
  ]

  const achievements = [
    { name: "First Drop", icon: <Star className="h-4 w-4" />, unlocked: true },
    { name: "Code Sharer", icon: <Code className="h-4 w-4" />, unlocked: true },
    { name: "Helper", icon: <Zap className="h-4 w-4" />, unlocked: true },
    { name: "Top 100", icon: <Trophy className="h-4 w-4" />, unlocked: false },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-slate-800/50 backdrop-blur-xl p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Welcome back, Biruk!
                </span>
                <span className="text-2xl">🚀</span>
              </h1>
              <p className="text-slate-400 text-lg">Ready to explore the cosmic coding universe today?</p>
              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Moon className="h-4 w-4 text-yellow-400" />
                  <span className="text-slate-300 text-sm">Level 12 Cosmic Coder</span>
                </div>
                <Progress value={progress} className="w-32 h-2" />
                <span className="text-slate-400 text-sm">{progress}% to next level</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-sm px-4 py-2">
                <Trophy className="h-4 w-4 mr-2" />
                Rank #42
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-sm px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                1,247 Points
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              href: "/rooms/create",
              icon: <Code className="h-6 w-6" />,
              title: "Create Room",
              subtitle: "Start coding",
              gradient: "from-purple-500 to-pink-500",
            },
            {
              href: "/drops/create",
              icon: <Zap className="h-6 w-6" />,
              title: "Share Drop",
              subtitle: "Quick insight",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              href: "/sessions",
              icon: <Calendar className="h-6 w-6" />,
              title: "Join Session",
              subtitle: "Live coding",
              gradient: "from-green-500 to-emerald-500",
            },
            {
              href: "/leaderboard",
              icon: <Trophy className="h-6 w-6" />,
              title: "Leaderboard",
              subtitle: "See rankings",
              gradient: "from-yellow-500 to-orange-500",
            },
          ].map((action, index) => (
            <Button
              key={index}
              asChild
              className={`h-24 bg-gradient-to-r ${action.gradient} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group`}
            >
              <Link href={action.href} className="flex flex-col items-center justify-center space-y-2">
                <div className="group-hover:scale-110 transition-transform duration-300">{action.icon}</div>
                <div className="text-center">
                  <div className="font-semibold">{action.title}</div>
                  <div className="text-xs opacity-90">{action.subtitle}</div>
                </div>
              </Link>
            </Button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Rooms */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-black/40 border border-slate-800/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Active Cosmic Rooms
                  <Badge className="ml-2 bg-green-500/20 text-green-300 border-green-500/30">Live</Badge>
                </CardTitle>
                <CardDescription>Join live coding sessions happening across the galaxy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentRooms.map((room) => (
                  <div
                    key={room.id}
                    className="group flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${room.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Code className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium group-hover:text-purple-200 transition-colors duration-300">
                          {room.name}
                        </h3>
                        <p className="text-slate-400 text-sm flex items-center space-x-2">
                          <span>{room.language}</span>
                          <span>•</span>
                          <span>{room.participants} cosmic coders</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant={room.status === "active" ? "default" : "secondary"}
                        className={room.status === "active" ? "bg-green-500/20 text-green-300 border-green-500/30" : ""}
                      >
                        {room.status}
                      </Badge>
                      <Button
                        size="sm"
                        asChild
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        <Link href={`/rooms/${room.id}`}>
                          <Rocket className="h-4 w-4 mr-1" />
                          Join
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full border-slate-600 hover:bg-slate-800/50 bg-transparent backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
                  asChild
                >
                  <Link href="/rooms">Explore All Cosmic Rooms</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Top Knowledge Drops */}
            <Card className="bg-black/40 border border-slate-800/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Trending Knowledge Stars
                  <Badge className="ml-2 bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Hot</Badge>
                </CardTitle>
                <CardDescription>Popular knowledge drops from across the universe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topDrops.map((drop) => (
                  <div
                    key={drop.id}
                    className="group p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            {drop.author[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="text-slate-300 font-medium">@{drop.author}</span>
                          <div className="flex items-center space-x-2 text-xs text-slate-500">
                            <span>{drop.time}</span>
                            {drop.trending && (
                              <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs">
                                <TrendingUp className="h-2 w-2 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-slate-400">
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-medium">{drop.votes}</span>
                      </div>
                    </div>
                    <p className="text-white leading-relaxed mb-3 group-hover:text-purple-100 transition-colors duration-300">
                      {drop.content}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {drop.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-slate-700/50 hover:bg-slate-600/50 transition-colors duration-300"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full border-slate-600 hover:bg-slate-800/50 bg-transparent backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
                  asChild
                >
                  <Link href="/drops">Explore All Knowledge Stars</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Sessions */}
            <Card className="bg-black/40 border border-slate-800/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Today's Missions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="group p-3 bg-slate-800/30 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <h4 className="text-white font-medium text-sm mb-2 group-hover:text-purple-200 transition-colors duration-300">
                      {session.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{session.time}</span>
                      </div>
                      <span>{session.participants} joined</span>
                    </div>
                    <Badge variant="outline" className={`text-xs ${session.color} border-current`}>
                      {session.difficulty}
                    </Badge>
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-slate-600 hover:bg-slate-800/50 bg-transparent backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
                  asChild
                >
                  <Link href="/sessions">View Mission Schedule</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-black/40 border border-slate-800/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Cosmic Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`text-center p-3 rounded-lg border transition-all duration-300 hover:scale-105 ${
                        achievement.unlocked
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30"
                          : "bg-slate-800/30 border-slate-700/50 opacity-50"
                      }`}
                    >
                      <div className={`mx-auto mb-2 ${achievement.unlocked ? "text-purple-400" : "text-slate-500"}`}>
                        {achievement.icon}
                      </div>
                      <div className={`text-xs ${achievement.unlocked ? "text-slate-300" : "text-slate-500"}`}>
                        {achievement.name}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Your Stats */}
            <Card className="bg-black/40 border border-slate-800/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Your Cosmic Journey</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Knowledge Stars Shared", value: "23", color: "text-purple-400" },
                  { label: "Cosmic Rooms Joined", value: "47", color: "text-blue-400" },
                  { label: "Missions Completed", value: "12", color: "text-green-400" },
                  { label: "Universal Reputation", value: "1,247", color: "text-yellow-400" },
                ].map((stat, index) => (
                  <div key={index} className="flex justify-between items-center group">
                    <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                      {stat.label}
                    </span>
                    <span
                      className={`font-semibold ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-slate-600 hover:bg-slate-800/50 bg-transparent backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
                  asChild
                >
                  <Link href="/profile">View Cosmic Profile</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Social Connect */}
            <Card className="bg-black/40 border border-slate-800/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Connect Across Space</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-4">
                  {[
                    {
                      icon: <Github className="h-5 w-5" />,
                      href: "https://github.com/devhive",
                      color: "hover:text-gray-300",
                    },
                    {
                      icon: <Linkedin className="h-5 w-5" />,
                      href: "https://linkedin.com/company/devhive",
                      color: "hover:text-blue-400",
                    },
                    {
                      icon: (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                        </svg>
                      ),
                      href: "https://reddit.com/r/devhive",
                      color: "hover:text-orange-400",
                    },
                  ].map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full bg-slate-800/30 border border-slate-700/50 text-slate-400 transition-all duration-300 hover:scale-110 hover:border-slate-600/50 ${social.color}`}
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
