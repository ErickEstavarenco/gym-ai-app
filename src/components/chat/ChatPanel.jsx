import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User as UserIcon, Loader2, Sparkles } from 'lucide-react';
import { chatBubble, fadeUp, staggerParent } from '../../lib/motion';
import Badge from '../ui/Badge';
import { PersonalTrainerAvatar } from '../ui';
import { resolveSuggestionIcon } from '../../services/coachLogic';

const RenderContent = ({ content }) => {
  if (!content) return null;
  return (
    <div className="space-y-1">
      {content.split('\n').map((line, i) => {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        const rendered = parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j} className="font-bold text-white">{part}</strong> : part
        );
        return <p key={i} className={`leading-relaxed ${line.trim().startsWith('•') ? 'pl-2' : ''}`}>{rendered}</p>;
      })}
    </div>
  );
};

const ChatPanel = ({ messages, onSend, loading = false, onSuggestionClick, inputPlaceholder = 'Digite sua mensagem...', showSuggestions = true }) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    const value = inputValue.trim();
    if (!value || loading) return;
    onSend(value);
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleChipClick = (suggestion) => {
    onSuggestionClick?.(suggestion.action || suggestion.label, suggestion.kind || 'text', suggestion);
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <motion.div variants={staggerParent(0.04)} initial="hidden" animate="show" className="flex-1 overflow-y-auto px-4 py-4 space-y-5 scrollbar-thin">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div key={message.id} variants={chatBubble} initial="hidden" animate="show" exit={{ opacity: 0 }} className={`flex gap-2.5 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
              {message.type === 'bot' ? (
                <PersonalTrainerAvatar size="sm" className="flex-shrink-0 mt-0.5" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gym-surface-elevated border border-gym-line flex items-center justify-center flex-shrink-0 mt-0.5">
                  <UserIcon size={14} className="text-gym-text-primary" />
                </div>
              )}
              <div className={`max-w-[80%] space-y-2 ${message.type === 'user' ? 'items-end flex flex-col' : ''}`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${message.type === 'bot' ? 'bg-gym-surface border border-gym-line text-gym-text-primary rounded-tl-sm' : 'bg-gradient-to-br from-gym-accent to-gym-accent-hover text-white shadow-glow-sm rounded-tr-sm'}`}>
                  {message.type === 'bot' ? <RenderContent content={message.content} /> : <p>{message.content}</p>}
                </div>
                {showSuggestions && message.suggestions?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {message.suggestions.map((s, idx) => {
                      const Icon = resolveSuggestionIcon(s.icon);
                      const isRetry = s.action === 'retry';
                      const isAction = s.kind === 'action';
                      return (
                        <motion.button key={s.id || idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} type="button" onClick={() => handleChipClick(s)} disabled={loading}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-xs font-medium transition-all active:scale-95 disabled:opacity-50 ${isRetry ? 'bg-gym-warning/10 border-gym-warning/30 text-gym-warning' : isAction ? 'bg-gym-accent/10 border-gym-accent/40 text-gym-accent' : 'bg-gym-surface border-gym-line text-gym-text-secondary hover:border-gym-accent/50 hover:bg-gym-accent-muted'}`}>
                          <Icon size={11} className={isRetry ? 'text-gym-warning' : 'text-gym-accent'} />
                          <span>{s.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="flex gap-2.5">
            <PersonalTrainerAvatar size="sm" className="flex-shrink-0" />
            <div className="bg-gym-surface border border-gym-line px-4 py-3.5 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
              {[0, 150, 300].map((delay, i) => (
                <span key={i} className="w-2 h-2 bg-gym-accent rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </motion.div>

      <div className="p-4 border-t border-gym-line bg-gym-bg/95 backdrop-blur-xl flex-shrink-0">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input ref={inputRef} type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit()} disabled={loading} placeholder={inputPlaceholder}
            className="flex-1 bg-gym-surface border border-gym-line rounded-2xl pl-4 pr-12 py-3 text-sm text-gym-text-primary placeholder:text-gym-text-muted focus:outline-none focus:border-gym-accent focus:shadow-glow-sm transition-all disabled:opacity-50" />
          <motion.button type="submit" disabled={!inputValue.trim() || loading} whileTap={{ scale: 0.9 }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-gradient-to-br from-gym-accent to-gym-accent-hover text-white flex items-center justify-center shadow-glow-sm hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </motion.button>
        </form>
        <p className="text-[10px] text-gym-text-muted text-center mt-2 flex items-center justify-center gap-1">
          <Sparkles size={9} className="text-gym-accent" />
          Powered by Gym AI • Personal Trainer
        </p>
      </div>
    </div>
  );
};

export default ChatPanel;