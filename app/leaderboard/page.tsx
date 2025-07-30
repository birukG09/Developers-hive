import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, TrendingUp, Code, Zap, Calendar, Star, Medal, Crown } from "lucide-react"

export default function Leaderboard() {
  const topDevelopers = [
    {
      rank: 1,
      name: "sarah_dev",
      avatar: "S",
      reputation: 2847,
      drops: 89,
      roomsJoined: 156,
      sessionsCompleted: 34,
      badges: ["Top Contributor", "JavaScript Expert", "Mentor"],
      trend: "up",
    },
    {
      rank: 2,
      name: "python_guru",
      avatar: "P",
      reputation: 2654,
      drops: 76,
      roomsJoined: 142,
      sessionsCompleted: 28,
      badges: ["Python Master", "Algorithm Wizard", "Helper"],
      trend: "up",
    },
    {
      rank: 3,
      name: "css_wizard",
      avatar: "C",
      reputation: 2398,
      drops: 68,
      roomsJoined: 134,
      sessionsCompleted: 31,
      badges: ["CSS Expert", "Design Guru", "Responsive Master"],
      trend: "down",
    },
    {
      rank: 4,
      name: "react_ninja",
      avatar: "R",
      reputation: 2156,
      drops: 54,
      roomsJoined: 128,
      sessionsCompleted: 26,
      badges: ["React Expert", "Performance Optimizer"],
      trend: "up",
    },
    {
      rank: 5,
      name: "git_master",
      avatar: "G",
      reputation: 1987,
      drops: 62,
      roomsJoined: 119,
      sessionsCompleted: 22,
      badges: ["Git Expert", "Workflow Master"],
      trend: "same",
    },
  ]

  const weeklyTop = [
    { name: "alex_js", reputation: 456, change: "+23%" },
    { name: "vue_dev", reputation: 398, change: "+18%" },
    { name: "node_expert", reputation: 367, change: "+15%" },
    { name: "db_master", reputation: 334, change: "+12%" },
    { name: "ui_designer", reputation: 298, change: "+8%" },
  ]

  const categories = [
    { name: "JavaScript", leader: "sarah_dev", points: 1247 },
    { name: "Python", leader: "python_guru", points: 1156 },
    { name: "React", leader: "react_ninja", points: 987 },
    { name: "CSS", leader: "css_wizard", points: 934 },
    { name: "Node.js", leader: "node_expert", points: 876 },
    { name: "Git", leader: "git_master", points: 823 },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-400" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-slate-400 font-bold">#{rank}</span>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-400" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />
      default:
        return <div className="w-4 h-4" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
            <p className="text-slate-400 mt-1">See how you rank among the DevHive community</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Trophy className="h-3 w-3 mr-1" />
              Your Rank: #42
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overall" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-slate-800">
                <TabsTrigger value="overall">Overall</TabsTrigger>
                <TabsTrigger value="weekly">This Week</TabsTrigger>
                <TabsTrigger value="monthly">This Month</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
              </TabsList>

              <TabsContent value="overall" className="mt-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
                      Top Developers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {topDevelopers.map((dev) => (
                      <div
                        key={dev.rank}
                        className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors"
                      >
                        <div className="flex items-center justify-center w-8">{getRankIcon(dev.rank)}</div>
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="text-lg font-bold">{dev.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-white font-semibold">{dev.name}</h3>
                            {getTrendIcon(dev.trend)}
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {dev.badges.slice(0, 2).map((badge) => (
                              <Badge key={badge} variant="secondary" className="text-xs">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-slate-400">Reputation</div>
                              <div className="text-white font-semibold">{dev.reputation.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-slate-400">Drops</div>
                              <div className="text-white font-semibold">{dev.drops}</div>
                            </div>
                            <div>
                              <div className="text-slate-400">Rooms</div>
                              <div className="text-white font-semibold">{dev.roomsJoined}</div>
                            </div>
                            <div>
                              <div className="text-slate-400">Sessions</div>
                              <div className="text-white font-semibold">{dev.sessionsCompleted}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="weekly" className="mt-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                      Weekly Rising Stars
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {weeklyTop.map((dev, index) => (
                      <div key={dev.name} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-slate-400 font-bold">#{index + 1}</span>
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-sm">{dev.name[0].toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span className="text-white font-medium">{dev.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">{dev.reputation}</div>
                          <div className="text-green-400 text-sm">{dev.change}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="monthly" className="mt-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-blue-400" />
                      Monthly Champions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-slate-400">Monthly leaderboard data will appear here...</div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="categories" className="mt-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Code className="h-5 w-5 mr-2 text-purple-400" />
                      Category Leaders
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {categories.map((category) => (
                      <div
                        key={category.name}
                        className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className="border-slate-600">
                            {category.name}
                          </Badge>
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{category.leader[0].toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span className="text-white text-sm">{category.leader}</span>
                        </div>
                        <div className="text-white font-semibold">{category.points}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Ranking */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Your Ranking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-1">#42</div>
                  <div className="text-slate-300">Overall Rank</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Reputation</span>
                    <span className="text-white font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">This Week</span>
                    <span className="text-green-400 font-semibold">+89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Next Rank</span>
                    <span className="text-slate-400">156 points</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievement Badges */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Your Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                    <Star className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
                    <div className="text-xs text-slate-300">First Drop</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                    <Code className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                    <div className="text-xs text-slate-300">Code Sharer</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                    <Zap className="h-6 w-6 text-purple-400 mx-auto mb-1" />
                    <div className="text-xs text-slate-300">Quick Helper</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded-lg opacity-50">
                    <Trophy className="h-6 w-6 text-slate-500 mx-auto mb-1" />
                    <div className="text-xs text-slate-500">Top 10</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard Stats */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-300">Total Developers</span>
                  <span className="text-white font-semibold">12,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Active This Week</span>
                  <span className="text-white font-semibold">3,456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Knowledge Drops</span>
                  <span className="text-white font-semibold">89,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Code Sessions</span>
                  <span className="text-white font-semibold">15,678</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
