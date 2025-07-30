"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Heart, MessageCircle, Share2, Star, Github, Linkedin, Globe, Search, TrendingUp, Plus } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import type { User } from "@/lib/database"

interface Post {
  id: string
  content: string
  author: User
  likes: number
  comments: number
  shares: number
  timestamp: Date
  tags: string[]
  isLiked: boolean
}

interface StarCoder {
  id: string
  username: string
  avatar: string
  bio: string
  level: number
  reputation: number
  specialties: string[]
  githubUsername?: string
  linkedinUrl?: string
  website?: string
  isFollowing: boolean
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [starCoders, setStarCoders] = useState<StarCoder[]>([])
  const [newPost, setNewPost] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCommunityData = async () => {
      try {
        // Mock data - replace with real API calls
        const mockPosts: Post[] = [
          {
            id: "post-1",
            content:
              "Just discovered an amazing pattern for handling async state in React! Using a custom hook with useReducer makes everything so much cleaner. Who else loves clean code patterns? 🚀",
            author: {
              id: "user-1",
              username: "birukG09",
              email: "biruk@devhive.com",
              avatar: "/placeholder.svg?height=40&width=40",
              level: 15,
              xp: 12500,
              reputation: 850,
              githubUsername: "birukG09",
              linkedinUrl: "https://www.linkedin.com/in/biruk-gebre-230935238/",
              redditUsername: "Safe-Present-1030",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            likes: 42,
            comments: 8,
            shares: 3,
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            tags: ["react", "patterns", "clean-code"],
            isLiked: false,
          },
          {
            id: "post-2",
            content:
              "Working on a new TypeScript utility type that automatically generates form validation schemas. The type system is so powerful! 💪",
            author: {
              id: "user-2",
              username: "codemaster",
              email: "codemaster@devhive.com",
              avatar: "/placeholder.svg?height=40&width=40",
              level: 22,
              xp: 18500,
              reputation: 1200,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            likes: 38,
            comments: 12,
            shares: 7,
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
            tags: ["typescript", "types", "validation"],
            isLiked: true,
          },
        ]

        const mockStarCoders: StarCoder[] = [
          {
            id: "user-1",
            username: "birukG09",
            avatar: "/placeholder.svg?height=60&width=60",
            bio: "Full-stack developer passionate about real-time collaboration and clean code",
            level: 15,
            reputation: 850,
            specialties: ["React", "TypeScript", "Node.js", "Real-time Systems"],
            githubUsername: "birukG09",
            linkedinUrl: "https://www.linkedin.com/in/biruk-gebre-230935238/",
            website: "https://birukgebre.dev",
            isFollowing: false,
          },
          {
            id: "user-2",
            username: "codemaster",
            avatar: "/placeholder.svg?height=60&width=60",
            bio: "TypeScript wizard and performance optimization expert",
            level: 22,
            reputation: 1200,
            specialties: ["TypeScript", "Performance", "System Design", "Mentoring"],
            githubUsername: "codemaster",
            isFollowing: true,
          },
        ]

        setPosts(mockPosts)
        setStarCoders(mockStarCoders)
      } catch (error) {
        console.error("Failed to load community data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCommunityData()
  }, [])

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const handleFollow = (userId: string) => {
    setStarCoders(
      starCoders.map((coder) => (coder.id === userId ? { ...coder, isFollowing: !coder.isFollowing } : coder)),
    )
  }

  const handlePostSubmit = () => {
    if (!newPost.trim()) return

    const post: Post = {
      id: `post-${Date.now()}`,
      content: newPost,
      author: {
        id: "user-1",
        username: "birukG09",
        email: "biruk@devhive.com",
        avatar: "/placeholder.svg?height=40&width=40",
        level: 15,
        xp: 12500,
        reputation: 850,
        githubUsername: "birukG09",
        linkedinUrl: "https://www.linkedin.com/in/biruk-gebre-230935238/",
        redditUsername: "Safe-Present-1030",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date(),
      tags: [],
      isLiked: false,
    }

    setPosts([post, ...posts])
    setNewPost("")
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
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
                Cosmic Community
              </h1>
              <p className="text-gray-400 mt-2">Connect with developers, share knowledge, and grow together</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Share with the Community</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    What's on your mind? Share your thoughts, discoveries, or questions.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Textarea
                    placeholder="What's happening in your dev world?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" className="border-gray-600 bg-transparent">
                      Cancel
                    </Button>
                    <Button onClick={handlePostSubmit} className="bg-gradient-to-r from-purple-500 to-pink-500">
                      Post
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search community..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-700 focus:border-purple-500"
            />
          </div>
        </div>

        {/* Community Tabs */}
        <Tabs defaultValue="feed" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
            <TabsTrigger
              value="feed"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Cosmic Feed
            </TabsTrigger>
            <TabsTrigger
              value="coders"
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
            >
              <Star className="w-4 h-4 mr-2" />
              Star Coders
            </TabsTrigger>
            <TabsTrigger
              value="discussions"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Discussions
            </TabsTrigger>
          </TabsList>

          {/* Feed */}
          <TabsContent value="feed" className="space-y-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="bg-gray-800/50 border-gray-700 hover:border-purple-500/30 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{post.author.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-white">{post.author.username}</h4>
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                          Level {post.author.level}
                        </Badge>
                        <span className="text-gray-400 text-sm">{formatTimeAgo(post.timestamp)}</span>
                      </div>
                      <p className="text-gray-300 mt-2 leading-relaxed">{post.content}</p>
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-300">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                    <div className="flex items-center gap-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className={`hover:bg-red-500/20 ${post.isLiked ? "text-red-400" : "text-gray-400"}`}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                        {post.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:bg-blue-500/20 hover:text-blue-400"
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:bg-green-500/20 hover:text-green-400"
                      >
                        <Share2 className="w-4 h-4 mr-1" />
                        {post.shares}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Star Coders */}
          <TabsContent value="coders" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {starCoders.map((coder) => (
                <Card
                  key={coder.id}
                  className="bg-gray-800/50 border-gray-700 hover:border-blue-500/30 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={coder.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{coder.username[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-white text-lg">{coder.username}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                                Level {coder.level}
                              </Badge>
                              <span className="text-gray-400 text-sm">{coder.reputation} rep</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleFollow(coder.id)}
                            className={
                              coder.isFollowing
                                ? "bg-gray-600 hover:bg-gray-700 text-white"
                                : "bg-blue-500 hover:bg-blue-600 text-white"
                            }
                          >
                            {coder.isFollowing ? "Following" : "Follow"}
                          </Button>
                        </div>
                        <p className="text-gray-300 text-sm mt-2">{coder.bio}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {coder.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs border-gray-600 text-gray-300">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2 border-t border-gray-700">
                      {coder.githubUsername && (
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                          <Github className="w-4 h-4" />
                        </Button>
                      )}
                      {coder.linkedinUrl && (
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                          <Linkedin className="w-4 h-4" />
                        </Button>
                      )}
                      {coder.website && (
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                          <Globe className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Discussions */}
          <TabsContent value="discussions" className="space-y-6">
            <div className="grid gap-4">
              {[
                {
                  title: "Best practices for React performance optimization",
                  replies: 23,
                  lastActivity: "2h ago",
                  tags: ["react", "performance"],
                },
                {
                  title: "TypeScript vs JavaScript in 2025",
                  replies: 45,
                  lastActivity: "4h ago",
                  tags: ["typescript", "javascript"],
                },
                {
                  title: "How to handle real-time data in Next.js",
                  replies: 18,
                  lastActivity: "6h ago",
                  tags: ["nextjs", "realtime"],
                },
              ].map((discussion, index) => (
                <Card
                  key={index}
                  className="bg-gray-800/50 border-gray-700 hover:border-green-500/30 transition-all duration-300 cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg text-white hover:text-green-400 transition-colors">
                          {discussion.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2">
                          {discussion.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs border-gray-600 text-gray-300">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{discussion.replies}</span>
                        </div>
                        <div className="mt-1">{discussion.lastActivity}</div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
