# WebSocket Chat Integration Guide

## 🚀 Overview

This guide explains how to set up and use the real-time chat functionality with WebSocket integration in the Virtual Deal Room.

## 📋 Prerequisites

1. **Node.js** (v16 or higher)
2. **Socket.IO** (already installed)
3. **WebSocket server** (example provided)

## 🔧 Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:3002
```

### 2. Start WebSocket Server

Install Socket.IO server dependencies:

```bash
npm install socket.io
```

Run the WebSocket server:

```bash
node websocket-server-example.js
```

The server will start on port 3002.

### 3. Start Your Next.js App

```bash
npm run dev
```

Your app will run on port 3001.

## 🏗️ Architecture

### Components

1. **WebSocket Service** (`src/shared/services/websocketService.ts`)

   - Handles WebSocket connections
   - Manages event listeners
   - Provides connection utilities

2. **Chat Store** (`src/config/store/chatStore.ts`)

   - Zustand store for chat state
   - Integrates with WebSocket service
   - Manages conversations and messages

3. **Chat Hook** (`src/shared/hooks/useChat.ts`)

   - Custom hook for chat functionality
   - Handles typing indicators
   - Provides easy-to-use interface

4. **Virtual Deal Room Page** (`src/app/investor/virtual-deal-room/page.tsx`)
   - UI components for chat interface
   - Integrates with chat hook
   - Real-time message display

## 🔌 WebSocket Events

### Client → Server

- `authenticate` - User authentication
- `join_conversation` - Join a conversation
- `leave_conversation` - Leave a conversation
- `send_message` - Send a message
- `typing` - Typing indicator
- `mark_read` - Mark message as read

### Server → Client

- `message` - New message received
- `conversation_update` - Conversation updated
- `typing` - User typing indicator
- `user_joined` - User joined conversation
- `user_left` - User left conversation

## 🎯 Usage Examples

### Basic Chat Integration

```tsx
import { useChat } from "@/shared/hooks/useChat";

function ChatComponent() {
  const userId = "user-123"; // Get from auth context
  const {
    conversations,
    selectedConversation,
    currentMessages,
    messageInput,
    isConnected,
    handleSelectConversation,
    handleMessageInputChange,
    handleSendMessage,
    handleKeyPress,
  } = useChat(userId);

  return <div>{/* Chat UI */}</div>;
}
```

### Manual WebSocket Usage

```tsx
import { websocketService } from "@/shared/services/websocketService";

// Connect to WebSocket
websocketService.connect("user-123", "auth-token");

// Send message
websocketService.sendMessage("conversation-id", "Hello!");

// Listen for messages
websocketService.onMessage((message) => {
  console.log("New message:", message);
});
```

## 🔒 Authentication

The WebSocket service supports authentication via tokens:

```tsx
// With authentication token
const { useChat } = useChat(userId, authToken);

// Without token (for testing)
const { useChat } = useChat(userId);
```

## 🚨 Error Handling

The integration includes comprehensive error handling:

- **Connection errors** - Automatic reconnection attempts
- **Message sending failures** - User notifications
- **Authentication errors** - Graceful degradation
- **Network issues** - Connection status indicators

## 🧪 Testing

### Test the Integration

1. Start the WebSocket server
2. Open the Virtual Deal Room page
3. Navigate to "Message & Communication" tab
4. Type a message and press Enter
5. You should see the message appear and receive a simulated response

### Debug Mode

Enable debug logging by checking the browser console for:

- Connection status
- Message events
- Error messages
- WebSocket events

## 🔄 Real-time Features

- **Instant messaging** - Messages appear in real-time
- **Typing indicators** - Shows when users are typing
- **Read receipts** - Track message read status
- **User presence** - See when users join/leave
- **Conversation updates** - Real-time conversation list updates

## 🚀 Production Deployment

### WebSocket Server

For production, deploy the WebSocket server to:

- **Vercel** (with Socket.IO adapter)
- **Railway**
- **Heroku**
- **AWS EC2**

### Environment Variables

Update your production environment:

```bash
NEXT_PUBLIC_WEBSOCKET_URL=wss://your-websocket-server.com
```

### Security

- Implement proper authentication
- Add rate limiting
- Use HTTPS/WSS in production
- Validate message content
- Implement user authorization

## 📚 Additional Resources

- [Socket.IO Documentation](https://socket.io/docs/)
- [Next.js WebSocket Integration](https://nextjs.org/docs/api-routes/api-middlewares)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

## 🐛 Troubleshooting

### Common Issues

1. **Connection Failed**

   - Check WebSocket server is running
   - Verify environment variables
   - Check CORS settings

2. **Messages Not Sending**

   - Verify authentication
   - Check network connectivity
   - Review browser console for errors

3. **Real-time Updates Not Working**
   - Ensure WebSocket connection is active
   - Check event listeners are properly set up
   - Verify message format

### Debug Commands

```bash
# Check WebSocket server status
curl http://localhost:3002

# Monitor WebSocket connections
netstat -an | grep 3002
```

## 📝 Notes

- The WebSocket server example is for development/testing
- Implement proper database integration for production
- Add message persistence and history
- Consider implementing message encryption
- Add user presence and status indicators
