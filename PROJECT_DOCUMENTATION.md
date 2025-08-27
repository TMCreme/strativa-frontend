# Strativa Investor Dashboard - Project Documentation

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Technology Stack](#technology-stack)
5. [Project Structure](#project-structure)
6. [Setup & Installation](#setup--installation)
7. [Development Guide](#development-guide)
8. [API Documentation](#api-documentation)
9. [Component Documentation](#component-documentation)
10. [State Management](#state-management)
11. [WebSocket Integration](#websocket-integration)
12. [Deployment](#deployment)
13. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**Strativa** is a comprehensive investor dashboard platform built with Next.js 15, designed to facilitate investment management, document handling, and real-time communication between investors and companies.

### Key Objectives

- Provide a modern, responsive investor dashboard
- Enable secure document upload and management
- Facilitate real-time communication via WebSocket
- Support multi-step registration and authentication flows
- Offer comprehensive company profiling and analytics

---

## 🏗️ Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   WebSocket     │
│   (Next.js)     │◄──►│   (json-server) │    │   (Socket.IO)   │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Application Layers

1. **Presentation Layer** - React components and pages
2. **Business Logic Layer** - Custom hooks and services
3. **State Management Layer** - Zustand stores
4. **Data Layer** - API services and WebSocket connections
5. **Validation Layer** - Zod schemas

---

## ✨ Features

### 🔐 Authentication & Registration

- **Multi-step investor registration** with progress tracking
- **Login system** with form validation
- **Forgot password flow** with email verification
- **Password reset** with strength validation

### 📄 Document Management

- **Multi-step document upload** process
- **File type validation** (PDF, JPEG, PNG)
- **Progress tracking** for uploads
- **Document repository** with file management

### 📊 Dashboard & Analytics

- **Interactive dashboard** with key metrics
- **Company profiles** with detailed information
- **Growth charts** using Recharts
- **Data tables** with pagination and filtering
- **Real-time statistics** updates

### 💬 Real-time Communication

- **WebSocket-based chat** system
- **Typing indicators** and read receipts
- **Conversation management**
- **File sharing** in chat

### 🏢 Company Management

- **Company profiles** with comprehensive data
- **Document review** system
- **Team information** display
- **Valuation and growth** tracking

---

## 🛠️ Technology Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Data visualization

### State Management & Validation

- **Zustand** - Lightweight state management
- **Zod** - Schema validation

### Backend & API

- **json-server** - Mock REST API
- **Axios** - HTTP client
- **Socket.IO** - Real-time communication

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundling

---

## 📁 Project Structure

```
strativa/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── (LandingPage)/            # Landing page routes
│   │   ├── company/                  # Company-related pages
│   │   ├── documents/                # Document upload pages
│   │   ├── forgot-password/          # Password reset flow
│   │   ├── investor/                 # Investor dashboard pages
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Home page
│   │
│   ├── shared/                       # Shared components & utilities
│   │   ├── components/              # Reusable UI components
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── services/                # API and WebSocket services
│   │   ├── stores/                  # Zustand stores
│   │   ├── validations/             # Zod validation schemas
│   │   ├── types/                   # TypeScript type definitions
│   │   └── api/                     # API utilities
│   │
│   ├── features/                     # Feature-based modules
│   │   ├── Documents/               # Document management
│   │   ├── Investor/                # Investor-specific features
│   │   ├── Issuer/                  # Issuer-specific features
│   │   └── LandingPage/             # Landing page features
│   │
│   ├── config/                       # Configuration files
│   │   └── store/                   # Store configurations
│   │
│   ├── services/                     # Business logic services
│   └── styles/                       # Global styles
│
├── public/                           # Static assets
├── db.json                          # Mock database
├── json-server.json                 # json-server configuration
├── middleware.js                    # CORS middleware
└── websocket-server-example.js      # WebSocket server example
```

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd strativa
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local` file:

   ```bash
   NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:3002
   ```

4. **Start the mock API server**

   ```bash
   npm run json-server
   ```

5. **Start the WebSocket server** (optional)

   ```bash
   node websocket-server-example.js
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run json-server` - Start mock API server

---

## 💻 Development Guide

### Code Style & Conventions

#### File Naming

- Components: PascalCase (e.g., `UserProfile.tsx`)
- Pages: kebab-case (e.g., `user-profile/page.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)

#### Component Structure

```tsx
// Component template
import React from "react";
import { ComponentProps } from "./types";

export const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Hooks
  // State
  // Effects
  // Handlers

  return <div>{/* JSX */}</div>;
};
```

#### State Management Pattern

```tsx
// Store pattern
import { create } from "zustand";

interface StoreState {
  data: DataType[];
  loading: boolean;
  error: string | null;
  actions: {
    fetchData: () => Promise<void>;
    setData: (data: DataType[]) => void;
  };
}

export const useStore = create<StoreState>((set, get) => ({
  data: [],
  loading: false,
  error: null,
  actions: {
    fetchData: async () => {
      set({ loading: true });
      try {
        const data = await api.getData();
        set({ data, loading: false });
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },
    setData: (data) => set({ data }),
  },
}));
```

### Adding New Features

1. **Create feature directory** in `src/features/`
2. **Add components** in `src/shared/components/` if reusable
3. **Create services** in `src/shared/services/`
4. **Add validation schemas** in `src/shared/validations/`
5. **Create stores** in `src/shared/stores/` if needed
6. **Add pages** in `src/app/`

---

## 🔌 API Documentation

### REST API Endpoints

#### Companies

- `GET /companies` - Get all companies
- `GET /companies/:id` - Get company by ID
- `GET /companyProfiles/:id` - Get company profile

#### Dashboard

- `GET /dashboard` - Get dashboard statistics
- `GET /aiWatchlist` - Get AI watchlist data

#### Documents

- `POST /documents` - Upload document
- `GET /documents` - Get user documents
- `DELETE /documents/:id` - Delete document

### WebSocket Events

#### Client → Server

- `authenticate` - User authentication
- `join_conversation` - Join conversation
- `send_message` - Send message
- `typing` - Typing indicator
- `mark_read` - Mark message as read

#### Server → Client

- `message` - New message received
- `conversation_update` - Conversation updated
- `typing` - User typing indicator

---

## 🧩 Component Documentation

### Core Components

#### ProgressStepper

```tsx
<ProgressStepper steps={steps} currentStep={currentStep} />
```

**Props:**

- `steps: string[]` - Array of step labels
- `currentStep: number` - Current active step

#### MultiStepForm

```tsx
<MultiStepForm
  steps={formSteps}
  currentStep={currentStep}
  formData={formData}
  onStepChange={handleStepChange}
  onComplete={handleComplete}
/>
```

#### DataTable

```tsx
<DataTable
  data={companies}
  columns={columns}
  pagination={pagination}
  onPageChange={handlePageChange}
/>
```

#### StatCard

```tsx
<StatCard title="Total Companies" value="1,234" change="+12.5%" trend="up" />
```

### Form Components

#### LoginForm

```tsx
<LoginForm onSubmit={handleLogin} loading={isLoading} />
```

#### FileUpload

```tsx
<FileUpload
  onFileSelect={handleFileSelect}
  accept=".pdf,.jpg,.jpeg"
  maxSize={10 * 1024 * 1024}
/>
```

---

## 📊 State Management

### Store Architecture

#### Dashboard Store

```tsx
interface DashboardState {
  companies: Company[];
  stats: DashboardStats;
  aiWatchlist: AIWatchlistItem[];
  loading: boolean;
  error: string | null;
  pagination: PaginationState;
  filters: FilterState;
}
```

#### Chat Store

```tsx
interface ChatState {
  conversations: Conversation[];
  messages: Record<string, ChatMessage[]>;
  selectedConversationId: string | null;
  isConnected: boolean;
  typingUsers: Record<string, Set<string>>;
}
```

#### Sidebar Store

```tsx
interface SidebarState {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}
```

### Store Usage Pattern

```tsx
const { companies, loading, actions } = useDashboardStore();

useEffect(() => {
  actions.fetchCompanies();
}, []);
```

---

## 🔄 WebSocket Integration

### Connection Management

```tsx
// Initialize WebSocket connection
websocketService.connect(userId, token);

// Listen for messages
websocketService.onMessage((message) => {
  console.log("New message:", message);
});

// Send message
websocketService.sendMessage(conversationId, text);
```

### Chat Hook Usage

```tsx
const {
  conversations,
  currentMessages,
  messageInput,
  isConnected,
  handleSendMessage,
  handleMessageInputChange,
} = useChat(userId);
```

For detailed WebSocket documentation, see [WEBSOCKET_INTEGRATION.md](./WEBSOCKET_INTEGRATION.md).

---

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Variables

```bash
# Production
NEXT_PUBLIC_WEBSOCKET_URL=wss://your-websocket-server.com
NEXT_PUBLIC_API_URL=https://your-api-server.com
```

### Deployment Platforms

- **Vercel** - Recommended for Next.js
- **Netlify** - Alternative option
- **AWS Amplify** - Enterprise option

### WebSocket Server Deployment

- **Railway** - Easy deployment
- **Heroku** - Traditional option
- **AWS EC2** - Full control

---

## 🐛 Troubleshooting

### Common Issues

#### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

#### WebSocket Connection Issues

1. Check WebSocket server is running
2. Verify environment variables
3. Check CORS settings
4. Review browser console for errors

#### API Connection Issues

1. Ensure json-server is running
2. Check API endpoints in browser
3. Verify CORS configuration
4. Review network tab for errors

#### TypeScript Errors

```bash
# Check TypeScript configuration
npx tsc --noEmit
```

### Debug Mode

Enable debug logging by checking browser console for:

- Connection status
- API requests/responses
- WebSocket events
- State changes

### Performance Optimization

- Use React.memo for expensive components
- Implement proper loading states
- Optimize images with next/image
- Use dynamic imports for code splitting

---

## 📚 Additional Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Zod Documentation](https://zod.dev)

### Tools

- [Socket.IO Documentation](https://socket.io/docs)
- [Recharts Documentation](https://recharts.org)
- [Axios Documentation](https://axios-http.com)

---

## 🤝 Contributing

### Development Workflow

1. Create feature branch
2. Implement changes
3. Add tests if applicable
4. Update documentation
5. Submit pull request

### Code Review Checklist

- [ ] Code follows project conventions
- [ ] Components are properly typed
- [ ] Error handling is implemented
- [ ] Documentation is updated
- [ ] No console errors or warnings

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 📞 Support

For technical support or questions:

- Create an issue in the repository
- Contact the development team
- Review the troubleshooting section

---

_Last updated: December 2024_
