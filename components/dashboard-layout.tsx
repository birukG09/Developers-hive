"use client"

import type React from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Code,
  Zap,
  Trophy,
  Calendar,
  Users,
  Settings,
  User,
  Bell,
  Search,
  Moon,
  Star,
  Rocket,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatedBackground } from "@/components/animated-background"

const navigation = [
  { name: "Mission Control", href: "/dashboard", icon: Home, gradient: "from-purple-500 to-pink-500" },
  { name: "Cosmic Rooms", href: "/rooms", icon: Code, gradient: "from-blue-500 to-cyan-500" },
  { name: "Knowledge Stars", href: "/drops", icon: Zap, gradient: "from-yellow-500 to-orange-500" },
  { name: "Space Sessions", href: "/sessions", icon: Calendar, gradient: "from-green-500 to-emerald-500" },
  { name: "Galaxy Ranks", href: "/leaderboard", icon: Trophy, gradient: "from-red-500 to-pink-500" },
  { name: "Universe Hub", href: "/community", icon: Users, gradient: "from-indigo-500 to-purple-500" },
  { name: "Cosmic Profile", href: "/profile", icon: User, gradient: "from-teal-500 to-blue-500" },
  { name: "Settings", href: "/settings", icon: Settings, gradient: "from-slate-500 to-slate-600" },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <AnimatedBackground />

      <SidebarProvider>
        <div className="flex w-full relative z-20">
          <Sidebar className="border-r border-slate-800/50 bg-black/20 backdrop-blur-xl">
            <SidebarHeader className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl flex items-center justify-center animate-pulse">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-bounce">
                    <Star className="h-3 w-3 text-black m-0.5" />
                  </div>
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                    DevHive
                  </span>
                  <div className="flex items-center space-x-1 text-xs">
                    <Moon className="h-3 w-3 text-yellow-400" />
                    <span className="text-slate-400">Space Edition</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-slate-800/50 backdrop-blur-sm">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                    A
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">Alex Johnson</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 text-xs">
                      <Trophy className="h-2 w-2 mr-1" />
                      #42
                    </Badge>
                    <span className="text-xs text-slate-400">1,247 pts</span>
                  </div>
                </div>
              </div>
            </SidebarHeader>
            <SidebarContent className="px-4">
              <SidebarMenu>
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      className="w-full justify-start group hover:bg-slate-800/50 transition-all duration-300"
                    >
                      <Link href={item.href} className="flex items-center space-x-3 px-3 py-3 rounded-lg">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-r ${item.gradient} group-hover:scale-110 transition-transform duration-300`}
                        >
                          <item.icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="group-hover:text-purple-200 transition-colors duration-300">{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          <SidebarInset className="flex-1">
            <header className="flex items-center justify-between p-4 border-b border-slate-800/50 bg-black/20 backdrop-blur-xl">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="hover:bg-slate-800/50 transition-colors duration-300" />
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300 hover:scale-105"
                >
                  <Search className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 relative"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-300 hover:scale-105"
                >
                  <Rocket className="h-4 w-4" />
                </Button>
              </div>
            </header>
            <main className="flex-1 p-6 relative z-10">{children}</main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
