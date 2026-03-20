"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, Sparkles, Zap, Star } from "lucide-react";

const tools = [
  {
    label: "Conversation",
    description: "Chat with Gemini AI for smart answers",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-400",
    border: "hover:border-violet-500/50",
    gradient: "from-violet-500/20 to-fuchsia-500/10",
    iconBg: "from-violet-500 to-fuchsia-600",
    tag: "AI Chat",
  },
  {
    label: "Image Generation",
    description: "Create stunning images from text",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-400",
    border: "hover:border-pink-500/50",
    gradient: "from-pink-500/20 to-rose-500/10",
    iconBg: "from-pink-500 to-rose-600",
    tag: "SDXL",
  },
  {
    label: "Music Discovery",
    description: "Search & preview any song instantly",
    icon: Music,
    href: "/music",
    color: "text-amber-400",
    border: "hover:border-amber-500/50",
    gradient: "from-amber-500/20 to-yellow-500/10",
    iconBg: "from-amber-500 to-yellow-500",
    tag: "iTunes",
  },
  {
    label: "Code Generation",
    description: "Generate clean code in any language",
    icon: Code,
    href: "/code",
    color: "text-green-400",
    border: "hover:border-green-500/50",
    gradient: "from-green-500/20 to-emerald-500/10",
    iconBg: "from-green-500 to-emerald-600",
    tag: "GBCP",
  },
];

const stats = [
  { label: "AI Tools", value: "4+" },
  { label: "Free Tier", value: "100" },
  { label: "Models", value: "3+" },
  { label: "Uptime", value: "24/7" },
];

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#04080f] relative overflow-hidden">
      {/* Sky blue ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative px-6 py-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono px-4 py-1.5 rounded-full">
            <Sparkles className="w-3 h-3" />
            SmartSaas AI Platform
            <Sparkles className="w-3 h-3" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            What will you
            <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent"> create</span>
            <span className="text-white">?</span>
          </h1>
          <p className="text-white/30 text-lg font-mono">pick a tool and start generating</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-sky-500/5 border border-sky-500/10 p-4 text-center hover:border-sky-500/30 transition-all">
              <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">{s.value}</p>
              <p className="text-white/30 text-xs font-mono mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <div
              onClick={() => router.push(tool.href)}
              key={tool.href}
              className={cn(
                "group relative rounded-2xl border border-white/10 bg-gradient-to-br p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
                tool.gradient, tool.border
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn("w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg", tool.iconBg)}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <span className={cn("text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10", tool.color)}>{tool.tag}</span>
              </div>
              <h3 className="text-white font-black text-xl mb-1">{tool.label}</h3>
              <p className="text-white/40 text-sm font-mono">{tool.description}</p>
              <div className={cn("flex items-center gap-1 mt-4 text-xs font-mono transition-all", tool.color)}>
                <span>Launch tool</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;