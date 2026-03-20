"use client";

import { Card } from "@/components/ui/card";
import { MessageSquare, ImageIcon, Music, Code, Star } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Smart Conversation",
    description: "Chat with Gemini AI for instant answers, creative writing, brainstorming and more.",
    color: "from-violet-500 to-purple-600",
    glow: "shadow-violet-500/20",
  },
  {
    icon: ImageIcon,
    title: "Image Generation",
    description: "Create stunning AI images from text using Stable Diffusion XL.",
    color: "from-pink-500 to-rose-600",
    glow: "shadow-pink-500/20",
  },
  {
    icon: Music,
    title: "Music Discovery",
    description: "Search and preview millions of songs instantly with artwork and download.",
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
  },
  {
    icon: Code,
    title: "Code Generation",
    description: "Generate clean, commented code in any language with AI assistance.",
    color: "from-orange-500 to-amber-600",
    glow: "shadow-orange-500/20",
  },
];

const testimonials = [
  {
    name: "Sarvesh",
    title: "Computer Engineer",
    text: "This is the best application I've ever used!",
    rating: 5,
  },
  {
    name: "Yash T",
    title: "Model Designer",
    text: "I use this daily for generating new photos!",
    rating: 5,
  },
  {
    name: "Advait",
    title: "Business Owner",
    text: "This app has changed my life, cannot imagine working without it!",
    rating: 5,
  },
  {
    name: "Aryan",
    title: "Student",
    text: "The best in class, definitely worth the premium subscription!",
    rating: 5,
  },
];

export const LandingContent = () => {
  return (
    <div className="px-6 md:px-10 pb-20 space-y-24">

      {/* Features */}
      <div id="features">
        <h2 className="text-center text-3xl md:text-5xl font-black text-white mb-4">
          Everything You Need
        </h2>
        <p className="text-center text-white/40 mb-12 text-lg">Four powerful AI tools in one platform</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((f) => (
            <div
              key={f.title}
              className={`relative rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all hover:-translate-y-1 shadow-xl ${f.glow}`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg`}>
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
        {[
          { value: "100%", label: "Free to Start" },
          { value: "4+", label: "AI Tools" },
          { value: "∞", label: "Possibilities" },
          { value: "24/7", label: "Available" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400 mb-1">
              {stat.value}
            </div>
            <div className="text-white/40 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div id="testimonials">
        <h2 className="text-center text-3xl md:text-5xl font-black text-white mb-4">
          Loved By Users
        </h2>
        <p className="text-center text-white/40 mb-12 text-lg">See what people are saying</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t) => (
            <Card key={t.name} className="bg-white/5 border-white/10 text-white p-6 rounded-2xl hover:bg-white/10 transition-all">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
             <p className="text-white/70 text-sm leading-relaxed mb-4">&quot;{t.text}&quot;</p>
              <div>
                <p className="font-bold text-white">{t.name}</p>
                <p className="text-white/40 text-xs">{t.title}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center rounded-3xl bg-gradient-to-r from-violet-600/20 to-pink-600/20 border border-white/10 p-12 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
          Ready to Create?
        </h2>
        <p className="text-white/50 mb-8 text-lg">Start generating for free. No credit card required.</p>
        <a href="/sign-up">
          <button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:opacity-90 text-white font-bold px-10 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-lg shadow-violet-500/25">
            Get Started Free →
          </button>
        </a>
      </div>
    </div>
  );
};