"use client";

import axios from "axios";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Download, Music, Search, Headphones } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader } from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

interface MusicResult { audio: string; title: string; artist: string; artwork: string; }

const suggestions = ["Apocalypse", "Baby Justin Bieber", "Blinding Lights", "Levitating", "Shape of You"];

const MusicPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [result, setResult] = useState<MusicResult>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setResult(undefined);
      const response = await axios.post("/api/music", values);
      setResult(response.data);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) proModal.onOpen();
      else if (error?.response?.status === 404) toast.error("No song found!");
      else toast.error("Something went wrong.");
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0a00] relative overflow-hidden">
      {/* Amber glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative px-6 py-5 border-b border-amber-500/10">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-transparent" />
        <div className="relative flex items-center gap-4">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Headphones className="w-6 h-6 text-black" />
            </div>
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-[#0f0a00] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-white">MUSIC</h1>
              <span className="text-lg font-black bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">FINDER</span>
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-mono">iTunes</span>
            </div>
            <p className="text-xs text-white/30 font-mono">search any song • 30s preview • amber mode</p>
          </div>
        </div>
      </div>

      <div className="relative px-4 lg:px-8 py-6 space-y-6">
        {/* Search */}
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField name="prompt" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-3">
                      <div className="flex-1 flex items-center gap-3 bg-white/5 border border-amber-500/20 rounded-xl px-4 focus-within:border-amber-500/50 transition-all">
                        <Search className="w-4 h-4 text-amber-400/50 flex-shrink-0" />
                        <Input
                          className="border-0 bg-transparent text-white placeholder:text-white/20 focus-visible:ring-0 text-sm font-mono py-3"
                          disabled={isLoading}
                          placeholder='Search "Apocalypse" or any song...'
                          {...field}
                        />
                      </div>
                      <Button type="submit" disabled={isLoading}
                        className="bg-gradient-to-br from-amber-400 to-yellow-500 hover:opacity-90 text-black rounded-xl px-6 font-black shadow-lg shadow-amber-500/30">
                        Search
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )} />
            </form>
          </Form>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-amber-400/60 font-mono">🎵 popular:</span>
            {suggestions.map((s) => (
              <button key={s} onClick={() => form.setValue("prompt", s)}
                className="text-xs px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300/60 hover:text-amber-300 hover:bg-amber-500/20 transition-all font-mono">
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center animate-pulse">
              <Music className="w-8 h-8 text-amber-400/60" />
            </div>
            <p className="text-amber-400/40 text-xs font-mono animate-pulse">searching itunes catalog...</p>
          </div>
        )}

        {/* Empty */}
        {!result && !isLoading && (
          <div className="flex flex-col items-center justify-center h-52 space-y-3">
            <div className="text-6xl">🎧</div>
            <p className="text-white/40 font-black text-xl">Search any song</p>
            <p className="text-white/20 font-mono text-sm">get a 30 second preview instantly</p>
          </div>
        )}

        {/* Result — Groovy amber player */}
        {result && (
          <div className="rounded-2xl border border-amber-500/20 overflow-hidden shadow-2xl shadow-amber-500/10">
            {/* Top glow bar */}
            <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400" />
            <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/5 p-6 space-y-5">
              {/* Song Info */}
              <div className="flex items-center gap-5">
                {result.artwork
                  ? <img src={result.artwork} alt={result.title} className="w-24 h-24 rounded-2xl object-cover shadow-xl ring-2 ring-amber-500/30" />
                  : <div className="w-24 h-24 rounded-2xl bg-amber-500/20 flex items-center justify-center"><Music className="w-10 h-10 text-amber-400" /></div>
                }
                <div className="flex-1 min-w-0">
                  <p className="font-black text-2xl text-white truncate">{result.title}</p>
                  <p className="text-amber-300/60 font-mono text-sm mt-1">{result.artist}</p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-full border border-amber-500/30 font-mono">🎵 30s Preview</span>
                    <span className="text-xs bg-white/5 text-white/30 px-2.5 py-1 rounded-full border border-white/10 font-mono">iTunes</span>
                  </div>
                </div>
              </div>

              {/* Audio Player */}
              <div className="bg-black/30 rounded-xl p-3 border border-amber-500/10">
                <audio controls className="w-full" style={{ colorScheme: "dark" }}>
                  <source src={result.audio} type="audio/mpeg" />
                </audio>
              </div>

              {/* Download */}
              <Button
                onClick={() => { const l = document.createElement("a"); l.href = result.audio; l.download = `${result.title}.mp3`; l.click(); }}
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:opacity-90 text-black rounded-xl font-black shadow-lg shadow-amber-500/20 font-mono"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Preview MP3
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPage;