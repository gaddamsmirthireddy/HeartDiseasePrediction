import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Button } from '../ui/button';

// Define message types
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Initial messages to show when chat is opened
const initialMessages: Message[] = [
  {
    id: '1',
    content: "Hello! I'm your Heart Health Assistant. How can I help you today?",
    sender: 'bot',
    timestamp: new Date(),
  },
];

// Suggested questions for users
const suggestedQuestions = [
  'What are common heart disease symptoms?',
  'How can I lower my cholesterol?',
  'What lifestyle changes can reduce heart risks?',
  'Can you explain what blood pressure numbers mean?',
  'What foods are good for heart health?',
];

// Mock responses for the chatbot
const botResponses: Record<string, string[]> = {
  greeting: [
    "Hello! How can I help you with your heart health today?",
    "Hi there! I'm your Heart Health Assistant. What questions do you have about heart health?",
    "Welcome! I'm here to answer your heart health questions. What would you like to know?"
  ],
  symptoms: [
    "Common heart disease symptoms include chest pain, shortness of breath, fatigue, and irregular heartbeat. If you're experiencing these symptoms, please consult a doctor promptly.",
    "Heart attack symptoms may include chest pressure, pain in the arm/jaw/back, shortness of breath, cold sweat, and nausea. If you suspect a heart attack, call emergency services immediately.",
    "Symptoms requiring immediate attention include severe chest pain, difficulty breathing, fainting, and intense palpitations. Please seek emergency medical help for these symptoms."
  ],
  prevention: [
    "To maintain heart health: exercise regularly, eat a balanced diet low in saturated fats, don't smoke, limit alcohol, manage stress, and get regular checkups.",
    "Diet tips for heart health: eat plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats like those found in olive oil and avocados.",
    "Aim for at least 150 minutes of moderate exercise per week for heart health. Activities like walking, swimming, and cycling are excellent options."
  ],
  appointment: [
    "You can book an appointment with a cardiologist through our Appointments page. Would you like me to direct you there?",
    "Our platform connects you with qualified heart specialists. Check the Appointments section to schedule a consultation.",
    "For a personalized assessment, I recommend scheduling an appointment with one of our heart specialists."
  ],
  predictor: [
    "Our Heart Disease Predictor tool uses AI to assess your risk based on various health factors. Would you like to try it?",
    "The Heart Disease Predictor analyzes factors like blood pressure, cholesterol, age, and lifestyle to estimate risk.",
    "For a preliminary heart disease risk assessment, you can use our Predictor tool. It's quick and confidential."
  ],
  default: [
    "I'm not sure I understand. Could you rephrase your question about heart health?",
    "I don't have information on that specific topic. Would you like to know about heart disease symptoms, prevention, or our services instead?",
    "I'm specialized in heart health information. If you have questions about symptoms, prevention, or our services, I'd be happy to help."
  ]
}

// Get a random response from a category
const getRandomResponse = (category: string): string => {
  const responses = botResponses[category] || botResponses.default
  return responses[Math.floor(Math.random() * responses.length)]
}

