const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

// Store active users and conversations
const activeUsers = new Map();
const conversations = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle authentication
  socket.on('authenticate', (data) => {
    const { userId, token } = data;
    activeUsers.set(socket.id, { userId, token });
    console.log('User authenticated:', userId);
  });

  // Handle joining conversation
  socket.on('join_conversation', (data) => {
    const { conversationId } = data;
    socket.join(conversationId);
    console.log(`User ${socket.id} joined conversation: ${conversationId}`);
    
    // Notify others in the conversation
    socket.to(conversationId).emit('user_joined', {
      conversationId,
      userId: activeUsers.get(socket.id)?.userId,
      userName: 'User'
    });
  });

  // Handle leaving conversation
  socket.on('leave_conversation', (data) => {
    const { conversationId } = data;
    socket.leave(conversationId);
    console.log(`User ${socket.id} left conversation: ${conversationId}`);
    
    // Notify others in the conversation
    socket.to(conversationId).emit('user_left', {
      conversationId,
      userId: activeUsers.get(socket.id)?.userId,
      userName: 'User'
    });
  });

  // Handle sending message
  socket.on('send_message', (data) => {
    const { conversationId, text, timestamp } = data;
    const user = activeUsers.get(socket.id);
    
    if (!user) {
      console.error('Unauthorized message attempt');
      return;
    }

    const message = {
      id: Date.now().toString(),
      conversationId,
      text,
      sender: 'user',
      timestamp,
      senderId: user.userId,
      senderName: 'You'
    };

    console.log('Message sent:', message);

    // Broadcast message to conversation
    io.to(conversationId).emit('message', message);

    // Simulate response from other user
    setTimeout(() => {
      const responseMessage = {
        id: (Date.now() + 1).toString(),
        conversationId,
        text: `Response to: ${text}`,
        sender: 'other',
        timestamp: new Date().toISOString(),
        senderId: 'other-user',
        senderName: 'Other User'
      };

      io.to(conversationId).emit('message', responseMessage);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  });

  // Handle typing indicator
  socket.on('typing', (data) => {
    const { conversationId, isTyping } = data;
    const user = activeUsers.get(socket.id);
    
    if (user) {
      socket.to(conversationId).emit('typing', {
        conversationId,
        userId: user.userId,
        isTyping
      });
    }
  });

  // Handle marking message as read
  socket.on('mark_read', (data) => {
    const { conversationId, messageId } = data;
    console.log(`Message ${messageId} marked as read in conversation ${conversationId}`);
    // You would typically update the database here
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    activeUsers.delete(socket.id);
  });
});

const PORT = process.env.PORT || 3002;
httpServer.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
  console.log(`CORS enabled for: http://localhost:3001`);
});
