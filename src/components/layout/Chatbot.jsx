import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
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

    const options = [
        { label: 'Admissions Info', value: 'admissions' },
        { label: 'Courses Offered', value: 'courses' },
        { label: 'Fee Structure', value: 'fees' },
        { label: 'Placements', value: 'placements' },
        { label: 'Contact Us', value: 'contact' },
    ];

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        setMessages(prev => [...prev, { type: 'user', text }]);
        setUserInput('');
        setShowOptions(false);
        setIsTyping(true);

        try {
            const response = await fetch('http://localhost:5000/api/chatbot/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
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
        sendMessage(option.label);
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
                    <button onClick={toggleChat} className={styles.closeBtn}>
                        <X size={18} />
                    </button>
                </div>

                <div className={styles.messages}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`${styles.message} ${styles[msg.type]}`}>
                            {msg.text}
                        </div>
                    ))}

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
                            <Link to="/contact" className={styles.optionBtn} onClick={() => setIsOpen(false)}>
                                Chat with Human
                            </Link>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className={styles.footer}>
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className={styles.input}
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <button className={styles.sendBtn} onClick={() => sendMessage(userInput)}>
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Chatbot;
