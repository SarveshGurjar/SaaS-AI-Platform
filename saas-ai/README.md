# 🤖 SmartSaas — AI Platform

A full-stack SaaS AI platform built with Next.js 14, featuring conversation, code generation, image generation, and music discovery — all powered by free AI APIs.

![SmartSaas](public/logo123.png)

---

## ✨ Features

| Feature | Description | API |
|---|---|---|
| 🗣️ **Conversation** | Chat with Gemini AI for smart answers | Gemini 2.0 Flash |
| 💻 **Code Generation** | Generate clean code in any language | Gemini 2.0 Flash |
| 🖼️ **Image Generation** | Create stunning AI images from text | Cloudflare Workers AI |
| 🎵 **Music Discovery** | Search any song with 30s preview | iTunes API |
| 🔐 **Authentication** | Secure sign in/sign up | Clerk |
| 🗄️ **Database** | API usage tracking | PlanetScale + Prisma |

---

## 🛠️ Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS + Shadcn/ui
- **Auth** — Clerk
- **Database** — PlanetScale (MySQL) + Prisma ORM
- **AI APIs** — Gemini, Cloudflare Workers AI, iTunes
- **Deployment** — Vercel

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### 1. Clone the repository

```bash
git clone https://github.com/SarveshGurjar/SaaS-AI-Platform.git
cd SaaS-AI-Platform/saas-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the `saas-ai/` folder:

```env
# Clerk Authentication - https://clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Database - https://planetscale.com
DATABASE_URL="mysql://xxxxx"

# Gemini AI - https://aistudio.google.com
GEMINI_API_KEY=AIzaSyxxxxx

# Cloudflare Workers AI - https://dash.cloudflare.com
CLOUDFLARE_API_TOKEN=xxxxx
CLOUDFLARE_ACCOUNT_ID=xxxxx

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set up database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Free API Setup

| Service | Free Tier | Link |
|---|---|---|
| Clerk | 50,000 MAU free | [clerk.com](https://clerk.com) |
| PlanetScale | 5GB free | [planetscale.com](https://planetscale.com) |
| Gemini AI | 1,500 req/day free | [aistudio.google.com](https://aistudio.google.com) |
| Cloudflare Workers AI | 10,000 neurons/day free | [dash.cloudflare.com](https://dash.cloudflare.com) |
| iTunes API | Unlimited free | Built-in |

---

## 📁 Project Structure

```
saas-ai/
├── app/
│   ├── (auth)/              # Sign in/Sign up pages
│   ├── (dashboard)/         # Protected dashboard pages
│   │   └── (root)/
│   │       ├── conversation/  # AI Chat page
│   │       ├── code/          # Code generation page
│   │       ├── image/         # Image generation page
│   │       ├── music/         # Music discovery page
│   │       ├── dashboard/     # Home dashboard
│   │       └── settings/      # Settings page
│   ├── api/
│   │   ├── conversation/    # Gemini conversation API
│   │   ├── code/            # Gemini code API
│   │   ├── image/           # Cloudflare image API
│   │   └── music/           # iTunes music API
│   └── (landing)/           # Public landing page
├── components/              # Reusable UI components
├── lib/                     # Utilities and helpers
├── prisma/                  # Database schema
└── hooks/                   # Custom React hooks
```

---

## 🌐 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Set **Root Directory** to `saas-ai`
4. Add all environment variables
5. Click **Deploy**

---

## 📸 Screenshots

### Landing Page
- Modern dark hero with animated typewriter
- Feature cards and testimonials

### Dashboard
- Clean tool selection with gradient cards

### Conversation
- Dark terminal-style chat interface
- Powered by Gemini 2.0 Flash

### Code Generation
- Dark IDE-style interface
- Syntax highlighted output with copy button

### Image Generation
- Prompt-based image creation
- Download generated images

### Music Discovery
- Search any song via iTunes
- Album artwork + 30 second preview + download

---

## ⚙️ Environment Variables Reference

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `DATABASE_URL` | PlanetScale MySQL connection string |
| `GEMINI_API_KEY` | Google Gemini API key |
| `CLOUDFLARE_API_TOKEN` | Cloudflare Workers AI token |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID |
| `NEXT_PUBLIC_APP_URL` | Your app URL |

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org)
- [Clerk](https://clerk.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui](https://ui.shadcn.com)
- [Prisma](https://prisma.io)
- [Google Gemini](https://ai.google.dev)
- [Cloudflare Workers AI](https://ai.cloudflare.com)

---

## 👨‍💻 Author

**Sarvesh Gurjar**
- GitHub: [@SarveshGurjar](https://github.com/SarveshGurjar)

---

## 📄 License

This project is for educational purposes.
