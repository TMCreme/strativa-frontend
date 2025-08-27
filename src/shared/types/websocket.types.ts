import { DateString, UUID } from './common.types';

// WebSocket connection types
export interface WebSocketConnection {
  id: string;
  userId: UUID;
  status: ConnectionStatus;
  connectedAt: DateString;
  lastActivityAt: DateString;
  metadata: ConnectionMetadata;
}

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'reconnecting' | 'error';

export interface ConnectionMetadata {
  userAgent: string;
  ipAddress?: string;
  location?: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  os: string;
  version: string;
}

// Chat message types
export interface ChatMessage {
  id: UUID;
  conversationId: UUID;
  senderId: UUID;
  senderName: string;
  senderAvatar?: string;
  text: string;
  type: MessageType;
  status: MessageStatus;
  timestamp: DateString;
  editedAt?: DateString;
  deletedAt?: DateString;
  metadata: MessageMetadata;
  reactions: MessageReaction[];
  attachments: MessageAttachment[];
  mentions: UUID[];
  replyTo?: UUID;
}

export type MessageType = 'text' | 'image' | 'file' | 'audio' | 'video' | 'location' | 'system';

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

export interface MessageMetadata {
  isEdited: boolean;
  isDeleted: boolean;
  isForwarded: boolean;
  originalMessageId?: UUID;
  forwardedFrom?: UUID;
  clientMessageId?: string;
  serverMessageId?: string;
}

export interface MessageReaction {
  id: UUID;
  userId: UUID;
  userName: string;
  emoji: string;
  timestamp: DateString;
}

export interface MessageAttachment {
  id: UUID;
  name: string;
  type: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  duration?: number; // for audio/video
  dimensions?: {
    width: number;
    height: number;
  };
}

// Conversation types
export interface Conversation {
  id: UUID;
  name: string;
  type: ConversationType;
  participants: ConversationParticipant[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  isArchived: boolean;
  isMuted: boolean;
  isPinned: boolean;
  createdAt: DateString;
  updatedAt: DateString;
  metadata: ConversationMetadata;
}

export type ConversationType = 'direct' | 'group' | 'channel' | 'bot';

export interface ConversationParticipant {
  id: UUID;
  name: string;
  avatar?: string;
  role: ParticipantRole;
  joinedAt: DateString;
  lastSeenAt?: DateString;
  isOnline: boolean;
  isTyping: boolean;
  permissions: ParticipantPermissions;
}

export type ParticipantRole = 'owner' | 'admin' | 'member' | 'guest';

export interface ParticipantPermissions {
  canSendMessages: boolean;
  canEditMessages: boolean;
  canDeleteMessages: boolean;
  canAddParticipants: boolean;
  canRemoveParticipants: boolean;
  canChangeSettings: boolean;
  canPinMessages: boolean;
  canMuteParticipants: boolean;
}

export interface ConversationMetadata {
  description?: string;
  avatar?: string;
  topic?: string;
  settings: ConversationSettings;
  pinnedMessages: UUID[];
  customFields: Record<string, any>;
}

export interface ConversationSettings {
  allowInvites: boolean;
  requireApproval: boolean;
  maxParticipants: number;
  messageRetention: number; // days
  slowMode: boolean;
  slowModeInterval: number; // seconds
}

// Typing indicator types
export interface TypingIndicator {
  conversationId: UUID;
  userId: UUID;
  userName: string;
  isTyping: boolean;
  timestamp: DateString;
}

// WebSocket event types
export interface WebSocketEvent {
  type: string;
  data: any;
  timestamp: DateString;
  id?: string;
}

// Client to Server events
export interface ClientToServerEvents {
  // Authentication
  authenticate: (data: AuthenticateData) => void;
  
  // Connection management
  ping: () => void;
  disconnect: () => void;
  
  // Conversation management
  join_conversation: (data: JoinConversationData) => void;
  leave_conversation: (data: LeaveConversationData) => void;
  create_conversation: (data: CreateConversationData) => void;
  update_conversation: (data: UpdateConversationData) => void;
  delete_conversation: (data: DeleteConversationData) => void;
  
  // Message management
  send_message: (data: SendMessageData) => void;
  edit_message: (data: EditMessageData) => void;
  delete_message: (data: DeleteMessageData) => void;
  mark_as_read: (data: MarkAsReadData) => void;
  
  // Typing indicators
  typing: (data: TypingData) => void;
  
  // Reactions
  add_reaction: (data: AddReactionData) => void;
  remove_reaction: (data: RemoveReactionData) => void;
  
  // File upload
  upload_file: (data: UploadFileData) => void;
  
  // Presence
  update_presence: (data: UpdatePresenceData) => void;
  
  // Custom events
  custom_event: (data: CustomEventData) => void;
}

// Server to Client events
export interface ServerToClientEvents {
  // Connection management
  connected: (data: ConnectedData) => void;
  disconnected: (data: DisconnectedData) => void;
  error: (data: ErrorData) => void;
  pong: () => void;
  
  // Authentication
  authenticated: (data: AuthenticatedData) => void;
  authentication_failed: (data: AuthenticationFailedData) => void;
  
