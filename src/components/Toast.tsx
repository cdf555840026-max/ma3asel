import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#1E2022] text-[#FAF9F6] rounded-md shadow-xl border border-[#3A3833] text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <CheckCircle2 className="w-4 h-4 text-[#D8B26E] shrink-0" />
      <span>{message}</span>
    </div>
  );
};
