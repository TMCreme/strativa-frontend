# Strativa API Reference

## 📋 Overview

This document provides a comprehensive reference for all API endpoints, data structures, and integration patterns used in the Strativa investor dashboard.

## 🔗 Base URLs

- **Development**: `http://localhost:3001`
- **Production**: `https://your-api-server.com`

## 📊 REST API Endpoints

### Companies

#### Get All Companies

```http
GET /companies
```

**Query Parameters:**

- `_page` (number): Page number for pagination
- `_limit` (number): Number of items per page
- `_sort` (string): Field to sort by
- `_order` (string): Sort order (asc/desc)
- `q` (string): Search query

**Response:**

```json
[
  {
    "id": 1,
    "name": "TechCorp Inc",
    "logo": "https://example.com/logo.png",
    "industry": "Technology",
    "valuation": 50000000,
    "growth": 15.5,
    "status": "active"
  }
]
```

#### Get Company by ID

```http
GET /companies/:id
```

**Response:**

```json
{
  "id": 1,
  "name": "TechCorp Inc",
  "logo": "https://example.com/logo.png",
  "industry": "Technology",
  "valuation": 50000000,
  "growth": 15.5,
  "status": "active",
  "description": "Leading technology company...",
  "founded": "2020-01-01",
  "employees": 150,
  "location": "San Francisco, CA"
}
```

### Company Profiles

#### Get Company Profile

```http
GET /companyProfiles/:id
```

**Response:**

```json
{
  "id": 1,
  "companyId": 1,
  "name": "TechCorp Inc",
  "description": "Leading technology company...",
  "industry": "Technology",
  "valuation": 50000000,
  "growth": 15.5,
  "team": [
    {
      "name": "John Doe",
      "position": "CEO",
      "avatar": "https://example.com/avatar.jpg"
    }
  ],
  "documents": [
    {
      "id": 1,
      "name": "Financial Report Q4 2024",
      "type": "PDF",
      "size": "2.5MB",
      "uploadedAt": "2024-12-01T10:00:00Z"
    }
  ],
  "growthData": [
    {
      "month": "Jan 2024",
      "value": 1000000
    }
  ]
}
```

### Dashboard

#### Get Dashboard Statistics

```http
GET /dashboard
```

**Response:**

```json
{
  "totalCompanies": 150,
  "totalInvestments": 2500000000,
  "averageGrowth": 12.5,
  "activeDeals": 25,
  "recentActivity": [
    {
      "id": 1,
      "type": "investment",
      "company": "TechCorp Inc",
      "amount": 5000000,
      "date": "2024-12-01T10:00:00Z"
    }
  ]
}
```

#### Get AI Watchlist

```http
GET /aiWatchlist
```

**Response:**

```json
[
  {
    "id": 1,
    "company": "TechCorp Inc",
    "score": 95.5,
    "recommendation": "Strong Buy",
    "reason": "High growth potential in AI sector"
  }
]
```

### Documents

#### Upload Document

```http
POST /documents
Content-Type: multipart/form-data
```

**Request Body:**

- `file` (File): Document file
- `type` (string): Document type
- `companyId` (number): Associated company ID

**Response:**

```json
{
  "id": 1,
  "name": "Financial Report.pdf",
  "type": "PDF",
  "size": "2.5MB",
  "uploadedAt": "2024-12-01T10:00:00Z",
  "status": "uploaded"
}
```

#### Get User Documents

```http
GET /documents?userId=:userId
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "Financial Report.pdf",
    "type": "PDF",
    "size": "2.5MB",
    "uploadedAt": "2024-12-01T10:00:00Z",
    "status": "verified"
  }
]
```

#### Delete Document

```http
DELETE /documents/:id
```

**Response:**

```json
{
  "success": true,
  "message": "Document deleted successfully"
}
```

## 🔄 WebSocket API

### Connection

#### Connect to WebSocket Server

```javascript
import { io } from "socket.io-client";

const socket = io("ws://localhost:3002", {
  auth: {
    token: "your-auth-token",
    userId: "user-123",
  },
});
```

### Events

#### Client → Server Events

##### Authenticate

```javascript
socket.emit("authenticate", {
  userId: "user-123",
  token: "auth-token",
});
```

##### Join Conversation

```javascript
socket.emit("join_conversation", {
  conversationId: "conv-123",
});
```

##### Send Message

```javascript
socket.emit("send_message", {
  conversationId: "conv-123",
  text: "Hello, how are you?",
  timestamp: new Date().toISOString(),
});
```

##### Typing Indicator

```javascript
socket.emit("typing", {
  conversationId: "conv-123",
  isTyping: true,
});
```

##### Mark Message as Read

```javascript
socket.emit("mark_read", {
  conversationId: "conv-123",
  messageId: "msg-456",
});
```

#### Server → Client Events

##### Message Received

```javascript
socket.on("message", (message) => {
  console.log("New message:", message);
  // message: {
  //   id: 'msg-123',
  //   conversationId: 'conv-123',
  //   text: 'Hello!',
  //   sender: 'user',
  //   timestamp: '2024-12-01T10:00:00Z',
  //   senderId: 'user-123',
  //   senderName: 'John Doe'
  // }
});
```

##### Conversation Update

```javascript
socket.on("conversation_update", (conversation) => {
  console.log("Conversation updated:", conversation);
});
```

##### Typing Indicator

```javascript
socket.on("typing", (data) => {
  console.log("User typing:", data);
  // data: {
  //   conversationId: 'conv-123',
  //   userId: 'user-123',
  //   isTyping: true
  // }
});
```

##### User Joined/Left

```javascript
socket.on("user_joined", (data) => {
  console.log("User joined:", data);
});

socket.on("user_left", (data) => {
  console.log("User left:", data);
});
```

## 📊 Data Types

### Company

```typescript
interface Company {
  id: number;
  name: string;
  logo?: string;
  industry: string;
  valuation: number;
  growth: number;
  status: "active" | "inactive" | "pending";
  description?: string;
  founded?: string;
  employees?: number;
  location?: string;
}
```

### Company Profile

```typescript
interface CompanyProfile {
  id: number;
  companyId: number;
  name: string;
  description: string;
  industry: string;
  valuation: number;
  growth: number;
  team: TeamMember[];
  documents: Document[];
  growthData: GrowthDataPoint[];
}

interface TeamMember {
  name: string;
  position: string;
  avatar?: string;
}

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: "uploaded" | "verified" | "rejected";
}

interface GrowthDataPoint {
  month: string;
  value: number;
}
```

### Chat Message

```typescript
interface ChatMessage {
  id: string;
  conversationId: string;
  text: string;
  sender: "user" | "other";
  timestamp: string;
  senderId: string;
  senderName: string;
}
```

### Conversation

```typescript
interface Conversation {
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
```

### Dashboard Stats

```typescript
interface DashboardStats {
  totalCompanies: number;
  totalInvestments: number;
  averageGrowth: number;
  activeDeals: number;
  recentActivity: ActivityItem[];
}

interface ActivityItem {
  id: number;
  type: string;
  company: string;
  amount?: number;
  date: string;
}
```

## 🔐 Authentication

### JWT Token Format

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": "user-123",
    "email": "user@example.com",
    "role": "investor",
    "iat": 1640995200,
    "exp": 1641081600
  }
}
```

### Authorization Headers

```http
Authorization: Bearer <jwt-token>
```

## 🚨 Error Responses

### Standard Error Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

### Common Error Codes

- `VALIDATION_ERROR` - Input validation failed
- `AUTHENTICATION_ERROR` - Invalid or missing authentication
- `AUTHORIZATION_ERROR` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `INTERNAL_ERROR` - Server error

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 📝 Request/Response Examples

### Create Company Profile

```http
POST /companyProfiles
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "New Tech Corp",
  "description": "Innovative technology company",
  "industry": "Technology",
  "valuation": 10000000,
  "team": [
    {
      "name": "Jane Smith",
      "position": "CEO"
    }
  ]
}
```

**Response:**

```json
{
  "id": 2,
  "name": "New Tech Corp",
  "description": "Innovative technology company",
  "industry": "Technology",
  "valuation": 10000000,
  "createdAt": "2024-12-01T10:00:00Z"
}
```

### Search Companies

```http
GET /companies?q=tech&_sort=valuation&_order=desc&_page=1&_limit=10
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "TechCorp Inc",
    "industry": "Technology",
    "valuation": 50000000
  }
]
```

## 🔧 Integration Examples

### JavaScript/TypeScript

#### Using Axios

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Get companies
const companies = await api.get("/companies");

// Create company profile
const profile = await api.post("/companyProfiles", {
  name: "New Company",
  description: "Description",
});
```

#### Using Fetch

```javascript
const response = await fetch("http://localhost:3001/companies", {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

const companies = await response.json();
```

### React Hook Example

```typescript
import { useState, useEffect } from "react";
import { companiesService } from "@/shared/services/companiesService";

export const useCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const data = await companiesService.getCompanies();
      setCompanies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return { companies, loading, error, refetch: fetchCompanies };
};
```

## 🧪 Testing

### Test Endpoints

```bash
# Test REST API
curl http://localhost:3001/companies

# Test WebSocket connection
node websocket-server-example.js
```

### Mock Data

The API uses `db.json` for mock data. You can modify this file to test different scenarios.

## 📚 Additional Resources

- [Full Project Documentation](./PROJECT_DOCUMENTATION.md)
- [WebSocket Integration Guide](./WEBSOCKET_INTEGRATION.md)
- [Developer Quick Reference](./DEVELOPER_QUICK_REFERENCE.md)

---

_Last updated: December 2024_