  // Conversation events
  conversation_created: (data: ConversationCreatedData) => void;
  conversation_updated: (data: ConversationUpdatedData) => void;
  conversation_deleted: (data: ConversationDeletedData) => void;
  conversation_joined: (data: ConversationJoinedData) => void;
  conversation_left: (data: ConversationLeftData) => void;
  participant_joined: (data: ParticipantJoinedData) => void;
  participant_left: (data: ParticipantLeftData) => void;
  participant_updated: (data: ParticipantUpdatedData) => void;
  
  // Message events
  message_received: (data: MessageReceivedData) => void;
  message_updated: (data: MessageUpdatedData) => void;
  message_deleted: (data: MessageDeletedData) => void;
  message_delivered: (data: MessageDeliveredData) => void;
  message_read: (data: MessageReadData) => void;
  
  // Typing events
  typing_started: (data: TypingStartedData) => void;
  typing_stopped: (data: TypingStoppedData) => void;
  
  // Reaction events
  reaction_added: (data: ReactionAddedData) => void;
  reaction_removed: (data: ReactionRemovedData) => void;
  
  // File events
  file_uploaded: (data: FileUploadedData) => void;
  file_upload_failed: (data: FileUploadFailedData) => void;
  
  // Presence events
  presence_updated: (data: PresenceUpdatedData) => void;
  user_online: (data: UserOnlineData) => void;
  user_offline: (data: UserOfflineData) => void;
  
  // System events
  system_message: (data: SystemMessageData) => void;
  notification: (data: NotificationData) => void;
  
