"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Users, Search, Filter, Play, Star, BookOpen } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { db, type Session } from "@/lib/database"

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await db.sessions.findAll()
        setSessions(data)
      } catch (error) {
        console.error("Failed to load sessions:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSessions()
  }, [])

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = difficultyFilter === "all" || session.difficulty === difficultyFilter
    return matchesSearch && matchesDifficulty
  })

  const liveSessions = filteredSessions.filter((session) => session.isLive)
  const upcomingSessions = filteredSessions.filter(
    (session) => !session.isLive && new Date(session.startTime) > new Date(),
  )
  const pastSessions = filteredSessions.filter((session) => !session.isLive && new Date(session.endTime) < new Date())

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      month: "short",
      day: "numeric",
    }).format(new Date(date))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "advanced":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Cosmic Sessions
              </h1>
              <p className="text-gray-400 mt-2">Join live coding sessions and learn from the community</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Session
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search sessions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 focus:border-purple-500"
              />
            </div>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-[180px] bg-gray-800/50 border-gray-700">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Sessions Tabs */}
        <Tabs defaultValue="live" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
            <TabsTrigger value="live" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Live ({liveSessions.length})
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
            >
              <Clock className="w-4 h-4 mr-2" />
              Upcoming ({upcomingSessions.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-gray-500/20 data-[state=active]:text-gray-400">
              <BookOpen className="w-4 h-4 mr-2" />
              Past ({pastSessions.length})
            </TabsTrigger>
          </TabsList>

          {/* Live Sessions */}
          <TabsContent value="live" className="space-y-4">
            {liveSessions.length === 0 ? (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Play className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-400 text-center">No live sessions at the moment</p>
                  <p className="text-sm text-gray-500 mt-2">Check back soon for live coding sessions!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {liveSessions.map((session) => (
                  <Card
                    key={session.id}
                    className="bg-gray-800/50 border-gray-700 hover:border-red-500/50 transition-all duration-300 group"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-lg group-hover:text-red-400 transition-colors">
                            {session.title}
                          </CardTitle>
                          <CardDescription className="text-gray-400">{session.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-red-400 text-sm font-medium">LIVE</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>
                              {session.currentParticipants}/{session.maxParticipants}
                            </span>
                          </div>
                          <Badge className={getDifficultyColor(session.difficulty)}>{session.difficulty}</Badge>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {session.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                        <Play className="w-4 h-4 mr-2" />
                        Join Live Session
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Upcoming Sessions */}
          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {upcomingSessions.map((session) => (
                <Card
                  key={session.id}
                  className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300 group"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg group-hover:text-blue-400 transition-colors">
                          {session.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400">{session.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatTime(session.startTime)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>
                            {session.currentParticipants}/{session.maxParticipants}
                          </span>
                        </div>
                      </div>
                      <Badge className={getDifficultyColor(session.difficulty)}>{session.difficulty}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {session.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Set Reminder
                      </Button>
                      <Button variant="outline" className="border-gray-600 hover:border-blue-500 bg-transparent">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Past Sessions */}
          <TabsContent value="past" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {pastSessions.map((session) => (
                <Card
                  key={session.id}
                  className="bg-gray-800/50 border-gray-700 hover:border-gray-500/50 transition-all duration-300 group"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg group-hover:text-gray-300 transition-colors">
                          {session.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400">{session.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatTime(session.endTime)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{session.currentParticipants} attended</span>
                        </div>
                      </div>
                      <Badge className={getDifficultyColor(session.difficulty)}>{session.difficulty}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {session.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full border-gray-600 hover:border-gray-500 bg-transparent">
                      <Play className="w-4 h-4 mr-2" />
                      Watch Recording
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
