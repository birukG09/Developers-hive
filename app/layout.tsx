import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Github, Linkedin, MessageCircle } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DevHive - Real-time Developer Collaboration Platform",
  description:
    "Join thousands of developers in live coding rooms, share micro knowledge drops, get AI-powered assistance, and build your reputation in the ultimate developer collaboration platform.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
        <footer className="bg-gray-900/50 border-t border-gray-800 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  DevHive
                </h3>
                <p className="text-gray-400 text-sm">
                  Real-time developer collaboration platform for the cosmic coding community.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-medium">Platform</h4>
                <div className="space-y-2 text-sm">
                  <a href="/rooms" className="text-gray-400 hover:text-purple-400 block">
                    Coding Rooms
                  </a>
                  <a href="/drops" className="text-gray-400 hover:text-purple-400 block">
                    Knowledge Drops
                  </a>
                  <a href="/sessions" className="text-gray-400 hover:text-purple-400 block">
                    Live Sessions
                  </a>
                  <a href="/community" className="text-gray-400 hover:text-purple-400 block">
                    Community
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-medium">Resources</h4>
                <div className="space-y-2 text-sm">
                  <a href="/docs" className="text-gray-400 hover:text-purple-400 block">
                    Documentation
                  </a>
                  <a href="/help" className="text-gray-400 hover:text-purple-400 block">
                    Help Center
                  </a>
                  <a href="/api" className="text-gray-400 hover:text-purple-400 block">
                    API
                  </a>
                  <a href="/status" className="text-gray-400 hover:text-purple-400 block">
                    Status
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-medium">Creator</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-400">Built by Biruk Gebre</p>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://github.com/birukG09"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/biruk-gebre-230935238/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.reddit.com/user/Safe-Present-1030/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© 2025 DevHive. All rights reserved.</p>
              <div className="flex items-center gap-6 mt-4 md:mt-0">
                <a href="/privacy" className="text-gray-400 hover:text-purple-400 text-sm">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-gray-400 hover:text-purple-400 text-sm">
                  Terms of Service
                </a>
                <a href="/cookies" className="text-gray-400 hover:text-purple-400 text-sm">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
