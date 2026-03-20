"use client";

import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard, MessageSquare, MusicIcon, Settings, Zap } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FreeCounter } from "./free-counter";

const montserrat = Montserrat({ weight: "700", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-400",
    glow: "group-hover:shadow-sky-500/20",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-400",
    glow: "group-hover:shadow-violet-500/20",
    gradient: "from-violet-500 to-fuchsia-600",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-400",
    glow: "group-hover:shadow-pink-500/20",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    label: "Music Generation",
    icon: MusicIcon,
    href: "/music",
    color: "text-amber-400",
    glow: "group-hover:shadow-emerald-500/20",
    gradient: "from-amber-600/10 to-amber-600",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-400",
    glow: "group-hover:shadow-green-500/20",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-400",
    glow: "group-hover:shadow-gray-500/20",
    gradient: "from-gray-500 to-gray-600",
  },
];

interface SidebarProps {
  apiLimitCount: number;
}

const Sidebar = ({ apiLimitCount = 0 }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-[#0a0a0f] border-r border-white/5 text-white">

      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden ring-2 ring-violet-500/30 group-hover:ring-violet-500/60 transition-all">
            <Image fill alt="Logo" src="/logo.jpg" className="object-cover" />
          </div>
          <div>
            <h1 className={cn("text-base font-black text-white tracking-tight", montserrat.className)}>
              Smart<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Saas</span>
            </h1>
            <p className="text-white/20 text-xs font-mono">AI Platform</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="text-white/20 text-xs font-mono px-3 mb-3 uppercase tracking-widest">Tools</p>
        {routes.map((route) => {
          const isActive = pathname === route.href;
          return (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative overflow-hidden",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white/80 hover:bg-white/5"
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div className={cn("absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-gradient-to-b", route.gradient)} />
              )}

              {/* Icon */}
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all",
                isActive
                  ? `bg-gradient-to-br ${route.gradient} shadow-lg`
                  : "bg-white/5 group-hover:bg-white/10"
              )}>
                <route.icon className={cn("h-4 w-4", isActive ? "text-white" : route.color)} />
              </div>

              <span className="text-sm font-medium">{route.label}</span>

              {/* Active dot */}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/40" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Free Counter */}
      <div className="px-3 py-4 border-t border-white/5">
        <FreeCounter apiLimitCount={apiLimitCount} />
      </div>
    </div>
  );
};

export default Sidebar;