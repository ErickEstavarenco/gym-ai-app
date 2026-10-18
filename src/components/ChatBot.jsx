import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import ChatPanel from './chat/ChatPanel';
import { PersonalTrainerAvatar } from './ui';
import { useCoachChat } from '../hooks/useCoachChat';

/**
 * Floating chat widget opened from the Home FAB.
 * Uses the shared useCoachChat hook — same pipeline as /chat route.
 */
const ChatBot = ({ isOpen, onClose }) => {
  const { messages, isTyping, send, clickSuggestion } = useCoachChat();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        className="fixed bottom-24 right-4 left-4 md:left-auto md:w-96 z-50 h-[70vh] max-h-[640px] flex flex-col rounded-hero glass-strong border border-gym-line shadow-card-elevated overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-gym-accent to-gym-accent-hover p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <PersonalTrainerAvatar size="md" animated />
            <div>
              <h3 className="font-bold text-white text-base">Personal Trainer AI</h3>
              <p className="text-xs text-white/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-gym-success rounded-full animate-pulse-dot" />
                Pronto para treinar
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            aria-label="Fechar chat"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Body (uses shared ChatPanel) */}
        <div className="flex-1 min-h-0 bg-gym-bg">
          <ChatPanel
            messages={messages}
            onSend={send}
            loading={isTyping}
            onSuggestionClick={clickSuggestion}
            inputPlaceholder="Pergunte algo..."
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatBot;