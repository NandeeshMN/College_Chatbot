import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Mic, Settings, Sparkles, Volume2 } from 'lucide-react';
import styles from './Chatbot.module.css';
import { Link } from 'react-router-dom';

const numberToIndianWords = (num) => {
    const a = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if (num === 0) return 'zero';
    if (num > 999999999) return null; // Fallback for very large numbers

    const n = ('000000000' + num).slice(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return null;

    let str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + (n[1][1] == 0 ? '' : ' ' + a[n[1][1]])) + ' crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + (n[2][1] == 0 ? '' : ' ' + a[n[2][1]])) + ' lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + (n[3][1] == 0 ? '' : ' ' + a[n[3][1]])) + ' thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + (n[4][1] == 0 ? '' : ' ' + a[n[4][1]])) + ' hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? '' : '') + (a[Number(n[5])] || b[n[5][0]] + (n[5][1] == 0 ? '' : ' ' + a[n[5][1]])) : '';
    
    return str.trim();
};

const convertNumbersToIndianWords = (text) => {
    return text.replace(/(₹\s*)?(\b\d+(?:,\d+)*\b)/g, (match, p1, p2) => {
        const cleanNum = p2.replace(/,/g, '');
        const num = parseInt(cleanNum, 10);
        
        // Only convert if it has ₹ symbol, OR if it's a large number (>= 1000)
        // to avoid converting dates or small numbers unnecessarily.
        if (!p1 && num < 1000) return match;
        
        const words = numberToIndianWords(num);
        if (!words) return match; 
        
        if (p1) {
            return words + ' rupees';
        }
        return words;
    });
};

const getBestVoice = () => {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    const preferredVoices = [
        'Microsoft David',
        'Microsoft Aria',
        'Google UK English Female',
        'Google US English',
        'Microsoft Zira'
    ];

    for (const pref of preferredVoices) {
        const voice = voices.find(v => v.name.includes(pref));
        if (voice) return voice;
    }

    const englishVoice = voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) return englishVoice;

    return voices.length > 0 ? (voices.find(v => v.default) || voices[0]) : null;
};

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
        if (!('speechSynthesis' in window)) {
            alert("Speech is not supported in this browser.");
            return;
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        // Clean text: replace bullets/newlines with natural pauses
        let cleanText = text
            // Remove markdown syntax like **, *, __, _, #
            .replace(/[*_#`~]/g, '')
            // Remove common emojis
            .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1FA00}-\u{1FAFF}]/gu, '')
            // Remove leftover icons
            .replace(/[📌🎓📚📝🙏😊👋👉✔]/g, '')
            // Convert exact bullet characters to pauses
            .replace(/[•●▪]/g, ' ... ')
            // Convert consecutive line breaks into pauses
            .replace(/\n+/g, ' ... ')
            // Expand course acronyms for accurate TTS pronunciation
            .replace(/\bPUC\s*\(Commerce\)/gi, "P U C Commerce")
            .replace(/\bBCA\b/gi, "Bachelor of Computer Applications")
            .replace(/\bB\.?Com\b/gi, "Bachelor of Commerce")
            .replace(/\bBBA\b/gi, "Bachelor of Business Administration")
            .replace(/\bMCA\b/gi, "Master of Computer Applications")
            .replace(/\bMBA\b/gi, "Master of Business Administration")
            // Insert pauses after punctuation
            .replace(/([.,:;?!])\s+/g, '$1 ... ')
            // Replace multiple spaces with a single space
            .replace(/\s+/g, ' ')
            .trim();

        // Convert large numbers and currency to Indian spoken words
        cleanText = convertNumbersToIndianWords(cleanText);

        const utterance = new SpeechSynthesisUtterance(cleanText);
        
        // Setup speech options for slow, clear, natural reading
        utterance.rate = 0.85;
        utterance.pitch = 1;
        utterance.volume = 1;

        const bestVoice = getBestVoice();
        if (bestVoice) {
            utterance.voice = bestVoice;
        } else {
            utterance.lang = 'en-US';
        }

        window.speechSynthesis.speak(utterance);
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
        recognition.interimResults = true; // Enable real-time feedback
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
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }

            if (finalTranscript) {
                setUserInput(finalTranscript);
                sendMessage(finalTranscript);
            } else if (interimTranscript) {
                setUserInput(interimTranscript);
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
                        type="button"
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
