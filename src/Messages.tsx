import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp, Timestamp, doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import { Send, ArrowLeft, MessageSquare, Trash2, Check, CheckCheck } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Timestamp | null;
  conversationId: string;
  read?: boolean;
  reaction?: string;
}

interface Conversation {
  id: string;
  serviceName: string;
  serviceId: number;
  lastMessage: string;
  lastMessageTime: Timestamp | null;
  participants: string[];
  typing?: { [userId: string]: boolean };
}

interface MessagesProps {
  serviceId?: number;
  serviceName?: string;
  onClose: () => void;
}

export default function Messages({ serviceId, serviceName, onClose }: MessagesProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<number | null>(null);
  const currentUser = auth.currentUser;

  // Available reactions
  const reactions = ['👍', '❤️', '😊', '🎉', '👏'];

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load conversations
  useEffect(() => {
    if (!currentUser) {
      setError('Please sign in to view messages');
      setLoading(false);
      return;
    }

    try {
      const q = query(
        collection(db, 'conversations'),
        where('participants', 'array-contains', currentUser.uid)
      );

      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          const convos: Conversation[] = [];
          snapshot.forEach((doc) => {
            convos.push({ id: doc.id, ...doc.data() } as Conversation);
          });
          
          convos.sort((a, b) => {
            if (!a.lastMessageTime) return 1;
            if (!b.lastMessageTime) return -1;
            return b.lastMessageTime.toMillis() - a.lastMessageTime.toMillis();
          });
          
          setConversations(convos);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error('Error loading conversations:', err);
          setError('Failed to load conversations');
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up conversations listener:', err);
      setError('Failed to connect to messages');
      setLoading(false);
    }
  }, [currentUser]);

  // If serviceId is provided, create or find conversation
  useEffect(() => {
    if (serviceId && serviceName && currentUser && !loading) {
      createConversation(serviceId, serviceName);
    }
  }, [serviceId, serviceName, currentUser, loading]);

  // Create conversation with service
  const createConversation = async (sId: number, sName: string) => {
    if (!currentUser) return;

    try {
      const existingConvo = conversations.find(c => c.serviceId === sId);
      
      if (existingConvo) {
        setSelectedConversation(existingConvo.id);
      } else {
        const convoId = `${currentUser.uid}_service_${sId}`;
        const convoRef = doc(db, 'conversations', convoId);
        
        await setDoc(convoRef, {
          serviceName: sName,
          serviceId: sId,
          participants: [currentUser.uid, `service_${sId}`],
          lastMessage: '',
          lastMessageTime: serverTimestamp(),
          createdAt: serverTimestamp(),
          typing: {}
        });
        
        setSelectedConversation(convoId);
      }
    } catch (err) {
      console.error('Error creating conversation:', err);
      setError('Failed to create conversation');
    }
  };

  // Load messages for selected conversation
  useEffect(() => {
    if (!selectedConversation) return;

    try {
      const q = query(
        collection(db, 'messages'),
        where('conversationId', '==', selectedConversation)
      );

      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          const msgs: Message[] = [];
          snapshot.forEach((doc) => {
            msgs.push({ id: doc.id, ...doc.data() } as Message);
          });
          
          msgs.sort((a, b) => {
            if (!a.timestamp) return 1;
            if (!b.timestamp) return -1;
            return a.timestamp.toMillis() - b.timestamp.toMillis();
          });
          
          setMessages(msgs);
          
          // Mark unread messages as read
          msgs.forEach(async (msg) => {
            if (msg.senderId !== currentUser?.uid && !msg.read) {
              try {
                const msgRef = doc(db, 'messages', msg.id);
                await updateDoc(msgRef, { read: true });
              } catch (err) {
                console.error('Error marking message as read:', err);
              }
            }
          });
        },
        (err) => {
          console.error('Error loading messages:', err);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up messages listener:', err);
    }
  }, [selectedConversation, currentUser]);

  // Handle typing indicator
  const handleTyping = () => {
    if (!selectedConversation || !currentUser) return;

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Update typing status in Firestore
    const convoRef = doc(db, 'conversations', selectedConversation);
    updateDoc(convoRef, {
      [`typing.${currentUser.uid}`]: true
    }).catch(err => console.error('Error updating typing status:', err));

    // Set timeout to clear typing status
    typingTimeoutRef.current = window.setTimeout(() => {
      updateDoc(convoRef, {
        [`typing.${currentUser.uid}`]: false
      }).catch(err => console.error('Error clearing typing status:', err));
    }, 2000);
  };

  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation || !currentUser) return;

    const messageText = newMessage.trim();
    setNewMessage('');

    try {
      // Clear typing indicator
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      const convoRef = doc(db, 'conversations', selectedConversation);
      await updateDoc(convoRef, {
        [`typing.${currentUser.uid}`]: false
      });

      // Add message
      await addDoc(collection(db, 'messages'), {
        text: messageText,
        senderId: currentUser.uid,
        senderName: currentUser.displayName || 'User',
        conversationId: selectedConversation,
        timestamp: serverTimestamp(),
        read: false
      });

      // Update conversation's last message
      await updateDoc(convoRef, {
        lastMessage: messageText,
        lastMessageTime: serverTimestamp()
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message');
    }
  };

  // Delete message
  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm('Delete this message?')) return;

    try {
      await deleteDoc(doc(db, 'messages', messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  // Add reaction to message
  const handleReaction = async (messageId: string, reaction: string) => {
    try {
      const msgRef = doc(db, 'messages', messageId);
      await updateDoc(msgRef, { reaction });
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  const selectedConvo = conversations.find(c => c.id === selectedConversation);
  const otherUserTyping = selectedConvo?.typing && Object.entries(selectedConvo.typing).some(
    ([userId, typing]) => userId !== currentUser?.uid && typing
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: '#2a9df4' }}></div>
          <p className="text-gray-600">Loading messages...</p>
          <button onClick={onClose} className="mt-4 text-blue-600 hover:underline">Go Back</button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Go Back</button>
        </div>
      </div>
    );
  }

  return (
  <div className="flex h-screen max-h-screen bg-gray-50">
      <div className="w-full max-w-6xl mx-auto px-4">
      {/* Conversations List */}
      <div className={`${selectedConversation ? 'hidden md:block' : 'block'} w-full md:w-1/3 bg-white border-r border-gray-200 flex flex-col`}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between" style={{ background: '#2a9df4' }}>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">Messages</h2>
          </div>
          <button onClick={onClose} className="text-white hover:bg-white/20 p-2 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
        </div>
      
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-8 text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No conversations yet</p>
              <p className="text-gray-400 text-sm mt-2">Start messaging service providers!</p>
            </div>
          ) : (
            conversations.map((convo) => (
              <button
                key={convo.id}
                onClick={() => setSelectedConversation(convo.id)}
                className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 text-left transition-all ${
                  selectedConversation === convo.id ? 'bg-blue-50 border-l-4' : ''
                }`}
                style={selectedConversation === convo.id ? { borderLeftColor: '#2a9df4' } : {}}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{convo.serviceName}</h3>
                    <p className="text-sm text-gray-500 truncate">{convo.lastMessage || 'Start a conversation'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {convo.typing && Object.values(convo.typing).some(t => t) && (
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    )}
                  </div>
                </div>
                {convo.lastMessageTime && (
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(convo.lastMessageTime.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${selectedConversation ? 'block' : 'hidden md:block'} flex-1 flex flex-col bg-white`}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center gap-3" style={{ background: '#f9fafb' }}>
              <button
                onClick={() => setSelectedConversation(null)}
                className="md:hidden text-gray-600 hover:bg-gray-200 p-2 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{selectedConvo?.serviceName}</h3>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-500">Service Provider</p>
                  {otherUserTyping && (
                    <p className="text-xs text-blue-600 animate-pulse">typing...</p>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ background: '#f9fafb' }}>
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No messages yet</p>
                  <p className="text-gray-400 text-sm">Start the conversation!</p>
                </div>
              ) : (
                messages.map((message) => {
                  const isCurrentUser = message.senderId === currentUser?.uid;
                  return (
                    <div key={message.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} group`}>
                      <div className="flex flex-col max-w-xs md:max-w-md">
                        <div
                          className={`px-4 py-2 rounded-lg relative ${
                            isCurrentUser
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-800 border border-gray-200'
                          }`}
                        >
                          {!isCurrentUser && (
                            <p className="text-xs font-semibold mb-1" style={{ color: '#2a9df4' }}>
                              {message.senderName}
                            </p>
                          )}
                          <p className="text-sm">{message.text}</p>
                          
                          {/* Reaction */}
                          {message.reaction && (
                            <div className="absolute -bottom-2 right-2 bg-white rounded-full px-2 py-1 text-xs shadow-md">
                              {message.reaction}
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2 mt-1">
                            {message.timestamp && (
                              <p className={`text-xs ${isCurrentUser ? 'text-blue-100' : 'text-gray-400'}`}>
                                {new Date(message.timestamp.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            )}
                            {isCurrentUser && (
                              <div className="flex items-center">
                                {message.read ? (
                                  <CheckCheck className="w-3 h-3 text-blue-200" />
                                ) : (
                                  <Check className="w-3 h-3 text-blue-200" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Message Actions */}
                        <div className={`flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                          {/* Reactions */}
                          {reactions.map(reaction => (
                            <button
                              key={reaction}
                              onClick={() => handleReaction(message.id, reaction)}
                              className="text-lg hover:scale-125 transition-transform"
                            >
                              {reaction}
                            </button>
                          ))}
                          
                          {/* Delete (own messages only) */}
                          {isCurrentUser && (
                            <button
                              onClick={() => handleDeleteMessage(message.id)}
                              className="p-1 hover:bg-red-50 rounded text-red-500"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    handleTyping();
                  }}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="px-6 py-2 rounded-lg text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                  style={{ background: '#2a9df4' }}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a conversation</h3>
              <p className="text-gray-400">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
    </div>
  </div>
);
}
