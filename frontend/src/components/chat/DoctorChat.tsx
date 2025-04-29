import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

type Message = {
  id: string;
  content: string;
  sender: 'doctor' | 'patient';
  timestamp: Date;
};

export function DoctorChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [activePatient, setActivePatient] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Sample patients data - in a real app, this would come from an API
  const patients = [
    { id: '1', name: 'John Doe', lastMessage: "I've been experiencing chest pain lately" },
    { id: '2', name: 'Jane Smith', lastMessage: 'My blood pressure readings are high' },
    { id: '3', name: 'Robert Johnson', lastMessage: 'Is this medication suitable for me?' },
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  // Function to handle sending messages
  const handleSendMessage = async (content: string = inputValue) => {
    if (!content.trim() || !activePatient) return;

    // Add doctor's message
    const doctorMessage: Message = {
      id: generateId(),
      content,
      sender: 'doctor',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, doctorMessage]);
    setInputValue('');

    // Simulate typing indicator and response
    setTimeout(() => {
      // Simulate patient response
      const patientResponse: Message = {
        id: generateId(),
        content: "Thank you for your response, doctor. I'll follow your advice.",
        sender: 'patient',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, patientResponse]);
    }, 1000);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const selectPatient = (patientId: string) => {
    setActivePatient(patientId);
    
    // Clear previous conversation
    setMessages([]);
    
    // Add initial message from patient
    const selectedPatient = patients.find(p => p.id === patientId);
    
    if (selectedPatient) {
      const initialMessage: Message = {
        id: generateId(),
        content: selectedPatient.lastMessage,
        sender: 'patient',
        timestamp: new Date(),
      };
      
      setMessages([initialMessage]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 md:w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden"
          >
            {/* Chat header */}
            <div className="bg-red-600 text-white p-4">
              <h3 className="font-medium">Doctor Chat</h3>
              <p className="text-sm text-red-100">
                {user?.name || 'Doctor'} | Online
              </p>
            </div>

            {/* Chat content */}
            <div className="flex-1 overflow-hidden flex">
              {/* Patient list (only visible when no active patient) */}
              {!activePatient && (
                <div className="w-full p-4 overflow-auto">
                  <h4 className="font-medium text-gray-700 mb-3">Your Patients</h4>
                  <div className="space-y-2">
                    {patients.map((patient) => (
                      <button
                        key={patient.id}
                        onClick={() => selectPatient(patient.id)}
                        className="w-full p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-left transition-colors"
                      >
                        <div className="font-medium text-gray-800">{patient.name}</div>
                        <div className="text-sm text-gray-500 truncate">{patient.lastMessage}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages (only visible when there's an active patient) */}
              {activePatient && (
                <div className="w-full flex flex-col">
                  <div className="p-2 border-b">
                    <button 
                      onClick={() => setActivePatient(null)}
                      className="text-sm text-gray-600 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to patients
                    </button>
                  </div>
                  <div className="flex-1 p-4 overflow-auto">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`mb-3 max-w-[80%] ${
                          message.sender === 'doctor' ? 'ml-auto' : 'mr-auto'
                        }`}
                      >
                        <div
                          className={`rounded-lg p-3 ${
                            message.sender === 'doctor'
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {message.content}
                        </div>
                        <div
                          className={`text-xs mt-1 ${
                            message.sender === 'doctor' ? 'text-right' : ''
                          } text-gray-500`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input area */}
                  <div className="p-4 border-t">
                    <div className="flex rounded-lg border overflow-hidden">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSendMessage();
                          }
                        }}
                        placeholder="Type your message..."
                        className="flex-1 p-2 outline-none"
                      />
                      <button
                        onClick={() => handleSendMessage()}
                        disabled={!inputValue.trim()}
                        className="bg-red-600 text-white p-2 px-4 disabled:opacity-50"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 