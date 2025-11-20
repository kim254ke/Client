import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io("https://backend-p4ly.onrender.com");
    setSocket(newSocket);

    // Listen for messages from server
    newSocket.on("botMessage", (message) => {
      setMessages((prev) => [...prev, { text: message, sender: "bot" }]);
    });

    return () => newSocket.close();
  }, []);

  // Auto-open chat after 3 seconds and send greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
      const greeting = "Hey there! 💖 You look gorgeous today girly! ✨ How can I help you today?";
      setMessages([{ text: greeting, sender: "bot" }]);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = { text: inputMessage, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    // Send to server
    socket?.emit("userMessage", inputMessage);

    setInputMessage("");
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200 dark:border-gray-700 transition-all">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="font-semibold">Beauty Assistant</h3>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-purple-600 text-white rounded-br-none"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none shadow"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-50 animate-bounce"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}
    </>
  );
};

export default ChatWidget;