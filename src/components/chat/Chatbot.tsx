import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const quickReplies = [
  'Request a Quote',
  'Our Services',
  'Contact Info',
  'Business Hours',
];

const botResponses: Record<string, string> = {
  'request a quote': 'Thank you for your interest! Please call us at +255 788 222 899 or visit our Contact page to request a personalized security quote. Our team will assess your needs and provide a tailored solution.',
  'our services': 'We offer comprehensive security services including: Armed & Unarmed Guards, CCTV & Alarm Systems, VIP Protection, Armed Response, Training & Consulting, and Lie Detector Tests. Visit our Services page for more details!',
  'contact info': 'You can reach us at:\n📞 +255 788 222 899 (DSM)\n📧 info@mkwawasecurity.co.tz\n📍 EAGT Building, Nyerere Rd, Dar es Salaam',
  'business hours': 'Our security operations run 24/7, 365 days a year! Our office is open Monday-Friday 8:00 AM - 5:00 PM, Saturday 8:00 AM - 1:00 PM.',
  'default': 'Thank you for your message! For immediate assistance, please call us at +255 788 222 899. Our team is available 24/7 to help with your security needs.',
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! Welcome to Mkwawa Security. How can I assist you today?',
      isBot: true,
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let response = botResponses.default;
      
      for (const key of Object.keys(botResponses)) {
        if (lowerText.includes(key)) {
          response = botResponses[key];
          break;
        }
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        isBot: true,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-accent text-accent-foreground shadow-gold flex items-center justify-center ${
          isOpen ? 'hidden' : ''
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <MessageCircle className="w-7 h-7" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-card rounded-2xl shadow-2xl overflow-hidden border border-border"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <Shield className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-heading font-bold">Mkwawa Security</h4>
                  <p className="text-xs text-primary-foreground/70">Online | 24/7 Support</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-primary-foreground/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-muted/30">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-card text-card-foreground rounded-bl-md'
                        : 'bg-primary text-primary-foreground rounded-br-md'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Replies */}
            <div className="p-3 bg-card border-t border-border flex gap-2 overflow-x-auto">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleSend(reply)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-card border-t border-border flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
                placeholder="Type a message..."
                className="flex-grow"
              />
              <Button
                onClick={() => handleSend(inputValue)}
                size="icon"
                className="bg-accent text-accent-foreground hover:bg-gold-dark"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