// Analyze user message to determine the appropriate response category
const analyzeMessage = (message: string): string => {
  const lowerMsg = message.toLowerCase()
  
  if (/^(hi|hello|hey|greetings)/i.test(lowerMsg)) {
    return 'greeting'
  } else if (/(\bsymptom|\bpain|\bchest|\bbreath|\bheart\s?attack|\bdiscomfort)/i.test(lowerMsg)) {
    return 'symptoms'
  } else if (/(\bprevention|\bhealth|\bdiet|\bexercise|\bfood|\beat|\bactivity)/i.test(lowerMsg)) {
    return 'prevention'
  } else if (/(\bappointment|\bdoctor|\bspecialist|\bconsultation|\bbook|\bschedule)/i.test(lowerMsg)) {
    return 'appointment'
  } else if (/(\bpredictor|\brisk|\btest|\bassessment|\bpredict|\bcheck)/i.test(lowerMsg)) {
    return 'predictor'
  } else {
    return 'default'
  }
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Function to generate a unique ID
  const generateId = () => Math.random().toString(36).substring(2, 9);
  
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);
  
  const handleSendMessage = async (content: string = inputValue) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Gemini API integration would go here
      // For demo purposes, we'll simulate a response
      
      // In production, replace this with actual Gemini API call:
      /*
      const genAI = new GoogleGenerativeAI('YOUR_API_KEY');
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `You are a helpful heart health assistant. 
      Provide accurate, medically sound information about heart disease, risk factors, 
      and heart health in general. Be informative but concise.
      
      User query: ${content}`;
      
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      */
      
      // Simulated response
      let response;
      
      // Simulate different responses based on keywords
      const lowerCaseContent = content.toLowerCase();
      
      if (lowerCaseContent.includes('symptom')) {
        response = "Common heart disease symptoms include chest pain or discomfort, shortness of breath, pain/numbness in arms or legs, neck/jaw/throat/upper abdomen pain, and fatigue. Women may experience different symptoms like unusual fatigue, sleep disturbances, or shortness of breath. If you experience chest pain or multiple symptoms, seek medical attention immediately.";
      } else if (lowerCaseContent.includes('cholesterol')) {
        response = "To lower cholesterol naturally: 1) Eat heart-healthy foods (reduce saturated fats, eliminate trans fats, eat foods rich in omega-3s), 2) Exercise regularly, 3) Quit smoking, 4) Maintain healthy weight, 5) Limit alcohol consumption. Medications like statins may be prescribed by your doctor if lifestyle changes aren't enough.";
      } else if (lowerCaseContent.includes('lifestyle') || lowerCaseContent.includes('change')) {
        response = "Key lifestyle changes for heart health: 1) Regular physical activity (aim for 150 minutes/week), 2) Heart-healthy diet rich in fruits, vegetables, and whole grains, 3) Maintain healthy weight, 4) Reduce and manage stress, 5) Quit smoking, 6) Limit alcohol, 7) Get quality sleep, 8) Regular health check-ups to monitor blood pressure, cholesterol and blood sugar.";
      } else if (lowerCaseContent.includes('pressure') || lowerCaseContent.includes('bp')) {
        response = "Blood pressure readings have two numbers: Systolic (top number) measures pressure during heartbeats, while diastolic (bottom number) measures pressure between beats. Normal: below 120/80 mmHg. Elevated: 120-129/<80 mmHg. Hypertension Stage 1: 130-139/80-89 mmHg. Hypertension Stage 2: 140+/90+ mmHg. Hypertensive crisis: 180+/120+ mmHg (requires immediate medical attention).";
      } else if (lowerCaseContent.includes('food') || lowerCaseContent.includes('diet') || lowerCaseContent.includes('eat')) {
        response = "Heart-healthy foods include: 1) Leafy green vegetables, 2) Whole grains, 3) Berries and other fruits, 4) Fatty fish rich in omega-3s (salmon, mackerel), 5) Nuts and seeds, 6) Legumes, 7) Olive oil, 8) Avocados, 9) Low-fat dairy, and 10) Dark chocolate (in moderation). Limit processed foods, sodium, saturated fats, and added sugars.";
      } else if (lowerCaseContent.includes('risk') || lowerCaseContent.includes('factor')) {
        response = "Major heart disease risk factors include: 1) Age (men ≥45, women ≥55), 2) Family history, 3) Smoking, 4) High blood pressure, 5) High cholesterol, 6) Diabetes, 7) Obesity, 8) Physical inactivity, 9) Unhealthy diet, 10) Excessive alcohol, 11) Stress, and 12) Poor sleep. Some factors cannot be changed (age, genetics), but many can be managed through lifestyle changes and medication.";
      } else if (lowerCaseContent.includes('exercise') || lowerCaseContent.includes('workout')) {
        response = "For heart health, aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity weekly, plus muscle-strengthening exercises twice weekly. Good options include walking, jogging, cycling, swimming, and interval training. Always start gradually and consult your doctor before beginning a new exercise program, especially if you have existing heart conditions.";
      } else {
        response = "I'm here to provide general information about heart health, risk factors, and disease prevention. While I can offer health education, I'm not a substitute for professional medical advice. If you have specific health concerns, please consult with a healthcare provider for personalized guidance.";
      }
      
      // Simulate delay for more realistic experience
      setTimeout(() => {
        const botMessage: Message = {
          id: generateId(),
          content: response,
          sender: 'bot',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 1200);
      
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: generateId(),
        content: 'I apologize, but I encountered an error processing your request. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };
  
  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };
  
  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      <Button
        className="w-14 h-14 rounded-full shadow-lg"
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </Button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Chat header */}
            <div className="bg-primary text-white px-4 py-3 flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Heart Health Assistant</h3>
                <p className="text-xs text-primary">Powered by Gemini AI</p>
              </div>
            </div>
            
            {/* Messages container */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user' 
                        ? 'bg-primary text-white rounded-br-none' 
                        : 'bg-white border border-gray-200 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-white border border-gray-200 rounded-lg rounded-bl-none p-3 shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Anchor for auto-scrolling */}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Suggested questions */}
            {messages.length <= 2 && (
              <div className="p-3 border-t border-gray-200 bg-white">
                <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionClick(question)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Input area */}
            <div className="p-3 border-t border-gray-200 bg-white">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-2 text-center">
                For medical emergencies, please call emergency services immediately.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 