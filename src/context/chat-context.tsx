"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Message, LeadScore, Conversation } from "@/lib/types";

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  leadScore: LeadScore;
  bookingIntent: boolean;
  conversationId: string;
}

type ChatAction =
  | { type: "ADD_MESSAGE"; payload: Message }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "UPDATE_METADATA"; payload: { leadScore?: LeadScore; bookingIntent?: boolean } }
  | { type: "CLEAR_CHAT" }
  | { type: "LOAD_CONVERSATION"; payload: ChatState };

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  leadScore: "COLD",
  bookingIntent: false,
  conversationId: "",
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "UPDATE_METADATA":
      return { 
        ...state, 
        leadScore: action.payload.leadScore || state.leadScore,
        bookingIntent: action.payload.bookingIntent !== undefined ? action.payload.bookingIntent : state.bookingIntent
      };
    case "CLEAR_CHAT":
      return { ...initialState, conversationId: crypto.randomUUID() };
    case "LOAD_CONVERSATION":
      return action.payload;
    default:
      return state;
  }
}

interface ChatContextType extends ChatState {
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Initialize conversation ID on client side
  useEffect(() => {
    dispatch({ type: "CLEAR_CHAT" });
  }, []);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    dispatch({ type: "ADD_MESSAGE", payload: userMessage });
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          history: state.messages,
          currentScore: state.leadScore,
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toISOString(),
      };

      dispatch({ type: "ADD_MESSAGE", payload: assistantMessage });
      dispatch({ 
        type: "UPDATE_METADATA", 
        payload: { 
          leadScore: data.metadata?.leadScore,
          bookingIntent: data.metadata?.bookingIntent
        } 
      });

      // Save to localStorage so dashboard can read it
      saveConversationToStorage({
        ...state,
        messages: [...state.messages, userMessage, assistantMessage],
        leadScore: data.metadata?.leadScore || state.leadScore,
      });

    } catch (error) {
      console.error("Failed to send message:", error);
      dispatch({ 
        type: "ADD_MESSAGE", 
        payload: {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "I'm having trouble connecting right now. Please try again in a moment.",
          timestamp: new Date().toISOString()
        }
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const clearChat = () => dispatch({ type: "CLEAR_CHAT" });

  return (
    <ChatContext.Provider value={{ ...state, sendMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

// Helper to persist to localStorage for the dashboard to read
function saveConversationToStorage(state: ChatState) {
  if (typeof window === 'undefined') return;
  
  try {
    const existingStr = localStorage.getItem('ai_booking_conversations');
    const existing = existingStr ? JSON.parse(existingStr) : [];
    
    const conv: Conversation = {
      id: state.conversationId,
      messages: state.messages,
      leadScore: state.leadScore,
      startedAt: state.messages[0]?.timestamp || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const index = existing.findIndex((c: Conversation) => c.id === conv.id);
    if (index >= 0) {
      existing[index] = conv;
    } else {
      existing.unshift(conv); // Add to beginning
    }
    
    localStorage.setItem('ai_booking_conversations', JSON.stringify(existing));
  } catch (e) {
    console.error("Failed to save conversation", e);
  }
}
