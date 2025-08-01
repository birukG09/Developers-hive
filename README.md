# 🐝 DevHive — Developer Collaboration Platform

**DevHive** is a full-stack, production-ready platform built for real-time developer collaboration. It enables users to code together live, share micro knowledge drops, participate in timed sessions, and grow through gamified learning — all within a modern, responsive, cosmic-themed UI.
![image alt](https://raw.githubusercontent.com/birukG09/Developers-hive/5634b6e8f8d3990adff875b9b4f585282951bf77/FireShot%20Capture%20005%20-%20v0%20-%20%5Bpreview-devhive-project-details-kzmqe58sbrylm3o0hdfz.vusercontent.net%5D.png)


## 🚀 Tech Stack

### 🌐 Frontend

- **Next.js 15** (App Router)
- **React 18** with **TypeScript**
- **Tailwind CSS** + **shadcn/ui** components
- **Lucide React** icons
- **Custom CSS Animations** (space-inspired)
![image alt](https://raw.githubusercontent.com/birukG09/Developers-hive/de509690f77bdcd3fc1a68d96ea4756700e0b614/FireShot%20Capture%20008%20-%20v0%20-%20%5Bpreview-devhive-project-details-kzmfwjrpyul499xz8y85.vusercontent.net%5D.png)

### 🧠 Backend

- **Next.js API Routes**
- **JWT Auth + HTTP-only Cookies**
- **bcryptjs** for password hashing
- **Server-Sent Events** + WebSocket Simulation
- **Edge Runtime Ready**

---

## 🎨 UI Components Used

- `Button`, `Card`, `Input`, `Badge`
- `Avatar`, `Progress`, `Tabs`, `Dialog`
- `Select`, `Switch`, `Dropdown`, `Alert`
- `Accordion`, `Theme Toggle`, `Animated Background`
![image alt](https://raw.githubusercontent.com/birukG09/Developers-hive/29975cd1fdd20e1256313c3a5f2288efc4f310bc/FireShot%20Capture%20007%20-%20v0%20-%20%5Bpreview-devhive-project-details-kzmfwjrpyul499xz8y85.vusercontent.net%5D.png)

---

## 🗂️ File Structure

```plaintext
app/
├── api/               # API routes
├── (auth)/            # Login, Register
├── dashboard/         # User dashboard
├── rooms/             # Live code rooms
├── drops/             # Knowledge tips
├── sessions/          # Dev challenges
├── community/         # Community pages
├── profile/           # User profiles
└── settings/          # Account settings

components/
├── ui/                # Reusable UI (shadcn)
├── code-editor.tsx
├── animated-background.tsx
├── floating-elements.tsx
├── dashboard-layout.tsx

lib/
├── database.ts
├── auth.ts
├── websocket.ts
├── middleware.ts
└── server-actions.ts
🔒 Security & Optimization
Zod schema validation

Rate limiting (100 req/min)

XSS/CSRF Protection

Image Optimization via Next.js

Code Splitting, Server Components, and Caching

🌌 Cosmic Design System
Dark theme with glowing space gradients

Animated starfield and floating elements

Responsive layout with Tailwind breakpoints

Glassmorphism effects and cosmic transitions

✅ Features Implemented
🔐 Auth System (Login, JWT, Profile)

🧑‍💻 Live Code Rooms (Realtime-ready)

✨ Micro Knowledge Drops

📅 Dev Sessions with Countdown

🏆 Gamification (XP, Levels, Leaderboards)

🌐 Community Feed

📱 Fully Responsive Design

🛰️ Animated Cosmic UI

🔎 Search & Filtering

🔗 Social Integration (GitHub, LinkedIn)

🔧 Ready for Production
PostgreSQL, MongoDB, or Supabase integration

WebSocket or SSE real-time upgrade

OpenAI or external API integrations

Stripe or PayPal payments

Email notifications

Deployment on Vercel, Netlify, or Docker

📦 Environment Variables
env
Copy
Edit
# Auth
JWT_SECRET=your-secret-key
NEXTAUTH_SECRET=your-nextauth-secret

# Database
DATABASE_URL=your-db-url
REDIS_URL=your-redis-url

# External APIs
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret
