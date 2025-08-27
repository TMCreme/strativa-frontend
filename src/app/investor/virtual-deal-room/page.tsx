"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { UploadedFileCard, UploadedFile } from "@/shared/components";
import { useChat } from "@/shared/hooks/useChat";

export default function VirtualDealRoomPage() {
  const [activeTab, setActiveTab] = useState("document-repository");
  const [selectedConversation, setSelectedConversation] = useState("tj-1");
  const [messageInput, setMessageInput] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: "1",
      name: "Johnn Doe regulatory License.pdf",
      size: "4MB",
      type: "PDF",
      progress: 50,
      //   isUploading: true
    },
    {
      id: "2",
      name: "Johnn Doe regulatory License.pdf",
      size: "4MB",
      type: "PDF",
    },
    {
      id: "3",
      name: "Johnn Doe regulatory License.pdf",
      size: "4MB",
      type: "PDF",
    },
    {
      id: "4",
      name: "Johnn Doe regulatory License.pdf",
      size: "4MB",
      type: "PDF",
    },
  ]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileUpload = (file: File) => {
    const newFile = {
      id: Date.now().toString(),
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type.includes("pdf") ? "PDF" : "JPEG",
      progress: 0,
      isUploading: true,
    };

    setUploadedFiles((prev) => [...prev, newFile]);

    // Simulate upload progress - same as account setup process
    const interval = setInterval(() => {
      setUploadedFiles((prev) => {
        const updatedFiles = prev.map((f) => {
          if (f.id === newFile.id) {
            const newProgress = (f.progress || 0) + 10;
            if (newProgress >= 100) {
              clearInterval(interval);
              return { ...f, progress: 100, isUploading: false };
            }
            return { ...f, progress: newProgress };
          }
          return f;
        });
        return updatedFiles;
      });
    }, 200);
  };

  const handleDeleteFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const handleViewFile = (fileId: string) => {
    console.log("View file:", fileId);
  };

  // Chat functionality
  const conversations = [
    {
      id: "tj-1",
      name: "The Jade Exchange Market",
      email: "byewind@twitter.com",
      avatar: "TJ",
      lastMessage: "Hello there! can we proceed?",
      timestamp: "19:28",
      unreadCount: 12,
      messages: [
        {
          id: 1,
          text: "Hello there! I am interested in your current bid offer please?",
          sender: "user",
          timestamp: "Today, 11:59 AM",
        },
        {
          id: 2,
          text: "Thank you. Of course. Just a moment, please.",
          sender: "other",
          timestamp: "Today, 12:00 PM",
        },
      ],
    },
    {
      id: "tj-2",
      name: "The Jade Exchange Market",
      email: "contact@jade.com",
      avatar: "TJ",
      lastMessage: "Hello there! can we proceed?",
      timestamp: "19:28",
      unreadCount: 12,
      messages: [],
    },
    {
      id: "tj-3",
      name: "The Jade Exchange Market",
      email: "support@jade.com",
      avatar: "TJ",
      lastMessage: "Hello there! can we proceed?",
      timestamp: "19:28",
      unreadCount: 0,
      messages: [],
    },
    {
      id: "group-1",
      name: "Group",
      email: "group@jade.com",
      avatar: "Group",
      lastMessage: "Hello there! can we proceed?",
      timestamp: "19:28",
      unreadCount: 0,
      messages: [],
    },
  ];

  const selectedConv = conversations.find(
    (conv) => conv.id === selectedConversation
  );

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Here you would typically send the message via WebSocket
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const tabs = [
    { id: "document-repository", label: "Document Repository" },
    { id: "message-communication", label: "Message & Communication" },
    { id: "schedule-meeting", label: "Schedule Meeting" },
    { id: "audit-trial", label: "Audit Trial" },
    { id: "payment-simulation", label: "Payment Simulation" },
  ];

  return (
    <main className="container mx-auto">
      <div className="bg-whitespace-y-6 flex flex-col items-center justify-center">
        {/* Page Title */}
        {/* <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Virtual Deal Room</h1>
      </div> */}

        {/* Tabs */}
        <div className="flex items-center bg-white justify-center w-full border-b my-10 border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div
          className={`${
            activeTab === "document-repository"
              ? "flex bg-white w-[790px] rounded-xl shadow-sm p-6"
              : " w-full shadow-sm p-6"
          }`}
        >
          <div
            className={`${
              activeTab === "document-repository"
                ? "flex items-center justify-center bg-gray-100 w-[770px] rounded-xl shadow-sm p-6"
                : ""
            }`}
          >
            {activeTab === "document-repository" && (
              <div className="space-y-6 w-full">
                {/* Document Upload Section */}
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.add("border-green-500");
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove("border-green-500");
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove("border-green-500");
                    const files = e.dataTransfer.files;
                    if (files.length > 0) {
                      handleFileUpload(files[0]);
                    }
                  }}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Image
                        src="/icons/cloud-upload.png"
                        alt="upload"
                        width={600}
                        height={600}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        Click to upload or drag & drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF or Jpeg only (250MB)
                      </p>
                    </div>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        handleFileUpload(files[0]);
                      }
                    }}
                    className="hidden"
                  />
                </div>

                {/* Uploaded Files List */}
                <div className="space-y-4">
                  {uploadedFiles.map((file) => (
                    <UploadedFileCard
                      key={file.id}
                      file={file}
                      onDelete={handleDeleteFile}
                      onView={handleViewFile}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <div className="flex justify-center pt-6">
                  <button className="bg-green-600 text-white w-full px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            )}

            {activeTab === "message-communication" && (
              <div className="flex w-full h-[600px] bg-white rounded-lg border border-gray-200">
                {/* Left Panel - Conversation List */}
                <div className="w-1/3 border-r border-gray-200 flex flex-col">
                  {/* Search Bar */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <svg
                        className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Conversation List */}
                  <div className="flex-1 overflow-y-auto">
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          selectedConversation === conversation.id
                            ? "bg-blue-50"
                            : ""
                        }`}
                        onClick={() => setSelectedConversation(conversation.id)}
                      >
                        <div className="flex items-center space-x-3">
                          {conversation.avatar === "Group" ? (
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                              <div className="flex -space-x-1">
                                <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                                <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                                <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
                              </div>
                            </div>
                          ) : (
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {conversation.avatar}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {conversation.name}
                              </p>
                              <span className="text-xs text-gray-500">
                                {conversation.timestamp}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 truncate">
                              {conversation.lastMessage}
                            </p>
                          </div>
                          {conversation.unreadCount > 0 && (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                              {conversation.unreadCount}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Invite Third Party Link */}
                  <div className="p-4 border-t border-gray-200">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Invite a third Party?
                    </button>
                  </div>
                </div>

                {/* Right Panel - Chat Area */}
                <div className="flex-1 flex flex-col">
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {selectedConv?.avatar === "Group" ? (
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <div className="flex -space-x-1">
                            <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                            <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                            <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {selectedConv?.avatar}
                        </div>
                      )}
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {selectedConv?.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {selectedConv?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {selectedConv?.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div className="max-w-xs lg:max-w-md">
                          <div
                            className={`rounded-lg px-4 py-2 ${
                              message.sender === "user"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-900"
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                          </div>
                          {message.sender === "user" && (
                            <p className="text-xs text-gray-500 mt-1 text-right">
                              {message.timestamp}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                          />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Type message"
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        onClick={handleSendMessage}
                        className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "schedule-meeting" && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  Schedule Meeting content will be implemented here
                </p>
              </div>
            )}

            {activeTab === "audit-trial" && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  Audit Trial content will be implemented here
                </p>
              </div>
            )}

            {activeTab === "payment-simulation" && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  Payment Simulation content will be implemented here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Start Simulation Button */}
      <div className="flex justify-end mb-10">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
          Start Simulation
        </button>
      </div>
    </main>
  );
}
