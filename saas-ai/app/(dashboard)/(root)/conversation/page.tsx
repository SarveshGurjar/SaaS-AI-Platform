"use client";

import axios from "axios";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Send, Brain, User, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

type Message = { role: string; content: string };

const suggestions = [
  { text: "Explain quantum computing", emoji: "⚛️" },
  { text: "Write a poem about AI", emoji: "✍️" },
  { text: "Best coding practices", emoji: "💻" },
  { text: "Plan my startup", emoji: "🚀" },
];

const ConversationPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: Message = { role: "user", content: values.prompt };
      const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/conversation", { messages: newMessages });
      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) proModal.onOpen();
      else toast.error("Something went wrong.");
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-[#08060f] relative overflow-hidden">
      {/* Violet glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-600/8 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative px-6 py-5 border-b border-violet-500/10">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-transparent" />
        <div className="relative flex items-center gap-4">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-[#08060f] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-white">SMART</h1>
              <span className="text-lg font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">CHAT</span>
              <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full border border-violet-500/30 font-mono">v2.0</span>
            </div>
            <p className="text-xs text-white/30 font-mono">gemini-2.0-flash • violet mode</p>
          </div>
          <div className="ml-auto flex items-center gap-2 text-xs text-white/20 font-mono">
            <span>{messages.length} messages</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="relative flex-1 overflow-y-auto px-4 lg:px-8 py-6 space-y-3">
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-64 space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/20 flex items-center justify-center">
              <Brain className="w-10 h-10 text-violet-400" />
            </div>
            <div className="text-center">
              <p className="text-white/60 font-black text-2xl">What&apos;s on your mind?</p>
              <p className="text-white/20 text-sm font-mono mt-1">Ask me anything. I know a lot.</p>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full max-w-md">
              {suggestions.map((s) => (
                <button key={s.text} onClick={() => form.setValue("prompt", s.text)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300/60 hover:text-violet-300 hover:bg-violet-500/20 transition-all text-left text-xs font-mono">
                  <span>{s.emoji}</span><span>{s.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {[...messages].reverse().map((msg, i) => (
            <div key={i} className={cn("flex gap-4", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
              <div className={cn("w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg",
                msg.role === "user"
                  ? "bg-gradient-to-br from-orange-400 to-pink-500 shadow-orange-500/20"
                  : "bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-violet-500/20"
              )}>
                {msg.role === "user" ? <User className="w-4 h-4 text-white" /> : <Brain className="w-4 h-4 text-white" />}
              </div>
              <div className="max-w-[75%] space-y-1">
                <p className={cn("text-xs font-mono", msg.role === "user" ? "text-right text-orange-400/50" : "text-violet-400/50")}>
                  {msg.role === "user" ? "YOU" : "GEMINI AI"}
                </p>
                <div className={cn("px-5 py-3.5 rounded-2xl text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-gradient-to-br from-orange-500/20 to-pink-500/20 border border-orange-500/20 text-white/90 rounded-tr-none"
                    : "bg-violet-500/10 border border-violet-500/20 text-white/80 rounded-tl-none"
                )}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {isLoading && (
          <div className="flex gap-4">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center flex-shrink-0">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div className="bg-violet-500/10 border border-violet-500/20 rounded-2xl rounded-tl-none px-5 py-3.5 flex items-center gap-2">
              {[0, 150, 300].map((d) => (
                <span key={d} className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
              ))}
              <span className="text-xs text-violet-400/50 font-mono ml-1">thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="relative px-4 lg:px-8 py-4 border-t border-violet-500/10 bg-[#08060f]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-3 bg-violet-500/5 border border-violet-500/20 rounded-2xl px-4 py-3 focus-within:border-violet-500/50 focus-within:bg-violet-500/10 transition-all">
              <Sparkles className="w-4 h-4 text-violet-400/40 flex-shrink-0" />
              <FormField name="prompt" render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input className="border-0 bg-transparent text-white placeholder:text-white/20 outline-none focus-visible:ring-0 text-sm font-mono" disabled={isLoading} placeholder="Ask me anything..." {...field} />
                  </FormControl>
                </FormItem>
              )} />
            </div>
            <Button type="submit" disabled={isLoading} className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 hover:opacity-90 p-0 shadow-lg shadow-violet-500/30">
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ConversationPage;