import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Mic, Settings, Sparkles } from 'lucide-react';
import styles from './Chatbot.module.css';
import { Link } from 'react-router-dom';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showWelcomeBubble, setShowWelcomeBubble] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isAnimationEnabled, setIsAnimationEnabled] = useState(() => {
        const saved = localStorage.getItem('chatbotAnimationEnabled');
        return saved !== null ? JSON.parse(saved) : true;
    });
    const messagesEndRef = useRef(null);

    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Welcome bubble — show after 3 seconds, once per session
    useEffect(() => {
        const alreadyShown = sessionStorage.getItem('chatbotWelcomeShown');
        if (!alreadyShown) {
            const timer = setTimeout(() => {
                setShowWelcomeBubble(true);
                sessionStorage.setItem('chatbotWelcomeShown', 'true');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    // Hide welcome bubble after 8 seconds if user hasn't interacted
    useEffect(() => {
        if (showWelcomeBubble && !hasInteracted) {
            const hideTimer = setTimeout(() => {
                setShowWelcomeBubble(false);
            }, 8000);
            return () => clearTimeout(hideTimer);
        }
    }, [showWelcomeBubble, hasInteracted]);

    const toggleChat = () => {
        const opening = !isOpen;
        setIsOpen(opening);
        setShowWelcomeBubble(false);
        setHasInteracted(true);

        // On first open: show typing indicator → then welcome message
        if (opening && messages.length === 0) {
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                setMessages([
                    { type: 'bot', text: 'Namaste! 🙏 Welcome to Chetan Business School. How can I assist you today?' }
                ]);
                setShowOptions(true);
            }, 1200);
        }
    };

    const toggleAnimation = () => {
        const newValue = !isAnimationEnabled;
        setIsAnimationEnabled(newValue);
        localStorage.setItem('chatbotAnimationEnabled', JSON.stringify(newValue));
    };

    const handleVoiceInput = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Your browser does not support voice input. Please try Chrome or Edge.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN';
        recognition.interimResults = false;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setUserInput(transcript);
            sendMessage(transcript);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
        };

        recognition.start();
    };

    const options = [
        { label: 'Admissions Info', type: 'quick_reply', value: 'ADMISSION' },
        { label: 'Courses Offered', type: 'quick_reply', value: 'COURSES' },
        { label: 'Fee Structure', type: 'quick_reply', value: 'FEES' },
        { label: 'Placements', type: 'navigate', url: '/placements/process' },
        { label: 'Contact Us', type: 'navigate', url: '/contact' },
        { label: 'Chat with Human', type: 'navigate', url: '#enquiry-form' },
    ];

    const sendMessage = async (payload) => {
        let text = "";
        let requestBody = {};

        if (typeof payload === 'string') {
            text = payload;
            requestBody = { message: text };
        } else if (payload.type === 'quick_reply') {
            text = payload.displayText || payload.action;
            requestBody = {
                type: 'quick_reply',
                action: payload.action,
                message: text
            };
        }

        if (!text.trim()) return;

        setMessages(prev => [...prev, { type: 'user', text }]);
        setUserInput('');
        setShowOptions(false);
        setIsTyping(true);

        try {
            const response = await fetch('http://localhost:5000/api/chatbot/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });
            const data = await response.json();

            // Brief typing delay for natural feel
            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, { type: 'bot', text: data.response }]);
                setShowOptions(true);
            }, 600);
        } catch (error) {
            console.error(error);
            setIsTyping(false);
            setMessages(prev => [...prev, { type: 'bot', text: 'Sorry, I am having trouble connecting to the server.' }]);
            setShowOptions(true);
        }
    };

    const handleOptionClick = (option) => {
        if (option.type === 'navigate') {
            if (option.url.startsWith('#')) {
                const el = document.querySelector(option.url);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                    setIsOpen(false);
                }
            } else {
                window.location.href = option.url;
            }
            return;
        }

        sendMessage({ 
            type: 'quick_reply', 
            action: option.value, 
            displayText: option.label 
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage(userInput);
        }
    };

    return (
        <>
            {/* Welcome Bubble */}
            {showWelcomeBubble && !isOpen && (
                <div
                    className={styles.welcomeBubble}
                    onClick={toggleChat}
                >
                    <button
                        className={styles.welcomeClose}
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowWelcomeBubble(false);
                            setHasInteracted(true);
                        }}
                        aria-label="Dismiss"
                    >
                        <X size={12} />
                    </button>
                    Hi 👋 Need help with admissions, fees, or courses?
                </div>
            )}

            {/* Floating Chat Toggle Button */}
            <button
                className={`${styles.toggleButton} ${isOpen ? styles.active : ''}`}
                onClick={toggleChat}
                aria-label="Toggle Chatbot"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>

            {/* Chat Window */}
            <div className={`${styles.chatWindow} ${isOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <div className={styles.botInfo}>
                        <div className={styles.avatar}>CBS</div>
                        <div>
                            <span className={styles.botName}>Assistant</span>
                            <span className={styles.onlineStatus}>● Online</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button 
                            className={`${styles.settingsBtn} ${isAnimationEnabled ? styles.active : ''}`} 
                            onClick={toggleAnimation}
                            title={isAnimationEnabled ? "Disable Floating Animation" : "Enable Floating Animation"}
                        >
                            <Sparkles size={18} />
                        </button>
                        <button onClick={toggleChat} className={styles.closeBtn}>
                            <X size={18} />
                        </button>
                    </div>
                </div>

                <div className={styles.messages}>
                    {messages.map((msg, index) => {
                        // Helper to format text with bullets and line breaks
                        const formatResponse = (text) => {
                            if (!text) return "";
                            return text
                                .replace(/([•●])/g, '\n$1') // New line before bullets
                                .replace(/(\d+\.)\s/g, '\n$1 ') // New line before numbered lists
                                .replace(/(\n\s*){3,}/g, '\n\n') // Max 2 newlines
                                .trim();
                        };

                        return (
                            <div 
                                key={index} 
                                className={`${styles.message} ${styles[msg.type]} ${isAnimationEnabled ? styles.floatingMessage : ''}`}
                            >
                                {msg.type === 'bot' ? formatResponse(msg.text) : msg.text}
                            </div>
                        );
                    })}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className={`${styles.message} ${styles.bot} ${styles.typingIndicator}`}>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                        </div>
                    )}

                    {showOptions && (
                        <div className={styles.optionsGrid}>
                            {options.map((opt, index) => (
                                <button
                                    key={index}
                                    className={styles.optionBtn}
                                    onClick={() => handleOptionClick(opt)}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className={styles.footer}>
                    <button 
                        className={`${styles.micBtn} ${isListening ? styles.activeMic : ''}`}
                        onClick={handleVoiceInput}
                        title="Voice Input"
                    >
                        <Mic size={18} />
                    </button>
                    <input
                        type="text"
                        placeholder={isListening ? "Listening..." : "Type a message..."}
                        className={styles.input}
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        disabled={isListening}
                    />
                    <button className={styles.sendBtn} onClick={() => sendMessage(userInput)} disabled={isListening}>
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Chatbot;
