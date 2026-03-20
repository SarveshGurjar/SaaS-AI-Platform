"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, ImageIcon, Wand2, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

const suggestions = [
  { text: "Futuristic city at sunset", emoji: "🌆" },
  { text: "Cute cat astronaut", emoji: "🐱" },
  { text: "Abstract neon art", emoji: "🎨" },
  { text: "Mountain golden hour", emoji: "🏔️" },
];

const PhotoPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [photos, setPhotos] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "", amount: "1", resolution: "512x512" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setPhotos([]);
      const response = await axios.post("/api/image", values);
      setPhotos(response.data.map((img: { url: string }) => img.url));
    } catch (error: any) {
      if (error?.response?.status === 403) proModal.onOpen();
      else toast.error("Something went wrong.");
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0608] relative overflow-hidden">
      {/* Pink glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-600/8 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative px-6 py-5 border-b border-pink-500/10">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-transparent" />
        <div className="relative flex items-center gap-4">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-[#0f0608] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-white">IMAGE</h1>
              <span className="text-lg font-black bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">GEN</span>
              <span className="text-xs bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full border border-pink-500/30 font-mono">SDXL</span>
            </div>
            <p className="text-xs text-white/30 font-mono">stable-diffusion-xl • pink mode</p>
          </div>
          <div className="ml-auto text-xs text-white/20 font-mono">{photos.length} images</div>
        </div>
      </div>

      <div className="relative px-4 lg:px-8 py-6 space-y-6">
        {/* Input */}
        <div className="rounded-2xl border border-pink-500/20 bg-pink-500/5 p-5 space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField name="prompt" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-3">
                      <div className="flex-1 flex items-center gap-2 bg-white/5 border border-pink-500/20 rounded-xl px-4 focus-within:border-pink-500/50 transition-all">
                        <Sparkles className="w-4 h-4 text-pink-400/50 flex-shrink-0" />
                        <Input className="border-0 bg-transparent text-white placeholder:text-white/20 focus-visible:ring-0 text-sm font-mono py-3" disabled={isLoading} placeholder="Describe your image..." {...field} />
                      </div>
                      <Button type="submit" disabled={isLoading} className="bg-gradient-to-br from-pink-500 to-rose-600 hover:opacity-90 rounded-xl px-6 font-bold shadow-lg shadow-pink-500/30">
                        <Wand2 className="w-4 h-4 mr-2" />Generate
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )} />
              <div className="flex gap-3">
                <FormField control={form.control} name="amount" render={({ field }) => (
                  <FormItem className="flex-1">
                    <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl><SelectTrigger className="bg-white/5 border-pink-500/20 text-white/60 rounded-xl font-mono text-xs"><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>{amountOptions.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                    </Select>
                  </FormItem>
                )} />
                <FormField control={form.control} name="resolution" render={({ field }) => (
                  <FormItem className="flex-1">
                    <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl><SelectTrigger className="bg-white/5 border-pink-500/20 text-white/60 rounded-xl font-mono text-xs"><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>{resolutionOptions.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                    </Select>
                  </FormItem>
                )} />
              </div>
            </form>
          </Form>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-pink-400/60 font-mono">try:</span>
            {suggestions.map((s) => (
              <button key={s.text} onClick={() => form.setValue("prompt", s.text)}
                className="text-xs px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300/60 hover:text-pink-300 hover:bg-pink-500/20 transition-all font-mono">
                {s.emoji} {s.text}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: parseInt(form.getValues("amount") || "1") }).map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-pink-500/10 border border-pink-500/20 animate-pulse flex items-center justify-center">
                <p className="text-pink-400/40 text-xs font-mono">generating...</p>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {photos.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-52 space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-pink-400/40" />
            </div>
            <p className="text-white/30 font-mono text-sm">your images will appear here</p>
          </div>
        )}

        {/* Grid */}
        {photos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {photos.map((src, i) => (
              <div key={src} className="group relative aspect-square rounded-2xl overflow-hidden border border-pink-500/20 shadow-xl shadow-pink-500/5">
                <img src={src} alt={`Generated ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-4">
                  <Button onClick={() => { const l = document.createElement("a"); l.href = src; l.download = `image-${i+1}.png`; l.click(); }}
                    className="w-full bg-pink-500/20 backdrop-blur-sm border border-pink-500/40 text-white hover:bg-pink-500/40 rounded-xl font-mono text-xs">
                    <Download className="w-3.5 h-3.5 mr-2" />Download
                  </Button>
                </div>
                <div className="absolute top-3 right-3 bg-black/50 text-pink-400/80 text-xs font-mono px-2 py-1 rounded-full border border-pink-500/20">#{i+1}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoPage;