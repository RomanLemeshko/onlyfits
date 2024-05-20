import React, { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { List, Input, Button, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchMessages, addMessage, setMessages } from '../../store/messageSlice/messageSlice';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import styles from './ChatComponent.module.css';

const { TextArea } = Input;
const { Title } = Typography;

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const messages = useSelector((state: RootState) => state.messages.messages);
  const socket = useRef<Socket | null>(null);
  const userColors = useRef<{ [key: string]: string }>({});
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatMessagesRef = useRef<HTMLDivElement | null>(null);

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getUserColor = (username: string) => {
    if (!userColors.current[username]) {
      userColors.current[username] = generateRandomColor();
    }
    return userColors.current[username];
  };

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(import.meta.env.VITE_HOST_URL);

      socket.current.on('connect', () => {
        console.log(`Connected with socket ID: ${socket.current?.id}`);
      });

      socket.current.on('disconnect', () => {
        console.log(`Disconnected from socket ID: ${socket.current?.id}`);
      });

      socket.current.on('initial messages', (msgs) => {
        console.log('Received initial messages:', msgs);
        dispatch(setMessages(msgs));
        scrollToEnd();
      });

      socket.current.on('chat message', (msg) => {
        console.log('Received chat message:', msg);
        dispatch(addMessage(msg));
        scrollToEnd();
      });

      dispatch(fetchMessages());
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  const sendMessage = () => {
    if (message.trim() && user && socket.current) {
      const newMessage = { username: user.name, text: message };
      console.log('Sending chat message:', newMessage);
      socket.current.emit('chat message', newMessage);
      setMessage('');
      setShowEmojiPicker(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessage((prevMessage) => prevMessage + emoji.native);
  };

  const toggleEmojiPicker = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEmojiPicker(!showEmojiPicker);
  };

  const scrollToEnd = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToEnd();
  }, [messages]);

  return (
    <div className={styles.chatContainer} onClick={() => setShowEmojiPicker(false)}>
      <Title level={2} className={styles.chatTitle}>Chat</Title>
      <div ref={chatMessagesRef} className={styles.chatMessages}>
        <List
          bordered
          dataSource={messages}
          renderItem={(item) => (
            <List.Item
              className={`${styles.chatMessage} ${item.username === user?.name ? styles.chatMessageRight : styles.chatMessageLeft}`}
            >
              <span style={{ color: getUserColor(item.username) }} className={styles.userName}>
                {item.username}:
              </span>
              <span className={styles.messageText}>
                {item.text}
              </span>
            </List.Item>
          )}
        />
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className={styles.chatForm}>
        <TextArea
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message"
          className={styles.customChatInput}
        />
        <Button type="primary" onClick={sendMessage} className={`${styles.customChatButton} ${styles.antButtonOverride}`}>
          Send
        </Button>
        <Button type="default" onClick={toggleEmojiPicker} className={`${styles.customChatButton} ${styles.antButtonOverride}`}>
          😀
        </Button>
        {showEmojiPicker && (
          <div className={styles.emojiPickerReact} ref={emojiPickerRef} onClick={(e) => e.stopPropagation()}>
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
          </div>
        )}
      </form>
    </div>
  );
};

export default ChatComponent;
