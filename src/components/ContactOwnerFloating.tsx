import React from 'react';
import { MessageCircle } from 'lucide-react';

export const ContactOwnerFloating: React.FC = () => {
  return (
    <aside aria-label="Bantuan dan kontak" className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex items-center group">
      <a
        href="https://wa.me/62881022762735"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi Owner via WhatsApp (membuka chat WhatsApp)"
        className="flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-xs shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 active:scale-95 transition-all duration-300"
      >
        <span className="relative flex items-center justify-center">
          <MessageCircle className="w-4 h-4 fill-white" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping" />
        </span>
        <span className="tracking-wide">Hubungi Owner</span>
      </a>
    </aside>
  );
};
