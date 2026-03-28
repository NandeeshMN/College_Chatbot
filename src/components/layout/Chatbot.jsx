import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import styles from './Chatbot.module.css';
import { Link } from 'react-router-dom';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Namaste! Welcome to Chetan Business School. How can I assist you today?' }
    ]);
    const [showOptions, setShowOptions] = useState(true);
    const [userInput, setUserInput] = useState('');

    const toggleChat = () => setIsOpen(!isOpen);

    const options = [
        { label: 'Admissions Info', value: 'admissions' },
        { label: 'Courses Offered', value: 'courses' },
        { label: 'Fee Structure', value: 'fees' },
        { label: 'Placements', value: 'placements' },
        { label: 'Contact Us', value: 'contact' },
    ];

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { type: 'user', text }]);
        setUserInput('');
        setShowOptions(false);

        try {
            const response = await fetch('http://localhost:5000/api/chatbot/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: text })
            });
            const data = await response.json();
            setMessages(prev => [...prev, { type: 'bot', text: data.response }]);
            setShowOptions(true);
        } catch (error) {
            console.error(error);
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
            <button
                className={`${styles.toggleButton} ${isOpen ? styles.active : ''}`}
                onClick={toggleChat}
                aria-label="Toggle Chatbot"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>

            <div className={`${styles.chatWindow} ${isOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <div className={styles.botInfo}>
                        <div className={styles.avatar}>CBS</div>
                        <span className={styles.botName}>Assistant</span>
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
