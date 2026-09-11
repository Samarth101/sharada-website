import { useEffect, useRef, useState } from "react";
import { Bot, Send, X, Loader2 } from "lucide-react";
import { firmData, quickPrompts } from "./chatData";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

export function CopilotChat() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: `Hi, I’m ${firmData.name} Copilot. Ask me about our services, projects, or how to get in touch.`,
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, isTyping]);

  useEffect(() => {
    let reconnectTimer: any;
    let shouldReconnect = true;

    function connect() {
      const rawBackend = import.meta.env.VITE_BACKEND_URL;
      let wsUrl = "";
      if (rawBackend) {
        const wsProto = rawBackend.startsWith("https") ? "wss" : "ws";
        const cleanHost = rawBackend.replace(/^https?:\/\//, "").replace(/\/$/, "");
        wsUrl = `${wsProto}://${cleanHost}/ws`;
      } else {
        const proto = location.protocol === "https:" ? "wss" : "ws";
        wsUrl = `${proto}://${location.hostname}:8080/ws`;
      }
      
      try {
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          try { ws.send(JSON.stringify({ type: "ping" })); } catch {}
        };

        ws.onmessage = (ev) => {
          try {
            const m = JSON.parse(ev.data);
            if (m.type === "start") {
              setIsTyping(false);
              setMessages((cur) => [...cur, { id: Date.now(), role: "assistant", text: "" }]);
            } else if (m.type === "chunk") {
              setMessages((cur) => {
                const last = cur[cur.length - 1];
                if (!last || last.role !== "assistant") return cur;
                const updated = [...cur];
                updated[updated.length - 1] = { ...last, text: last.text + m.chunk };
                return updated;
              });
            } else if (m.type === "end") {
              // stream finished
            } else if (m.type === "error") {
              setIsTyping(false);
              setMessages((cur) => [...cur, { id: Date.now(), role: "assistant", text: "Sorry, I'm having trouble connecting to the network right now." }]);
            }
          } catch (e) {}
        };

        ws.onclose = () => {
          if (shouldReconnect) reconnectTimer = setTimeout(connect, 2000);
        };
      } catch (e) {
        if (shouldReconnect) reconnectTimer = setTimeout(connect, 2000);
      }
    }

    connect();
    return () => {
      shouldReconnect = false;
      clearTimeout(reconnectTimer);
      try { wsRef.current?.close(); } catch {}
    };
  }, []);

  const sendMessage = (text: string) => {
    const value = text.trim();
    if (!value) return;

    setMessages((cur) => [...cur, { id: Date.now(), role: "user", text: value }]);
    setDraft("");
    setIsTyping(true);

    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      try {
        ws.send(JSON.stringify({ type: "user_message", text: value }));
      } catch (e) {
        setIsTyping(false);
        setMessages((cur) => [...cur, { id: Date.now(), role: "assistant", text: "Connection error." }]);
      }
    } else {
      setIsTyping(false);
      setMessages((cur) => [...cur, { id: Date.now(), role: "assistant", text: "I'm offline right now. Please check if the local proxy server is running on port 8080." }]);
    }
  };

  if (open) {
    return (
      <section className="fixed right-4 bottom-4 z-40 flex h-[420px] w-[calc(100vw-2rem)] max-w-[320px] flex-col border border-[#C9A84C]/25 bg-[#090909]/96 shadow-[0_0_34px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:right-6 sm:bottom-6">
        <header className="flex items-center justify-between border-b border-[#C9A84C]/10 p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-[#C9A84C]/25 bg-[#C9A84C]/8 text-[#C9A84C]">
              <Bot size={16} />
            </span>
            <div className="leading-tight">
              <div className="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "'Raleway', sans-serif" }}>
                Copilot
              </div>
              <div className="text-[#F0E8D5]/30 text-[10px]" style={{ fontFamily: "'Raleway', sans-serif" }}>
                Powered by AI
              </div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="flex h-9 w-9 items-center justify-center border border-[#C9A84C]/15 text-[#F0E8D5]/55 transition-colors hover:border-[#C9A84C]/35 hover:text-[#C9A84C]">
            <X size={15} />
          </button>
        </header>

        <div className="flex gap-2 overflow-x-auto border-b border-[#C9A84C]/10 px-3 py-2">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              className="shrink-0 border border-[#C9A84C]/15 px-3 py-1.5 text-[10px] tracking-[0.12em] text-[#F0E8D5]/65 transition-colors hover:border-[#C9A84C]/35 hover:text-[#C9A84C]"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] whitespace-pre-line border px-3 py-2 text-sm leading-relaxed ${message.role === "user" ? "border-[#C9A84C]/30 bg-[#C9A84C]/12 text-[#F0E8D5]" : "border-[#F0E8D5]/10 bg-black/35 text-[#F0E8D5]/72"}`} style={{ fontFamily: "'EB Garamond', serif" }}>
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="border border-[#F0E8D5]/10 bg-black/35 px-4 py-3 text-[#C9A84C]">
                <Loader2 size={14} className="animate-spin" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form onSubmit={(e) => { e.preventDefault(); sendMessage(draft); }} className="flex gap-2 border-t border-[#C9A84C]/10 p-3">
          <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type a message" className="min-w-0 flex-1 border border-[#C9A84C]/15 bg-black/45 px-3 py-2 text-sm text-[#F0E8D5] outline-none transition-colors placeholder:text-[#F0E8D5]/25 focus:border-[#C9A84C]/45" style={{ fontFamily: "'Raleway', sans-serif" }} />
          <button type="submit" disabled={isTyping || !draft.trim()} className="flex h-10 w-10 items-center justify-center border border-[#C9A84C]/25 bg-[#C9A84C] text-black transition-colors hover:bg-[#D4AF37] disabled:opacity-50">
            <Send size={15} />
          </button>
        </form>
      </section>
    );
  }

  return (
    <button onClick={() => setOpen(true)} className="fixed right-4 bottom-4 z-40 flex items-center gap-3 border border-[#C9A84C]/25 bg-[#090909]/95 px-4 py-3 text-left shadow-[0_0_34px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-300 hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/10 sm:right-6 sm:bottom-6">
      <span className="flex h-9 w-9 items-center justify-center border border-[#C9A84C]/25 bg-[#C9A84C]/8 text-[#C9A84C]">
        <Bot size={16} />
      </span>
      <span className="leading-none">
        <span className="block text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "'Raleway', sans-serif" }}>Copilot</span>
        <span className="block text-[#F0E8D5]/30 text-[10px]" style={{ fontFamily: "'Raleway', sans-serif" }}>Ask about Sharada</span>
      </span>
    </button>
  );
}