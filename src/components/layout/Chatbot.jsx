import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Mic, Settings, Sparkles, Volume2 } from 'lucide-react';
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

    const speakText = (text) => {
        if ('speechSynthesis' in window) {
            // Clean text: remove emojis, bullets, and special symbols
            const cleanText = text
                // Remove common emojis ranges
                .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1FA00}-\u{1FAFF}]/gu, '')
                // Remove specific bullet points and standalone symbols
                .replace(/[•●▪📌🎓📚📝🙏😊👋👉✔]/g, '')
                // Remove extra whitespace left behind
                .replace(/\s+/g, ' ')
                .trim();

            // Cancel any ongoing speech
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.lang = 'en-IN';
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Sorry, your browser doesn't support text to speech!");
        }
    };

    const handleVoiceInput = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Your browser does not support voice input. Please try Chrome or Edge.");
            return;
        }

        // If already listening, stop it
        if (isListening) {
            window.chatbotRecognition?.stop();
            return;
        }

        const recognition = new SpeechRecognition();
        window.chatbotRecognition = recognition; // Store in window to allow stopping
        
        recognition.lang = 'en-IN';
        recognition.interimResults = false;
        recognition.continuous = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onend = () => {
            setIsListening(false);
            window.chatbotRecognition = null;
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (transcript) {
                setUserInput(transcript);
                sendMessage(transcript);
            }
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
            
            if (event.error === 'not-allowed') {
                alert("Microphone access denied. Please enable microphone permissions in your browser settings.");
            } else if (event.error === 'network') {
                alert("Network error occurred. Voice recognition requires an internet connection.");
            } else if (event.error === 'no-speech') {
                // Ignore no-speech error as it's common and handled by onend
            } else {
                alert("Speech recognition error: " + event.error);
            }
        };

        try {
            recognition.start();
        } catch (err) {
            console.error("Failed to start recognition:", err);
            setIsListening(false);
        }
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
                        // Helper to normalize and render text with proper line breaks and formatting
                        const formatResponse = (text) => {
                            if (!text) return null;

                            // 1. Normalize Unicode quirks
                            let normalized = text
                                .replace(/\u00a0/g, ' ')        // non-breaking space → regular space
                                .replace(/\u2014/g, '\u2014')   // keep em-dash as-is for now
                                .replace(/\r\n/g, '\n')         // Windows CRLF → LF
                                .replace(/\r/g, '\n');           // old Mac CR → LF

                            // 2. Ensure bullet symbols get their own line
                            normalized = normalized
                                .replace(/([•●▪])\s*/g, '\n$1 ')
                                .replace(/(\d+\.)\s+/g, '\n$1 ')
                                .replace(/(\n\s*){3,}/g, '\n\n') // collapse 3+ blank lines → max 2
                                .trim();

                            // 3. Split into lines and render each as a <div>
                            const lines = normalized.split('\n');

                            return lines.map((line, i) => {
                                const trimmed = line.trim();
                                if (!trimmed) {
                                    // Blank line → small spacer
                                    return <div key={i} style={{ height: '6px' }} />;
                                }

                                // 4. Convert "• Name — Designation" → "• Name (Designation)"
                                //    Matches bullet + text + em-dash + designation at end of line
                                const bulletEmDash = trimmed.match(/^([•●▪]\s*)(.+?)\s*\u2014\s*(.+)$/);
                                if (bulletEmDash) {
                                    const [, bullet, name, designation] = bulletEmDash;
                                    return (
                                        <div key={i} style={{ marginBottom: '4px', lineHeight: '1.55' }}>
                                            {bullet}<strong>{name}</strong>{` (${designation})`}
                                        </div>
                                    );
                                }

                                // 5. Plain bullet line (no em-dash)
                                if (/^[•●▪]/.test(trimmed)) {
                                    return (
                                        <div key={i} style={{ marginBottom: '4px', lineHeight: '1.55' }}>
                                            {trimmed}
                                        </div>
                                    );
                                }

                                // 6. Numbered list item
                                if (/^\d+\./.test(trimmed)) {
                                    return (
                                        <div key={i} style={{ marginBottom: '4px', lineHeight: '1.55', paddingLeft: '4px' }}>
                                            {trimmed}
                                        </div>
                                    );
                                }

                                // 7. Regular paragraph line
                                return (
                                    <div key={i} style={{ marginBottom: '2px', lineHeight: '1.6' }}>
                                        {trimmed}
                                    </div>
                                );
                            });
                        };

                        return (
                            <div 
                                key={index} 
                                className={`${styles.message} ${styles[msg.type]} ${isAnimationEnabled ? styles.floatingMessage : ''}`}
                                style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}
                            >
                                {msg.type === 'bot' && (
                                    <button
                                        onClick={() => speakText(msg.text)}
                                        title="Listen"
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: '#1a365d',
                                            padding: '2px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            opacity: 0.7,
                                            marginTop: '2px'
                                        }}
                                        onMouseEnter={(e) => e.target.style.opacity = 1}
                                        onMouseLeave={(e) => e.target.style.opacity = 0.7}
                                    >
                                        <Volume2 size={16} />
                                    </button>
                                )}
                                <div>
                                    {msg.type === 'bot' ? formatResponse(msg.text) : msg.text}
                                </div>
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
