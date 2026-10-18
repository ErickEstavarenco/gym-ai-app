import { motion } from 'framer-motion';
import {
  PageShell,
  ToolbarHeader,
  PersonalTrainerAvatar,
} from '../components/ui';
import ChatPanel from '../components/chat/ChatPanel';
import { fadeUp } from '../lib/motion';
import { useCoachChat } from '../hooks/useCoachChat';

/**
 * Rota /chat — usa o mesmo hook compartilhado (`useCoachChat`) que o FAB
 * ChatBot. Não tem mais mock local nem pipeline paralelo.
 */
const Chat = () => {
  const { messages, isTyping, send, clickSuggestion } = useCoachChat();

  return (
    <PageShell hideNav className="!pb-0">
      {/* Header */}
      <ToolbarHeader
        backTo="/"
        title="Personal Trainer AI"
        subtitle={
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-gym-success rounded-full animate-pulse-dot" />
            Online agora
          </span>
        }
        rightSlot={<PersonalTrainerAvatar size="md" animated />}
      />

      {/* ChatPanel fills the remaining viewport */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex flex-col h-[calc(100vh-9rem)]"
      >
        <ChatPanel
          messages={messages}
          onSend={send}
          loading={isTyping}
          onSuggestionClick={clickSuggestion}
        />
      </motion.div>
    </PageShell>
  );
};

export default Chat;
