import { useState, useEffect, useCallback, useRef } from 'react';
import { useChatStore } from '@/config/store/chatStore';
import { websocketService } from '@/shared/services/websocketService';

export const useChat = (userId: string, token?: string) => {
  const {
    conversations,
    selectedConversationId,
    messages,
    isConnected,
    isLoading,
    error,
    typingUsers,
    initializeChat,
    selectConversation,
    sendMessage,
    loadConversations,
    loadMessages,
    clearError,
    disconnect
  } = useChatStore();

  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize chat on mount
  useEffect(() => {
    if (userId) {
      initializeChat(userId, token);
    }

    // Cleanup on unmount
    return () => {
      disconnect();
    };
  }, [userId, token, initializeChat, disconnect]);

  // Get selected conversation
  const selectedConversation = conversations.find(
    conv => conv.id === selectedConversationId
  );

  // Get messages for selected conversation
  const currentMessages = selectedConversationId 
    ? messages[selectedConversationId] || []
    : [];

  // Get typing users for selected conversation
  const currentTypingUsers = selectedConversationId
    ? Array.from(typingUsers[selectedConversationId] || [])
    : [];

  // Handle conversation selection
  const handleSelectConversation = useCallback((conversationId: string) => {
    selectConversation(conversationId);
  }, [selectConversation]);

  // Handle message input change with typing indicator
  const handleMessageInputChange = useCallback((value: string) => {
    setMessageInput(value);

    // Send typing indicator
    if (selectedConversationId) {
      if (!isTyping) {
        setIsTyping(true);
        websocketService.sendTyping(selectedConversationId, true);
      }

      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Set timeout to stop typing indicator
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        websocketService.sendTyping(selectedConversationId, false);
      }, 1000);
    }
  }, [selectedConversationId, isTyping]);

  // Handle send message
  const handleSendMessage = useCallback(() => {
    if (messageInput.trim() && selectedConversationId) {
      sendMessage(selectedConversationId, messageInput.trim());
      setMessageInput('');
      
      // Stop typing indicator
      setIsTyping(false);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      websocketService.sendTyping(selectedConversationId, false);
    }
  }, [messageInput, selectedConversationId, sendMessage]);

  // Handle key press (Enter to send)
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Load initial data (you would typically fetch this from your API)
  const loadInitialData = useCallback(async () => {
    try {
      // Example: Load conversations from API
      // const conversationsData = await chatApi.getConversations();
      // loadConversations(conversationsData);

      // Example: Load messages for selected conversation
      // if (selectedConversationId) {
      //   const messagesData = await chatApi.getMessages(selectedConversationId);
      //   loadMessages(selectedConversationId, messagesData);
      // }
    } catch (error) {
      console.error('Failed to load initial chat data:', error);
    }
  }, [loadConversations, loadMessages, selectedConversationId]);

  // Load initial data on mount
  useEffect(() => {
    if (isConnected) {
      loadInitialData();
    }
  }, [isConnected, loadInitialData]);

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return {
    // State
    conversations,
    selectedConversation,
    currentMessages,
    currentTypingUsers,
    messageInput,
    isConnected,
    isLoading,
    error,
    isTyping,

    // Actions
    handleSelectConversation,
    handleMessageInputChange,
    handleSendMessage,
    handleKeyPress,
    clearError,
    setMessageInput
  };
};
