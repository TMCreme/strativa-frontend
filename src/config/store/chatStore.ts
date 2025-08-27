import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { websocketService, ChatMessage, Conversation } from '@/shared/services/websocketService';

interface ChatState {
  // State
  conversations: Conversation[];
  selectedConversationId: string | null;
  messages: Record<string, ChatMessage[]>;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  typingUsers: Record<string, Set<string>>;

  // Actions
  initializeChat: (userId: string, token?: string) => void;
  selectConversation: (conversationId: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
  addMessage: (message: ChatMessage) => void;
  updateConversation: (conversation: Conversation) => void;
  setConnectionStatus: (connected: boolean) => void;
  setTypingUser: (conversationId: string, userId: string, isTyping: boolean) => void;
  markMessageAsRead: (conversationId: string, messageId: string) => void;
  loadConversations: (conversations: Conversation[]) => void;
  loadMessages: (conversationId: string, messages: ChatMessage[]) => void;
  clearError: () => void;
  disconnect: () => void;
}

export const useChatStore = create<ChatState>()(
  devtools(
    (set, get) => ({
      // Initial state
      conversations: [],
      selectedConversationId: null,
      messages: {},
      isConnected: false,
      isLoading: false,
      error: null,
      typingUsers: {},

      // Initialize chat and WebSocket connection
      initializeChat: (userId: string, token?: string) => {
        set({ isLoading: true, error: null });

        try {
          // Connect to WebSocket
          websocketService.connect(userId, token);

          // Set up event listeners
          websocketService.onConnectionChange((connected) => {
            get().setConnectionStatus(connected);
          });

          websocketService.onMessage((message) => {
            get().addMessage(message);
          });

          websocketService.onConversationUpdate((conversation) => {
            get().updateConversation(conversation);
          });

          websocketService.onTyping((data) => {
            get().setTypingUser(data.conversationId, data.userId, data.isTyping);
          });

          set({ isLoading: false });
        } catch (error: any) {
          set({ 
            isLoading: false, 
            error: error.message || 'Failed to initialize chat' 
          });
        }
      },

      // Select conversation
      selectConversation: (conversationId: string) => {
        const { selectedConversationId } = get();
        
        // Leave previous conversation
        if (selectedConversationId) {
          websocketService.leaveConversation(selectedConversationId);
        }

        // Join new conversation
        websocketService.joinConversation(conversationId);
        
        set({ selectedConversationId: conversationId });
      },

      // Send message
      sendMessage: (conversationId: string, text: string) => {
        const success = websocketService.sendMessage(conversationId, text);
        
        if (!success) {
          set({ error: 'Failed to send message. Please check your connection.' });
        }
      },

      // Add message to state
      addMessage: (message: ChatMessage) => {
        set((state) => {
          const currentMessages = state.messages[message.conversationId] || [];
          const updatedMessages = [...currentMessages, message];

          // Update conversation's last message
          const updatedConversations = state.conversations.map(conv => {
            if (conv.id === message.conversationId) {
              return {
                ...conv,
                lastMessage: message.text,
                timestamp: message.timestamp,
                unreadCount: conv.unreadCount + (message.sender === 'other' ? 1 : 0)
              };
            }
            return conv;
          });

          return {
            messages: {
              ...state.messages,
              [message.conversationId]: updatedMessages
            },
            conversations: updatedConversations
          };
        });
      },

      // Update conversation
      updateConversation: (conversation: Conversation) => {
        set((state) => {
          const existingIndex = state.conversations.findIndex(c => c.id === conversation.id);
          
          if (existingIndex >= 0) {
            // Update existing conversation
            const updatedConversations = [...state.conversations];
            updatedConversations[existingIndex] = conversation;
            return { conversations: updatedConversations };
          } else {
            // Add new conversation
            return { 
              conversations: [...state.conversations, conversation] 
            };
          }
        });
      },

      // Set connection status
      setConnectionStatus: (connected: boolean) => {
        set({ isConnected: connected });
      },

      // Set typing user
      setTypingUser: (conversationId: string, userId: string, isTyping: boolean) => {
        set((state) => {
          const currentTypingUsers = state.typingUsers[conversationId] || new Set();
          const updatedTypingUsers = new Set(currentTypingUsers);

          if (isTyping) {
            updatedTypingUsers.add(userId);
          } else {
            updatedTypingUsers.delete(userId);
          }

          return {
            typingUsers: {
              ...state.typingUsers,
              [conversationId]: updatedTypingUsers
            }
          };
        });
      },

      // Mark message as read
      markMessageAsRead: (conversationId: string, messageId: string) => {
        websocketService.markAsRead(conversationId, messageId);
        
        set((state) => {
          const updatedConversations = state.conversations.map(conv => {
            if (conv.id === conversationId) {
              return {
                ...conv,
                unreadCount: Math.max(0, conv.unreadCount - 1)
              };
            }
            return conv;
          });

          return { conversations: updatedConversations };
        });
      },

      // Load conversations
      loadConversations: (conversations: Conversation[]) => {
        set({ conversations });
      },

      // Load messages for a conversation
      loadMessages: (conversationId: string, messages: ChatMessage[]) => {
        set((state) => ({
          messages: {
            ...state.messages,
            [conversationId]: messages
          }
        }));
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Disconnect
      disconnect: () => {
        websocketService.disconnect();
        set({
          conversations: [],
          selectedConversationId: null,
          messages: {},
          isConnected: false,
          typingUsers: {}
        });
      }
    }),
    {
      name: 'strativa-chat-store',
    }
  )
);
