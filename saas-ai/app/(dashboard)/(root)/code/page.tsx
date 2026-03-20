"use client";

import axios from "axios";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Send, Copy, Check, Terminal, User, Braces } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

type Message = { role: string; content: string };

const suggestions = [
  { text: "React login form", lang: "TSX" },
  { text: "Python sort algorithm", lang: "PY" },
  { text: "REST API in Node.js", lang: "JS" },
  { text: "SQL join examples", lang: "SQL" },
];

const CodePage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: Message = { role: "user", content: values.prompt };
      const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/code", { messages: newMessages });
      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) proModal.onOpen();
      else toast.error("Something went wrong.");
    } finally {
      router.refresh();
    }
  };

  const copyText = (text: string, i: number) => {
    navigator.clipboard.writeText(text);
    setCopied(i);
    toast.success("Copied!");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-[#060d06] relative overflow-hidden">
      {/* Green glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-green-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/8 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative px-6 py-5 border-b border-green-500/10">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-transparent" />
        <div className="relative flex items-center gap-4">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-[#060d06] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-white">CODE</h1>
              <span className="text-lg font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">GEN</span>
              <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full border border-green-500/30 font-mono">GBCP</span>
            </div>
            <p className="text-xs text-white/30 font-mono">gemini-2.0-flash • green terminal mode</p>
          </div>
          <div className="ml-auto text-xs text-white/20 font-mono">{messages.filter(m => m.role === "assistant").length} snippets</div>
        </div>
      </div>

      {/* Messages */}
      <div className="relative flex-1 overflow-y-auto px-4 lg:px-8 py-6">
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-64 space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <span className="text-3xl font-black text-green-400 font-mono">{`</>`}</span>
            </div>
            <div className="text-center">
              <p className="text-white/60 font-black text-2xl">Ready to code?</p>
              <p className="text-white/20 text-sm font-mono mt-1">Describe what you want to build.</p>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full max-w-md">
              {suggestions.map((s) => (
                <button key={s.text} onClick={() => form.setValue("prompt", s.text)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 hover:border-green-500/40 hover:bg-green-500/15 transition-all group">
                  <span className="text-xs text-green-300/50 group-hover:text-green-300/80 font-mono">{s.text}</span>
                  <span className="text-xs font-mono bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">{s.lang}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {[...messages].reverse().map((message, i) => (
            <div key={i} className="group">
              {message.role === "user" ? (
                <div className="flex items-start gap-3 justify-end">
                  <div className="max-w-[70%]">
                    <div className="text-xs font-mono text-orange-400/50 text-right mb-1">YOU</div>
                    <div className="bg-gradient-to-br from-orange-500/15 to-pink-500/15 border border-orange-500/20 rounded-2xl rounded-tr-none px-4 py-3 text-sm text-white/80 font-mono">
                      $ {message.content}
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center flex-shrink-0 mt-5 shadow-lg shadow-orange-500/20">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 mt-5 shadow-lg shadow-green-500/20">
                    <Braces className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs font-mono text-green-400/60">AI OUTPUT</div>
                      <button onClick={() => copyText(message.content, i)}
                        className="flex items-center gap-1.5 text-xs text-white/20 hover:text-green-400/60 transition-colors opacity-0 group-hover:opacity-100">
                        {copied === i ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                        <span className="font-mono">{copied === i ? "copied!" : "copy"}</span>
                      </button>
                    </div>
                    <div className="rounded-2xl rounded-tl-none border border-green-500/20 overflow-hidden bg-black/40">
                      <ReactMarkdown
                        components={{
                          pre: ({ node, ...props }) => (
                            <div className="overflow-auto bg-black/60 border-t border-green-500/10">
                              <pre className="p-4 text-green-400 text-xs leading-relaxed overflow-x-auto" {...props} />
                            </div>
                          ),
                          code: ({ node, ...props }) => (
                            <code className="bg-green-500/10 text-green-400 rounded px-1.5 py-0.5 text-xs font-mono" {...props} />
                          ),
                          p: ({ node, ...props }) => (
                            <p className="text-white/60 text-sm leading-relaxed px-4 py-2" {...props} />
                          ),
                        }}
                      >
                        {message.content || ""}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {isLoading && (
          <div className="flex items-start gap-3 mt-4">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
              <Braces className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-2xl rounded-tl-none px-4 py-3">
              {[0, 150, 300].map((d) => (
                <span key={d} className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
              ))}
              <span className="text-xs text-green-400/40 font-mono ml-1">generating code...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="relative px-4 lg:px-8 py-4 border-t border-green-500/10 bg-[#060d06]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-3 bg-green-500/5 border border-green-500/20 rounded-2xl px-4 py-3 focus-within:border-green-500/40 transition-all">
              <span className="text-green-400/50 font-mono text-sm flex-shrink-0">$</span>
              <FormField name="prompt" render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input className="border-0 bg-transparent text-white placeholder:text-white/20 focus-visible:ring-0 text-sm font-mono" disabled={isLoading} placeholder="Describe the code you want..." {...field} />
                  </FormControl>
                </FormItem>
              )} />
            </div>
            <Button type="submit" disabled={isLoading} className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 hover:opacity-90 p-0 shadow-lg shadow-green-500/30">
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </Form>
        <p className="text-center text-white/10 text-xs font-mono mt-2">gbcp code generator • green terminal mode</p>
      </div>
    </div>
  );
};

export default CodePage;