"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Bell,
  Palette,
  Shield,
  Download,
  Trash2,
  Github,
  Linkedin,
  Globe,
  Save,
  AlertTriangle,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Profile settings
    displayName: "Biruk Gebre",
    email: "biruk@devhive.com",
    bio: "Full-stack developer passionate about real-time collaboration",
    githubUsername: "birukG09",
    linkedinUrl: "https://www.linkedin.com/in/biruk-gebre-230935238/",
    redditUsername: "Safe-Present-1030",
    website: "",

    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    sessionReminders: true,
    newDropAlerts: true,
    communityUpdates: false,
    achievementNotifications: true,
    weeklyDigest: true,

    // Appearance settings
    theme: "dark",
    language: "en",
    timezone: "UTC",
    compactMode: false,
    animationsEnabled: true,

    // Privacy settings
    profileVisibility: "public",
    showOnlineStatus: true,
    allowDirectMessages: true,
    shareAnalytics: false,

    // Security settings
    twoFactorEnabled: false,
    sessionTimeout: "24h",
    loginAlerts: true,
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveSettings = () => {
    // Save settings to database
    console.log("Saving settings:", settings)
    // Show success message
  }

  const handleExportData = () => {
    // Export user data
    console.log("Exporting user data...")
  }

  const handleDeleteAccount = () => {
    // Show confirmation dialog and delete account
    console.log("Delete account requested...")
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-gray-400 mt-2">Customize your DevHive experience</p>
          </div>
          <Button
            onClick={handleSaveSettings}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800/50">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
            >
              <Palette className="w-4 h-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400"
            >
              <Shield className="w-4 h-4 mr-2" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
              <Trash2 className="w-4 h-4 mr-2" />
              Account
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
                <CardDescription className="text-gray-400">
                  Update your personal information and social media links
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="displayName" className="text-white">
                      Display Name
                    </Label>
                    <Input
                      id="displayName"
                      value={settings.displayName}
                      onChange={(e) => handleSettingChange("displayName", e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleSettingChange("email", e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-white">
                    Bio
                  </Label>
                  <Input
                    id="bio"
                    value={settings.bio}
                    onChange={(e) => handleSettingChange("bio", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <Separator className="bg-gray-700" />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Social Media Links</h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Github className="w-5 h-5 text-gray-400" />
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="github" className="text-white">
                          GitHub Username
                        </Label>
                        <Input
                          id="github"
                          value={settings.githubUsername}
                          onChange={(e) => handleSettingChange("githubUsername", e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="birukG09"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Linkedin className="w-5 h-5 text-gray-400" />
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="linkedin" className="text-white">
                          LinkedIn URL
                        </Label>
                        <Input
                          id="linkedin"
                          value={settings.linkedinUrl}
                          onChange={(e) => handleSettingChange("linkedinUrl", e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="https://www.linkedin.com/in/biruk-gebre-230935238/"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="website" className="text-white">
                          Website
                        </Label>
                        <Input
                          id="website"
                          value={settings.website}
                          onChange={(e) => handleSettingChange("website", e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="https://your-website.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Notification Preferences</CardTitle>
                <CardDescription className="text-gray-400">
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-white">Email Notifications</Label>
                      <p className="text-sm text-gray-400">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-white">Push Notifications</Label>
                      <p className="text-sm text-gray-400">Receive browser push notifications</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-white">Session Reminders</Label>
                      <p className="text-sm text-gray-400">Get reminded about upcoming sessions</p>
                    </div>
                    <Switch
                      checked={settings.sessionReminders}
                      onCheckedChange={(checked) => handleSettingChange("sessionReminders", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-white">New Drop Alerts</Label>
                      <p className="text-sm text-gray-400">Notify when new knowledge drops are shared</p>
                    </div>
                    <Switch
                      checked={settings.newDropAlerts}
                      onCheckedChange={(checked) => handleSettingChange("newDropAlerts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-white">Community Updates</Label>
                      <p className="text-sm text-gray-400">Updates about community activities</p>
                    </div>
                    <Switch
                      checked={settings.communityUpdates}
                      onCheckedChange={(checked) => handleSettingChange("communityUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-white">Achievement Notifications</Label>
                      <p className="text-sm text-gray-400">Celebrate your achievements</p>
                    </div>
                    <Switch
                      checked={settings.achievementNotifications}
                      onCheckedChange={(checked) => handleSettingChange("achievementNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-white">Weekly Digest</Label>
                      <p className="text-sm text-gray-400">Weekly summary of platform activity</p>
                    </div>
                    <Switch
                      checked={settings.weeklyDigest}
                      onCheckedChange={(checked) => handleSettingChange("weeklyDigest", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Appearance & Display</CardTitle>
                <CardDescription className="text-gray-400">Customize how DevHive looks and feels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-white">Theme</Label>
                    <Select value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Language</Label>
                    <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Timezone</Label>
                    <Select value={settings.timezone} onValueChange={(value) => handleSettingChange("timezone", value)}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">Eastern Time</SelectItem>
                        <SelectItem value="PST">Pacific Time</SelectItem>
                        <SelectItem value="GMT">GMT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-white">Compact Mode</Label>
                      <p className="text-sm text-gray-400">Use a more compact layout</p>
                    </div>
                    <Switch
                      checked={settings.compactMode}
                      onCheckedChange={(checked) => handleSettingChange("compactMode", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-white">Animations</Label>
                      <p className="text-sm text-gray-400">Enable smooth animations and transitions</p>
                    </div>
                    <Switch
                      checked={settings.animationsEnabled}
                      onCheckedChange={(checked) => handleSettingChange("animationsEnabled", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Privacy & Security</CardTitle>
                <CardDescription className="text-gray-400">
                  Control your privacy and data sharing preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Profile Visibility</Label>
                    <Select
                      value={settings.profileVisibility}
                      onValueChange={(value) => handleSettingChange("profileVisibility", value)}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-white">Show Online Status</Label>
                      <p className="text-sm text-gray-400">Let others see when you're online</p>
                    </div>
                    <Switch
                      checked={settings.showOnlineStatus}
                      onCheckedChange={(checked) => handleSettingChange("showOnlineStatus", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-white">Allow Direct Messages</Label>
                      <p className="text-sm text-gray-400">Allow other users to message you directly</p>
                    </div>
                    <Switch
                      checked={settings.allowDirectMessages}
                      onCheckedChange={(checked) => handleSettingChange("allowDirectMessages", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-white">Share Analytics</Label>
                      <p className="text-sm text-gray-400">Help improve DevHive by sharing usage data</p>
                    </div>
                    <Switch
                      checked={settings.shareAnalytics}
                      onCheckedChange={(checked) => handleSettingChange("shareAnalytics", checked)}
                    />
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Security Settings</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-white">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={settings.twoFactorEnabled}
                      onCheckedChange={(checked) => handleSettingChange("twoFactorEnabled", checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Session Timeout</Label>
                    <Select
                      value={settings.sessionTimeout}
                      onValueChange={(value) => handleSettingChange("sessionTimeout", value)}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1h">1 Hour</SelectItem>
                        <SelectItem value="8h">8 Hours</SelectItem>
                        <SelectItem value="24h">24 Hours</SelectItem>
                        <SelectItem value="7d">7 Days</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-white">Login Alerts</Label>
                      <p className="text-sm text-gray-400">Get notified of new login attempts</p>
                    </div>
                    <Switch
                      checked={settings.loginAlerts}
                      onCheckedChange={(checked) => handleSettingChange("loginAlerts", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Account Management</CardTitle>
                <CardDescription className="text-gray-400">Export your data or delete your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Download className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">Export Your Data</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          Download a copy of all your data including drops, sessions, and profile information.
                        </p>
                        <Button onClick={handleExportData} className="mt-3 bg-blue-500 hover:bg-blue-600 text-white">
                          <Download className="w-4 h-4 mr-2" />
                          Export Data
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">Delete Account</h3>
                        <p className="text-sm text-gray-400 mt-1">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <Button onClick={handleDeleteAccount} variant="destructive" className="mt-3">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
