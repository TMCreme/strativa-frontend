import { io, Socket } from 'socket.io-client';

export interface ChatMessage {
  id: string;
  conversationId: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
  senderId: string;
  senderName: string;
}

export interface Conversation {
  id: string;
  name: string;
  email: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messages: ChatMessage[];
  participants: string[];
}

class WebSocketService {
  private socket: Socket | null = null;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  // Event callbacks
  private onMessageCallback: ((message: ChatMessage) => void) | null = null;
  private onConversationUpdateCallback: ((conversation: Conversation) => void) | null = null;
  private onConnectionChangeCallback: ((connected: boolean) => void) | null = null;
  private onTypingCallback: ((data: { conversationId: string; userId: string; isTyping: boolean }) => void) | null = null;

  connect(userId: string, token?: string) {
    if (this.socket?.connected) {
      return;
    }

    // Connect to WebSocket server
    this.socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:3001', {
      auth: {
        token,
        userId
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    // Connection events
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.onConnectionChangeCallback?.(true);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Disconnected from WebSocket server:', reason);
      this.isConnected = false;
      this.onConnectionChangeCallback?.(false);
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.reconnectAttempts++;
      
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('Max reconnection attempts reached');
      }
    });

    // Chat events
    this.socket.on('message', (message: ChatMessage) => {
      console.log('Received message:', message);
      this.onMessageCallback?.(message);
    });

    this.socket.on('conversation_update', (conversation: Conversation) => {
      console.log('Conversation updated:', conversation);
      this.onConversationUpdateCallback?.(conversation);
    });

    this.socket.on('typing', (data: { conversationId: string; userId: string; isTyping: boolean }) => {
      console.log('Typing event:', data);
      this.onTypingCallback?.(data);
    });

    this.socket.on('user_joined', (data: { conversationId: string; userId: string; userName: string }) => {
      console.log('User joined conversation:', data);
    });

    this.socket.on('user_left', (data: { conversationId: string; userId: string; userName: string }) => {
      console.log('User left conversation:', data);
    });
  }

  // Send message
  sendMessage(conversationId: string, text: string) {
    if (!this.socket?.connected) {
      console.error('WebSocket not connected');
      return false;
    }

    this.socket.emit('send_message', {
      conversationId,
      text,
      timestamp: new Date().toISOString()
    });

    return true;
  }

  // Join conversation
  joinConversation(conversationId: string) {
    if (!this.socket?.connected) {
      console.error('WebSocket not connected');
      return false;
    }

    this.socket.emit('join_conversation', { conversationId });
    return true;
  }

  // Leave conversation
  leaveConversation(conversationId: string) {
    if (!this.socket?.connected) {
      console.error('WebSocket not connected');
      return false;
    }

    this.socket.emit('leave_conversation', { conversationId });
    return true;
  }

  // Send typing indicator
  sendTyping(conversationId: string, isTyping: boolean) {
    if (!this.socket?.connected) {
      return false;
    }

    this.socket.emit('typing', { conversationId, isTyping });
    return true;
  }

  // Mark message as read
  markAsRead(conversationId: string, messageId: string) {
    if (!this.socket?.connected) {
      return false;
    }

    this.socket.emit('mark_read', { conversationId, messageId });
    return true;
  }

  // Event listeners
  onMessage(callback: (message: ChatMessage) => void) {
    this.onMessageCallback = callback;
  }

  onConversationUpdate(callback: (conversation: Conversation) => void) {
    this.onConversationUpdateCallback = callback;
  }

  onConnectionChange(callback: (connected: boolean) => void) {
    this.onConnectionChangeCallback = callback;
  }

  onTyping(callback: (data: { conversationId: string; userId: string; isTyping: boolean }) => void) {
    this.onTypingCallback = callback;
  }

  // Utility methods
  isConnectedToServer() {
    return this.isConnected;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }
}

// Create singleton instance
export const websocketService = new WebSocketService();
