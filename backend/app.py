from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import torch
import numpy as np
import joblib
from fastapi.middleware.cors import CORSMiddleware

# Define the CardioTabNet model
class CardioTabNet(torch.nn.Module):
    def __init__(self, input_dim, embed_dim=32, num_heads=4, num_layers=2, mlp_hidden=64):
        super().__init__()
        # Embedding layers per feature
        self.fc_embed = torch.nn.Linear(input_dim, embed_dim)
        # Transformer encoder
        encoder_layer = torch.nn.TransformerEncoderLayer(
            d_model=embed_dim, nhead=num_heads, dim_feedforward=mlp_hidden, dropout=0.1, batch_first=True
        )
        self.transformer = torch.nn.TransformerEncoder(encoder_layer, num_layers=num_layers)
        # Classifier head
        self.classifier = torch.nn.Sequential(
            torch.nn.Linear(embed_dim, mlp_hidden),
            torch.nn.ReLU(),
            torch.nn.Dropout(0.1),
            torch.nn.Linear(mlp_hidden, 2)
        )

    def forward(self, x):
        x = self.fc_embed(x)            # [batch, embed_dim]
        x = self.transformer(x)         # [batch, embed_dim]
        logits = self.classifier(x)
        return logits

# Load model and scaler
try:
    # Load the scaler
    scaler = joblib.load('scaler.pkl')
    
    # Initialize model with correct input dimensions
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = CardioTabNet(input_dim=13).to(device)  # 13 features as per the dataset
    
    # Load model weights if they exist
    try:
        model.load_state_dict(torch.load('cardio_tabnet_best.pt', map_location=device))
        model.eval()
    except FileNotFoundError:
        print("Warning: Model weights file not found. Using randomly initialized model.")
except Exception as e:
    print(f"Error loading model components: {e}")
    # We'll handle this more gracefully in the endpoint

# Create FastAPI app
app = FastAPI(title="Heart Disease Prediction API")

# Configure CORS to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define input data model
class PatientData(BaseModel):
    age: int
    sex: int  # 1 = male, 0 = female
    cp: int  # chest pain type
    trestbps: int  # resting blood pressure
    chol: int  # serum cholesterol in mg/dl
    fbs: int  # fasting blood sugar > 120 mg/dl (1=true; 0=false)
    restecg: int  # resting electrocardiographic results
    thalach: int  # maximum heart rate achieved
    exang: int  # exercise induced angina (1=yes; 0=no)
    oldpeak: float  # ST depression induced by exercise relative to rest
    slope: int  # the slope of the peak exercise ST segment
    ca: int  # number of major vessels colored by fluoroscopy (0-3)
    thal: int  # thalassemia (3=normal; 6=fixed defect; 7=reversible defect)

# Define prediction response model
class PredictionResponse(BaseModel):
    prediction: int  # 0 = no heart disease, 1 = heart disease
    probability: float  # Probability of heart disease
    confidence: str  # Confidence level (Low, Medium, High)

@app.get("/")
def read_root():
    return {"message": "Heart Disease Prediction API is running"}

@app.post("/predict", response_model=PredictionResponse)
def predict(data: PatientData):
    try:
        # Convert input data to numpy array in the correct order
        input_data = np.array([
            data.age, data.sex, data.cp, data.trestbps, data.chol, 
            data.fbs, data.restecg, data.thalach, data.exang, 
            data.oldpeak, data.slope, data.ca, data.thal
        ]).reshape(1, -1)
        
        # Scale the input data
        input_scaled = scaler.transform(input_data)
        
        # Convert to tensor
        input_tensor = torch.tensor(input_scaled, dtype=torch.float32).to(device)
        
        # Get prediction
        with torch.no_grad():
            output = model(input_tensor)
            probabilities = torch.softmax(output, dim=1).cpu().numpy()[0]
            
        # Get class and probability
        prediction = int(np.argmax(probabilities))
        probability = float(probabilities[1])  # Probability of heart disease (class 1)
        
        # Determine confidence level
        confidence = "Low"
        if probability > 0.8 or probability < 0.2:
            confidence = "High"
        elif 0.4 <= probability <= 0.6:
            confidence = "Low"
        else:
            confidence = "Medium"
        
        return {
            "prediction": prediction,
            "probability": probability,
            "confidence": confidence
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 