"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Share, Plus, Search, Filter, ArrowUp, ArrowDown, Bookmark } from "lucide-react"

export default function KnowledgeDrops() {
  const [newDrop, setNewDrop] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const drops = [
    {
      id: 1,
      content:
        "Quick tip: Use `Object.freeze()` to make objects immutable in JavaScript! Perfect for preventing accidental mutations in your state. 🧊",
      author: "sarah_dev",
      avatar: "S",
      timestamp: "2 hours ago",
      votes: 42,
      comments: 8,
      tags: ["javascript", "tips", "immutable"],
      userVote: null,
    },
    {
      id: 2,
      content:
        "Python list comprehension magic: `[x**2 for x in range(10) if x%2==0]` - squares of even numbers in one line! So clean and readable. ✨",
      author: "python_guru",
      avatar: "P",
      timestamp: "4 hours ago",
      votes: 38,
      comments: 12,
      tags: ["python", "optimization", "clean-code"],
      userVote: "up",
    },
    {
      id: 3,
      content:
        "CSS Grid responsive layout trick: `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` - automatically adjusts columns based on screen size! 📱💻",
      author: "css_wizard",
      avatar: "C",
      timestamp: "6 hours ago",
      votes: 35,
      comments: 6,
      tags: ["css", "responsive", "grid"],
      userVote: null,
    },
    {
      id: 4,
      content:
        "React performance tip: Use `React.memo()` for components that receive the same props frequently. Prevents unnecessary re-renders! ⚡",
      author: "react_ninja",
      avatar: "R",
      timestamp: "8 hours ago",
      votes: 29,
      comments: 15,
      tags: ["react", "performance", "optimization"],
      userVote: null,
    },
    {
      id: 5,
      content:
        "Git workflow hack: `git commit --amend --no-edit` to add changes to your last commit without changing the message. Saves so much time! ⏰",
      author: "git_master",
      avatar: "G",
      timestamp: "12 hours ago",
      votes: 51,
      comments: 9,
      tags: ["git", "workflow", "productivity"],
      userVote: null,
    },
  ]

  const popularTags = [
    "javascript",
    "python",
    "react",
    "css",
    "git",
    "performance",
    "tips",
    "optimization",
    "clean-code",
    "responsive",
    "workflow",
  ]

  const handleVote = (dropId: number, voteType: "up" | "down") => {
    // Handle voting logic here
    console.log(`Voted ${voteType} on drop ${dropId}`)
  }

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const submitDrop = () => {
    if (newDrop.trim()) {
      // Handle drop submission
      console.log("Submitting drop:", newDrop)
      setNewDrop("")
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Knowledge Drops</h1>
            <p className="text-slate-400 mt-1">Share quick coding insights with the community</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Plus className="h-4 w-4 mr-2" />
            Create Drop
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Create New Drop */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Share Your Knowledge</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What coding insight would you like to share? (Max 280 characters)"
                  value={newDrop}
                  onChange={(e) => setNewDrop(e.target.value)}
                  maxLength={280}
                  className="bg-slate-700 border-slate-600 text-white resize-none"
                  rows={3}
                />
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {popularTags.slice(0, 6).map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-purple-500/20"
                        onClick={() => handleTagClick(tag)}
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400 text-sm">{newDrop.length}/280</span>
                    <Button onClick={submitDrop} disabled={!newDrop.trim()}>
                      Share Drop
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filters and Search */}
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search drops..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-800 border-slate-600"
                  />
                </div>
              </div>
              <Button variant="outline" className="border-slate-600 hover:bg-slate-800 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="trending" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-slate-800">
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="top">Top Rated</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
              </TabsList>

              <TabsContent value="trending" className="space-y-4 mt-6">
                {drops.map((drop) => (
                  <Card
                    key={drop.id}
                    className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{drop.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-300 font-medium">@{drop.author}</span>
                            <span className="text-slate-500 text-sm">{drop.timestamp}</span>
                          </div>
                          <p className="text-white leading-relaxed">{drop.content}</p>
                          <div className="flex flex-wrap gap-2">
                            {drop.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleVote(drop.id, "up")}
                                  className={`h-8 px-2 ${drop.userVote === "up" ? "text-green-400" : "text-slate-400 hover:text-green-400"}`}
                                >
                                  <ArrowUp className="h-4 w-4" />
                                </Button>
                                <span className="text-slate-300 font-medium">{drop.votes}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleVote(drop.id, "down")}
                                  className="h-8 px-2 text-slate-400 hover:text-red-400"
                                >
                                  <ArrowDown className="h-4 w-4" />
                                </Button>
                              </div>
                              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                {drop.comments}
                              </Button>
                              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                <Share className="h-4 w-4 mr-1" />
                                Share
                              </Button>
                            </div>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-yellow-400">
                              <Bookmark className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="recent" className="space-y-4 mt-6">
                <div className="text-center py-8 text-slate-400">Recent drops will appear here...</div>
              </TabsContent>

              <TabsContent value="top" className="space-y-4 mt-6">
                <div className="text-center py-8 text-slate-400">Top rated drops will appear here...</div>
              </TabsContent>

              <TabsContent value="following" className="space-y-4 mt-6">
                <div className="text-center py-8 text-slate-400">Drops from people you follow will appear here...</div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Tags */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-purple-500/20 border-slate-600"
                      onClick={() => handleTagClick(tag)}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Top Contributors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "sarah_dev", drops: 47, reputation: 1250 },
                  { name: "python_guru", drops: 38, reputation: 980 },
                  { name: "css_wizard", drops: 35, reputation: 890 },
                  { name: "react_ninja", drops: 29, reputation: 750 },
                ].map((contributor, index) => (
                  <div key={contributor.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-400 text-sm">#{index + 1}</span>
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">{contributor.name[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="text-slate-300 text-sm">{contributor.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-300 text-sm font-medium">{contributor.drops} drops</div>
                      <div className="text-slate-500 text-xs">{contributor.reputation} rep</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Your Stats */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Your Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-300">Drops Shared</span>
                  <span className="text-white font-semibold">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Total Votes</span>
                  <span className="text-white font-semibold">342</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Comments</span>
                  <span className="text-white font-semibold">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Reputation</span>
                  <span className="text-purple-400 font-semibold">1,247</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
