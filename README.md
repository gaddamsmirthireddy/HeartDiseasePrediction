# Heart Disease Prediction Platform

A comprehensive web application that combines AI-powered heart disease prediction with healthcare management features. This platform connects patients with cardiologists and provides tools for monitoring heart health.

![Heart Health Platform](frontend/public/logo.svg)

## Features

### For Patients
- **AI-Powered Heart Disease Prediction**: Uses machine learning to assess heart disease risk based on health parameters
- **Doctor Appointments**: Schedule virtual or in-person consultations with cardiologists
- **Hospital Finder**: Locate cardiac care facilities nearby with filtering by services, ratings, and distance
- **Health Dashboard**: Track and visualize heart health metrics over time
- **AI Health Assistant**: Get immediate answers to heart health questions through our chatbot

### For Doctors
- **Patient Management**: View and manage patient consultations
- **Appointment Management**: Handle scheduling and patient records
- **Secure Messaging**: Communicate with patients through an encrypted chat system

### For Administrators
- **Platform Analytics**: Monitor usage patterns and user engagement
- **Provider Management**: Add and manage healthcare providers in the system

## Tech Stack

### Frontend
- **React**: For building the user interface
- **TypeScript**: For type-safe code
- **React Router**: For navigation
- **Tailwind CSS**: For styling components

### Backend
- **Python**: Core backend language
- **Flask**: Web framework for API endpoints
- **PyTorch**: For machine learning model deployment
- **SQLite/PostgreSQL**: For database storage

## Project Structure

```
├── frontend/              # React frontend application
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
│   └── ...
│
└── backend/               # Python Flask backend
    ├── app.py             # Main application entry point
    ├── cardio_tabnet_best.pt # Trained model file
    ├── scaler.pkl         # Feature scaler for preprocessing
    └── ...
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- pip

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app.py
```

## Deployment

### Vercel Deployment Configuration
To deploy this project on Vercel, use the following settings:

- **Build Command**: `npm run vercel-build` or `npm run build`
- **Output Directory**: `public` if it exists, or `.`
- **Install Command**: `yarn install`, `pnpm install`, `npm install`, or `bun install`

Make sure to navigate to the frontend directory before applying these settings:
```bash
cd frontend
```

For a full-stack deployment, you'll need to deploy the backend separately on a service that supports Python (like Heroku, Railway, or Render) and update the API endpoint in the frontend configuration.

## Model Information

The heart disease prediction model uses TabNet architecture trained on cardiovascular health data. It analyzes various parameters including:
- Age
- Gender
- Blood pressure
- Cholesterol levels
- Blood glucose
- Smoking status
- Physical activity levels
- And more...

## Future Enhancements

- **Mobile Application**: Native mobile apps for iOS and Android
- **Wearable Integration**: Connect with fitness trackers and smartwatches for real-time health monitoring
- **Video Consultations**: Built-in telehealth functionality
- **Electronic Health Records**: Integration with hospital EHR systems

## Contributors

- Smirthi Reddy ([@gaddamsmirthireddy](https://github.com/gaddamsmirthireddy))

## License

This project is licensed under the MIT License - see the LICENSE file for details. 