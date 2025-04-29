# Heart Disease Prediction API

A FastAPI application that serves a CardioTabNet model for heart disease prediction.

## Setup

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Make sure you have the following files in the same directory:
   - `scaler.pkl`: The StandardScaler model for normalizing input features
   - `cardio_tabnet_best.pt`: The trained CardioTabNet model weights

## Running the API

Start the API server:
```
python app.py
```

Or with uvicorn directly:
```
uvicorn app:app --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`.

## API Endpoints

### Health Check
- **URL**: `/`
- **Method**: `GET`
- **Response**: `{"message": "Heart Disease Prediction API is running"}`

### Make Prediction
- **URL**: `/predict`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "age": 65,
    "sex": 1,
    "cp": 3,
    "trestbps": 140,
    "chol": 250,
    "fbs": 0,
    "restecg": 1,
    "thalach": 150,
    "exang": 0,
    "oldpeak": 1.5,
    "slope": 2,
    "ca": 0,
    "thal": 3
  }
  ```
- **Response**:
  ```json
  {
    "prediction": 1,
    "probability": 0.95,
    "confidence": "High"
  }
  ```

### Input Fields:
- `age`: Age of the patient (years)
- `sex`: Gender (1 = male, 0 = female)
- `cp`: Chest pain type (0-3)
- `trestbps`: Resting blood pressure (mm Hg)
- `chol`: Serum cholesterol (mg/dl)
- `fbs`: Fasting blood sugar > 120 mg/dl (1 = true, 0 = false)
- `restecg`: Resting electrocardiographic results (0-2)
- `thalach`: Maximum heart rate achieved
- `exang`: Exercise induced angina (1 = yes, 0 = no)
- `oldpeak`: ST depression induced by exercise relative to rest
- `slope`: Slope of the peak exercise ST segment (0-2)
- `ca`: Number of major vessels colored by fluoroscopy (0-3)
- `thal`: Thalassemia (3 = normal, 6 = fixed defect, 7 = reversible defect)

### Response Fields:
- `prediction`: 0 = no heart disease, 1 = has heart disease
- `probability`: Probability of heart disease (between 0 and 1)
- `confidence`: Confidence of prediction (Low, Medium, or High)

## Interactive Documentation

FastAPI provides interactive API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc` 