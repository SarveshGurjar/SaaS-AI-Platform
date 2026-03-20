"use client";

import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, ArrowRight } from "lucide-react";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="relative flex flex-col items-center justify-center py-32 px-4 text-center overflow-hidden">
      {/* Glowing orbs */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl" />

      {/* Badge */}
      <div className="relative flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 text-sm text-white/80">
        <Sparkles className="w-4 h-4 text-yellow-400" />
        Powered by Gemini AI & Stable Diffusion
        <Sparkles className="w-4 h-4 text-yellow-400" />
      </div>

      {/* Headline */}
      <div className="relative space-y-4 mb-6">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight">
          Create Anything
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400">
            With AI
          </span>
        </h1>
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/60 h-12">
          <TypewriterComponent
            options={{
              strings: [
                "Generate Images ✨",
                "Write Code 💻",
                "Chat Smartly 🧠",
                "Find Music 🎵",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>

      {/* Subtitle */}
      <p className="relative text-white/50 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
        Your all-in-one AI platform. Generate images, write code, have smart conversations, and discover music — all in one place.
      </p>

      {/* CTA Buttons */}
      <div className="relative flex flex-col sm:flex-row gap-4 items-center">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white border-0 rounded-full px-8 py-6 text-lg font-bold shadow-lg shadow-violet-500/25 transition-all hover:scale-105 hover:shadow-violet-500/40">
            <Zap className="w-5 h-5 mr-2" />
            Start For Free
          </Button>
        </Link>
        <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
          <Button variant="outline" className="rounded-full px-8 py-6 text-lg border-white/20 text-white hover:bg-white/10 transition-all">
            See Demo
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>

      {/* Social proof */}
      <p className="relative mt-8 text-white/30 text-sm">
        No credit card required · 100 free generations
      </p>
    </div>
  );
};