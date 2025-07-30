"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Edit3,
  Github,
  Linkedin,
  Globe,
  Trophy,
  Star,
  Code,
  MessageSquare,
  Calendar,
  Target,
  TrendingUp,
  BookOpen,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { db, type User as UserType, type Achievement } from "@/lib/database"

interface UserProfile extends UserType {
  skills: { name: string; level: number; progress: number }[]
  achievements: Achievement[]
  stats: {
    totalDrops: number
    totalSessions: number
    helpedDevelopers: number
    streakDays: number
  }
  recentActivity: {
    id: string
    type: "drop" | "session" | "achievement" | "help"
    title: string
    timestamp: Date
    xpGained?: number
  }[]
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    bio: "",
    githubUsername: "",
    linkedinUrl: "",
    website: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await db.users.findById("user-1")
        const achievements = await db.achievements.findAll()

        if (user) {
          const mockProfile: UserProfile = {
            ...user,
            skills: [
              { name: "React", level: 8, progress: 85 },
              { name: "TypeScript", level: 7, progress: 72 },
              { name: "Node.js", level: 6, progress: 68 },
              { name: "Python", level: 5, progress: 55 },
              { name: "System Design", level: 4, progress: 42 },
            ],
            achievements: achievements.slice(0, 3),
            stats: {
              totalDrops: 47,
              totalSessions: 23,
              helpedDevelopers: 156,
              streakDays: 12,
            },
            recentActivity: [
              {
                id: "1",
                type: "achievement",
                title: 'Earned "Code Master" achievement',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                xpGained: 500,
              },
              {
                id: "2",
                type: "drop",
                title: 'Shared "React Performance Tips"',
                timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
                xpGained: 50,
              },
              {
                id: "3",
                type: "session",
                title: 'Hosted "TypeScript Deep Dive"',
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
                xpGained: 200,
              },
            ],
          }

          setProfile(mockProfile)
          setEditForm({
            bio: mockProfile.bio || "",
            githubUsername: mockProfile.githubUsername || "",
            linkedinUrl: mockProfile.linkedinUrl || "",
            website: "",
          })
        }
      } catch (error) {
        console.error("Failed to load profile:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  const handleSaveProfile = async () => {
    if (!profile) return

    try {
      const updatedUser = await db.users.update(profile.id, {
        bio: editForm.bio,
        githubUsername: editForm.githubUsername,
        linkedinUrl: editForm.linkedinUrl,
      })

      setProfile({ ...profile, ...updatedUser })
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update profile:", error)
    }
  }

  const getNextLevelXP = (currentLevel: number) => {
    return currentLevel * 1000
  }

  const getCurrentLevelProgress = (xp: number, level: number) => {
    const currentLevelXP = (level - 1) * 1000
    const nextLevelXP = level * 1000
    const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100
    return Math.max(0, Math.min(100, progress))
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "drop":
        return <BookOpen className="w-4 h-4" />
      case "session":
        return <Calendar className="w-4 h-4" />
      case "achievement":
        return <Trophy className="w-4 h-4" />
      case "help":
        return <MessageSquare className="w-4 h-4" />
      default:
        return <Star className="w-4 h-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "drop":
        return "text-blue-400"
      case "session":
        return "text-green-400"
      case "achievement":
        return "text-yellow-400"
      case "help":
        return "text-purple-400"
      default:
        return "text-gray-400"
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

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-400">Profile not found</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Profile Header */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">{profile.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white">{profile.username}</h1>
                    <p className="text-gray-400 mt-1">{profile.bio}</p>
                  </div>

                  <Dialog open={isEditing} onOpenChange={setIsEditing}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-gray-600 hover:border-purple-500 bg-transparent">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 border-gray-700">
                      <DialogHeader>
                        <DialogTitle className="text-white">Edit Profile</DialogTitle>
                        <DialogDescription className="text-gray-400">
                          Update your profile information and social links.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="bio" className="text-white">
                            Bio
                          </Label>
                          <Textarea
                            id="bio"
                            value={editForm.bio}
                            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="Tell us about yourself..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="github" className="text-white">
                            GitHub Username
                          </Label>
                          <Input
                            id="github"
                            value={editForm.githubUsername}
                            onChange={(e) => setEditForm({ ...editForm, githubUsername: e.target.value })}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="birukG09"
                          />
                        </div>
                        <div>
                          <Label htmlFor="linkedin" className="text-white">
                            LinkedIn URL
                          </Label>
                          <Input
                            id="linkedin"
                            value={editForm.linkedinUrl}
                            onChange={(e) => setEditForm({ ...editForm, linkedinUrl: e.target.value })}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="https://www.linkedin.com/in/biruk-gebre-230935238/"
                          />
                        </div>
                        <div>
                          <Label htmlFor="website" className="text-white">
                            Website
                          </Label>
                          <Input
                            id="website"
                            value={editForm.website}
                            onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="https://your-website.com"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsEditing(false)} className="border-gray-600">
                            Cancel
                          </Button>
                          <Button onClick={handleSaveProfile} className="bg-gradient-to-r from-purple-500 to-pink-500">
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Level and XP */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        Level {profile.level}
                      </Badge>
                      <span className="text-gray-400 text-sm">{profile.xp.toLocaleString()} XP</span>
                      <span className="text-gray-500 text-sm">
                        {(getNextLevelXP(profile.level + 1) - profile.xp).toLocaleString()} XP to next level
                      </span>
                    </div>
                  </div>
                  <Progress value={getCurrentLevelProgress(profile.xp, profile.level)} className="h-2 bg-gray-700" />
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  {profile.githubUsername && (
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                      <Github className="w-5 h-5" />
                    </Button>
                  )}
                  {profile.linkedinUrl && (
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                      <Linkedin className="w-5 h-5" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                    <Globe className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mx-auto mb-2">
                <BookOpen className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">{profile.stats.totalDrops}</div>
              <div className="text-sm text-gray-400">Knowledge Drops</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mx-auto mb-2">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">{profile.stats.totalSessions}</div>
              <div className="text-sm text-gray-400">Sessions Hosted</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mx-auto mb-2">
                <MessageSquare className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">{profile.stats.helpedDevelopers}</div>
              <div className="text-sm text-gray-400">Developers Helped</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-500/20 rounded-lg mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="text-2xl font-bold text-white">{profile.stats.streakDays}</div>
              <div className="text-sm text-gray-400">Day Streak</div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
            <TabsTrigger
              value="skills"
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
            >
              <Code className="w-4 h-4 mr-2" />
              Skills
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              <Target className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Skills */}
          <TabsContent value="skills" className="space-y-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Technical Skills</CardTitle>
                <CardDescription className="text-gray-400">
                  Your skill levels and progress in different technologies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                          Level {skill.level}
                        </Badge>
                        <span className="text-gray-400 text-sm">{skill.progress}%</span>
                      </div>
                    </div>
                    <Progress value={skill.progress} className="h-2 bg-gray-700" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements */}
          <TabsContent value="achievements" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {profile.achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className="bg-gray-800/50 border-gray-700 hover:border-yellow-500/30 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white text-lg">{achievement.name}</h3>
                        <p className="text-gray-400 text-sm mt-1">{achievement.description}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                            {achievement.category}
                          </Badge>
                          <span className="text-green-400 text-sm">+{achievement.xpReward} XP</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Activity */}
          <TabsContent value="activity" className="space-y-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-400">Your latest contributions and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
                    >
                      <div className={`p-2 rounded-lg bg-gray-600/50 ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{activity.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-400 text-sm">{formatTimeAgo(activity.timestamp)}</span>
                          {activity.xpGained && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                              +{activity.xpGained} XP
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
