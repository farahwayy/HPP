import { useState, useEffect } from 'react';
import axios from 'axios';
import ChatBotImage from '../assets/ChatBot_pfp.png'; // ✅ Rename the image import

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [crmResponse, setCrmResponse] = useState<string>('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([
    { text: "Hello! How can I help you today?", isUser: false }
  ]);

  useEffect(() => {
    const getCRMResponse = async () => {
      try {
        const response = await axios.get('https://crm-pkht.onrender.com/');
        setCrmResponse(response.data);
        console.log('CRM API Response:', response.data);
      } catch (err) {
        console.error('Error connecting to CRM API:', err);
        setCrmResponse('Error connecting to CRM API');
      }
    };

    getCRMResponse();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to chat
    setMessages(prev => [...prev, { text: message, isUser: true }]);

    try {
      // Send message to CRM API
      const response = await axios.post('https://crm-pkht.onrender.com/message', {
        message: message
      });

      // Add bot response to chat
      setMessages(prev => [...prev, { text: response.data, isUser: false }]);
    } catch (err) {
      console.error('Error sending message:', err);
      setMessages(prev => [...prev, { text: "Sorry, I couldn't process your message.", isUser: false }]);
    }

    setMessage(''); // Clear input
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-[#005F92] hover:bg-[#0077B6] text-white p-4 rounded-full shadow-lg text-lg font-bold"
          aria-label="Open chat"
        >
          💬
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#005F92] text-white px-4 py-2 flex justify-between items-center">
            <span className="font-semibold">Medical HelpBot</span>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white text-xl font-bold"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Chat area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, index) => (
              msg.isUser ? (
                <div key={index} className="flex items-end justify-end">
                  <div className="bg-[#005F92] text-white p-2 rounded-lg max-w-xs">
                    <p>{msg.text}</p>
                  </div>
                </div>
              ) : (
                <div key={index} className="flex items-start space-x-2">
                  <img 
                    src={ChatBotImage} 
                    alt="ChatBot Avatar" 
                    className="w-8 h-8 rounded-full object-cover" 
                  />
                  <div className="bg-gray-100 p-2 rounded-lg max-w-xs">
                    <p>{msg.text}</p>
                  </div>
                </div>
              )
            ))}
          </div>

          {/* Input box */}
          <div className="p-2 bg-gray-100 flex items-center gap-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 text-sm rounded-lg outline-none bg-white resize-none"
              rows={1}
            />
            <button 
              onClick={sendMessage}
              className="bg-[#005F92] hover:bg-[#0077B6] text-white px-4 py-2 rounded-full text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
