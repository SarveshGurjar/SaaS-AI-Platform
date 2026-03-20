"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: "700", subsets: ["latin"] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="sticky top-0 z-50 p-4 backdrop-blur-md bg-black/20 border-b border-white/10 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-3">
        <div className="relative h-9 w-9 rounded-xl overflow-hidden ring-2 ring-violet-500/50">
          <Image fill alt="Logo" src="/logo123.png" className="object-cover" />
        </div>
        <h1 className={cn("text-xl font-bold text-white", font.className)}>
          Smart<span className="text-violet-400">Saas</span>
        </h1>
      </Link>

      <div className="hidden md:flex items-center gap-6 text-white/60 text-sm">
        <Link href="#features" className="hover:text-white transition">Features</Link>
        <Link href="#testimonials" className="hover:text-white transition">Reviews</Link>
      </div>

      <div className="flex items-center gap-3">
        {isSignedIn ? (
          <Link href="/dashboard">
            <Button className="bg-violet-600 hover:bg-violet-700 rounded-full text-white border-0">
              Dashboard
            </Button>
          </Link>
        ) : (
          <>
            <Link href="/sign-in">
              <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 rounded-full">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:opacity-90 rounded-full text-white border-0 font-semibold">
                Get Started
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};