  // Custom events
  custom_event: (data: CustomEventData) => void;
}

// Event data interfaces
export interface AuthenticateData {
  token: string;
  userId: UUID;
}

export interface JoinConversationData {
  conversationId: UUID;
}

export interface LeaveConversationData {
  conversationId: UUID;
}

export interface CreateConversationData {
  name: string;
  type: ConversationType;
  participants: UUID[];
  metadata?: Partial<ConversationMetadata>;
}

export interface UpdateConversationData {
  conversationId: UUID;
  updates: Partial<Conversation>;
}

export interface DeleteConversationData {
  conversationId: UUID;
}

export interface SendMessageData {
  conversationId: UUID;
  text: string;
  type?: MessageType;
  replyTo?: UUID;
  mentions?: UUID[];
  attachments?: Partial<MessageAttachment>[];
  clientMessageId?: string;
}

export interface EditMessageData {
  messageId: UUID;
  text: string;
}

export interface DeleteMessageData {
  messageId: UUID;
}

export interface MarkAsReadData {
  conversationId: UUID;
  messageId?: UUID;
}

export interface TypingData {
  conversationId: UUID;
  isTyping: boolean;
}

export interface AddReactionData {
  messageId: UUID;
  emoji: string;
}

export interface RemoveReactionData {
  messageId: UUID;
  emoji: string;
}

export interface UploadFileData {
  conversationId: UUID;
  file: File;
  onProgress?: (progress: number) => void;
}

export interface UpdatePresenceData {
  status: 'online' | 'away' | 'busy' | 'offline';
  customStatus?: string;
}

export interface CustomEventData {
  event: string;
  data: any;
}

// Response data interfaces
export interface ConnectedData {
  connectionId: string;
  userId: UUID;
  serverTime: DateString;
}

export interface DisconnectedData {
  reason: string;
  code?: number;
}

export interface ErrorData {
  code: string;
  message: string;
  details?: any;
}

export interface AuthenticatedData {
  user: {
    id: UUID;
    name: string;
    avatar?: string;
  };
  permissions: string[];
}

export interface AuthenticationFailedData {
  reason: string;
  code: string;
}

export interface ConversationCreatedData {
  conversation: Conversation;
}

export interface ConversationUpdatedData {
  conversation: Conversation;
  changes: Partial<Conversation>;
}

export interface ConversationDeletedData {
  conversationId: UUID;
}

export interface ConversationJoinedData {
  conversation: Conversation;
}

export interface ConversationLeftData {
  conversationId: UUID;
}

export interface ParticipantJoinedData {
  conversationId: UUID;
  participant: ConversationParticipant;
}

export interface ParticipantLeftData {
  conversationId: UUID;
  participantId: UUID;
}

export interface ParticipantUpdatedData {
  conversationId: UUID;
  participant: ConversationParticipant;
}

export interface MessageReceivedData {
  message: ChatMessage;
}

export interface MessageUpdatedData {
  message: ChatMessage;
}

export interface MessageDeletedData {
  messageId: UUID;
  conversationId: UUID;
}

export interface MessageDeliveredData {
  messageId: UUID;
  conversationId: UUID;
  deliveredAt: DateString;
}

export interface MessageReadData {
  messageId: UUID;
  conversationId: UUID;
  readAt: DateString;
  readBy: UUID;
}

export interface TypingStartedData {
  conversationId: UUID;
  user: {
    id: UUID;
    name: string;
  };
}

export interface TypingStoppedData {
  conversationId: UUID;
  userId: UUID;
}

export interface ReactionAddedData {
  messageId: UUID;
  reaction: MessageReaction;
}

export interface ReactionRemovedData {
  messageId: UUID;
  reactionId: UUID;
}

export interface FileUploadedData {
  messageId: UUID;
  attachment: MessageAttachment;
}

export interface FileUploadFailedData {
  error: string;
  fileId: string;
}

export interface PresenceUpdatedData {
  userId: UUID;
  status: 'online' | 'away' | 'busy' | 'offline';
  customStatus?: string;
  lastSeenAt?: DateString;
}

export interface UserOnlineData {
  userId: UUID;
  user: {
    id: UUID;
    name: string;
    avatar?: string;
  };
}

export interface UserOfflineData {
  userId: UUID;
  lastSeenAt: DateString;
}

export interface SystemMessageData {
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  conversationId?: UUID;
}

export interface NotificationData {
  type: 'message' | 'mention' | 'reaction' | 'system';
  title: string;
  message: string;
  data?: any;
}

// WebSocket service types
export interface WebSocketServiceConfig {
  url: string;
  options?: {
    timeout?: number;
    reconnection?: boolean;
    reconnectionAttempts?: number;
    reconnectionDelay?: number;
    reconnectionDelayMax?: number;
    maxReconnectionAttempts?: number;
    autoConnect?: boolean;
    query?: Record<string, any>;
    extraHeaders?: Record<string, string>;
    transports?: string[];
    upgrade?: boolean;
    rememberUpgrade?: boolean;
    secure?: boolean;
    rejectUnauthorized?: boolean;
    perMessageDeflate?: boolean | object;
    forceBase64?: boolean;
    timestampRequests?: boolean;
    timestampParam?: string;
    policyPort?: number;
    pfx?: string | Buffer;
    key?: string | Buffer;
    passphrase?: string;
    cert?: string | Buffer;
    ca?: string | Buffer | string[] | Buffer[];
    ciphers?: string | string[];
    agent?: any;
    forceNew?: boolean;
    localAddress?: string;
    protocol?: string | string[];
    protocols?: string | string[];
  };
}

export interface WebSocketService {
  connect: (userId: UUID, token: string) => void;
  disconnect: () => void;
  isConnected: () => boolean;
  emit: <T extends keyof ClientToServerEvents>(event: T, data: Parameters<ClientToServerEvents[T]>[0]) => void;
  on: <T extends keyof ServerToClientEvents>(event: T, callback: ServerToClientEvents[T]) => void;
  off: <T extends keyof ServerToClientEvents>(event: T, callback?: ServerToClientEvents[T]) => void;
  once: <T extends keyof ServerToClientEvents>(event: T, callback: ServerToClientEvents[T]) => void;
}

// Chat state types
export interface ChatState {
  conversations: Conversation[];
  messages: Record<UUID, ChatMessage[]>;
  selectedConversationId: UUID | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  typingUsers: Record<UUID, Set<UUID>>;
  unreadCounts: Record<UUID, number>;
  onlineUsers: Set<UUID>;
}

// Chat actions types
export interface ChatActions {
  connect: (userId: UUID, token: string) => void;
  disconnect: () => void;
  selectConversation: (conversationId: UUID) => void;
  sendMessage: (conversationId: UUID, text: string, options?: Partial<SendMessageData>) => void;
  editMessage: (messageId: UUID, text: string) => void;
  deleteMessage: (messageId: UUID) => void;
  markAsRead: (conversationId: UUID, messageId?: UUID) => void;
  addReaction: (messageId: UUID, emoji: string) => void;
  removeReaction: (messageId: UUID, emoji: string) => void;
  startTyping: (conversationId: UUID) => void;
  stopTyping: (conversationId: UUID) => void;
  uploadFile: (conversationId: UUID, file: File) => void;
  createConversation: (data: CreateConversationData) => void;
  updateConversation: (conversationId: UUID, updates: Partial<Conversation>) => void;
  deleteConversation: (conversationId: UUID) => void;
  joinConversation: (conversationId: UUID) => void;
  leaveConversation: (conversationId: UUID) => void;
  setLoading: (loading: boolean) => void;
  clearError: () => void;
}

// Chat hook types
export interface UseChatReturn extends ChatState, ChatActions {
  // Additional chat-specific methods
  getConversationById: (id: UUID) => Conversation | undefined;
  getMessagesByConversationId: (conversationId: UUID) => ChatMessage[];
  getUnreadCount: (conversationId: UUID) => number;
  isUserTyping: (conversationId: UUID, userId: UUID) => boolean;
  isUserOnline: (userId: UUID) => boolean;
  getOnlineUsers: () => UUID[];
  getTypingUsers: (conversationId: UUID) => UUID[];
  formatMessageTime: (timestamp: DateString) => string;
  canSendMessage: (conversationId: UUID) => boolean;
  canEditMessage: (message: ChatMessage) => boolean;
  canDeleteMessage: (message: ChatMessage) => boolean;
  canReactToMessage: (message: ChatMessage) => boolean;
}
