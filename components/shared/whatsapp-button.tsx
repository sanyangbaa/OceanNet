"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { companyInfo } from "@/data/company";
import { X, Send } from "lucide-react";

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappNumber = companyInfo.contacts.whatsapp.replace(/[^\d+]/g, "");
  const message = encodeURIComponent(
    "Hello! I am contacting you from your website. I would like to make an inquiry.",
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
        >
          {/* WhatsApp Chat Modal */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="mb-4 w-[calc(100vw-32px)] sm:w-[350px] overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100 flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between bg-[#075E54] px-4 py-3 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white font-bold">
                        {companyInfo.shortName}
                      </div>
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#075E54] bg-green-400"></span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">
                        {companyInfo.name}
                      </h3>
                      <p className="text-xs text-green-100">
                        Typically replies instantly
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={toggleModal}
                    className="rounded-full p-1 hover:bg-white/10 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Chat Body */}
                <div className="relative h-[200px] bg-[#E5DDD5] p-4 flex flex-col justify-center">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative max-w-[85%] rounded-r-xl rounded-bl-xl bg-white p-3 text-sm text-gray-800 shadow-sm"
                  >
                    <p className="mb-1 font-semibold text-gray-500 text-xs">
                      {companyInfo.shortName} Support
                    </p>
                    <p>Hi there! 👋</p>
                    <p className="mt-1">How can we help you today?</p>
                    <p className="mt-2 text-right text-[10px] text-gray-400">
                      Just now
                    </p>
                  </motion.div>
                </div>

                {/* Footer */}
                <div className="bg-white p-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center space-x-2 rounded-full bg-[#25D366] py-3 font-semibold text-white transition-transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
                  >
                    <Send className="h-4 w-4" />
                    <span>Start Chat</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <button
            onClick={toggleModal}
            className={`group relative flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-[#25D366]/50 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50 ${isOpen ? "rotate-180 scale-90 bg-gray-800 shadow-gray-800/40 hover:shadow-gray-800/50" : ""}`}
            aria-label={isOpen ? "Close WhatsApp Chat" : "Open WhatsApp Chat"}
          >
            {isOpen ? (
              <X className="h-6 w-6 md:h-8 md:w-8 transition-transform group-hover:scale-110" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="h-6 w-6 md:h-8 md:w-8 transition-transform group-hover:scale-110"
              >
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
              </svg>
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
