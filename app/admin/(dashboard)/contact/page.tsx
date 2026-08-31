"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  Trash2, 
  Mail, 
  User, 
  X,
  Check,
  Filter,
  MessageSquare,
  Clock,
  Eye,
  Send,
  Reply,
  MoreVertical,
  CheckCircle2,
  Inbox
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

export default function ContactPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenMessage = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (msg.status === "new") {
      // Mark as read
      try {
        await fetch(`/api/admin/messages/${msg.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "read" })
        });
        fetchMessages(); // Refresh list
      } catch (error) {
        console.error("Failed to mark as read:", error);
      }
    }
  };

  const handleSendReply = async () => {
    if (!replyText || !selectedMessage) return;
    setIsSending(true);

    try {
      // Simulate sending email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update status to replied
      await fetch(`/api/admin/messages/${selectedMessage.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "replied" })
      });
      
      setReplyText("");
      setSelectedMessage(null);
      fetchMessages();
      alert("Reply sent successfully!");
    } catch (error) {
      console.error("Failed to send reply:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Delete this message?")) return;

    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE"
      });
      fetchMessages();
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.subject.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-widest italic">
            Inbound <span className="text-primary font-light not-italic">Messages</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage and respond to client inquiries and contact form submissions.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
        {/* Messages List */}
        <div className={`w-full lg:w-1/3 flex flex-col gap-4 ${selectedMessage ? 'hidden lg:flex' : 'flex'}`}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex-1 overflow-y-auto max-h-[600px] custom-scrollbar">
            {loading ? (
              <div className="p-8 text-center space-y-4">
                 {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse"></div>)}
              </div>
            ) : filteredMessages.length > 0 ? (
              <div className="divide-y divide-white/5">
                {filteredMessages.map((msg) => (
                  <div 
                    key={msg.id}
                    onClick={() => handleOpenMessage(msg)}
                    className={`p-4 cursor-pointer transition-all hover:bg-white/[0.08] relative group ${selectedMessage?.id === msg.id ? 'bg-white/[0.1] border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p className={`text-sm font-bold truncate ${msg.status === 'new' ? 'text-primary' : 'text-white'}`}>
                        {msg.name}
                      </p>
                      <span className="text-[10px] text-gray-500 whitespace-nowrap ml-2">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-white font-medium truncate mb-1">{msg.subject}</p>
                    <p className="text-[10px] text-gray-500 line-clamp-1">{msg.message}</p>
                    
                    {msg.status === 'new' && (
                      <div className="absolute top-4 right-12 w-2 h-2 bg-primary rounded-full"></div>
                    )}
                    
                    <button 
                      onClick={(e) => handleDelete(msg.id, e)}
                      className="absolute bottom-4 right-4 p-2 text-gray-600 hover:text-red-500 lg:opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <Inbox className="mx-auto h-12 w-12 text-gray-700 mb-4" />
                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">No messages found</p>
              </div>
            )}
          </div>
        </div>

        {/* Message Detail / Reply */}
        <div className={`flex-1 ${!selectedMessage ? 'hidden lg:block' : 'block'}`}>
          <AnimatePresence mode="wait">
            {selectedMessage ? (
              <motion.div 
                key={selectedMessage.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 h-full flex flex-col"
              >
                <div className="lg:hidden mb-6">
                   <button 
                    onClick={() => setSelectedMessage(null)}
                    className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2"
                   >
                     ← Back to Inbox
                   </button>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start justify-between mb-8 pb-6 border-b border-white/5 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                      <User size={24} className="text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg md:text-xl font-bold text-white truncate">{selectedMessage.name}</h2>
                      <p className="text-xs md:text-sm text-primary/70 truncate">{selectedMessage.email}</p>
                    </div>
                  </div>
                  <div className="sm:text-right w-full sm:w-auto">
                    <div className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 inline-block ${
                      selectedMessage.status === 'replied' ? 'bg-green-500/20 text-green-500' : 'bg-primary/20 text-primary'
                    }`}>
                      {selectedMessage.status}
                    </div>
                    <p className="text-[10px] md:text-xs text-gray-500 flex items-center gap-2 sm:justify-end">
                      <Clock size={12} /> {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mb-8 flex-1">
                  <h3 className="text-lg font-bold text-white mb-4 italic">"{selectedMessage.subject}"</h3>
                  <div className="bg-black/40 rounded-2xl p-6 border border-white/5 text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                {/* Reply Form */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                    <Reply size={14} /> Send Reply
                  </div>
                  <textarea 
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your response here..."
                    className="w-full bg-black/60 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-primary transition-all resize-none min-h-[150px]"
                  />
                  <div className="flex justify-end gap-4">
                    <button 
                      onClick={() => setSelectedMessage(null)}
                      className="px-6 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-all uppercase tracking-widest text-[10px]"
                    >
                      Close
                    </button>
                    <button 
                      onClick={handleSendReply}
                      disabled={isSending || !replyText}
                      className="px-8 py-3 bg-primary text-black font-bold rounded-xl hover:bg-white disabled:opacity-50 transition-all transform active:scale-95 shadow-lg shadow-primary/20 uppercase tracking-widest text-[10px] flex items-center gap-2"
                    >
                      {isSending ? (
                        <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Send size={14} strokeWidth={3} />
                      )}
                      Send Response
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full bg-white/5 border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center p-12">
                <div className="h-20 w-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6">
                  <MessageSquare size={40} className="text-gray-700" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">No Message Selected</h2>
                <p className="text-gray-500 max-w-xs mx-auto text-sm">Select a message from the list to view its contents and respond to the sender.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
