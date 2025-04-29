import requests
import json

# URL of the API
url = "http://localhost:8000/predict"

# Sample data - high risk of heart disease
high_risk_data = {
    "age": 65,
    "sex": 1,
    "cp": 3,
    "trestbps": 170,
    "chol": 290,
    "fbs": 1,
    "restecg": 2,
    "thalach": 125,
    "exang": 1,
    "oldpeak": 2.5,
    "slope": 0,
    "ca": 3,
    "thal": 7
}

# Sample data - low risk of heart disease
low_risk_data = {
    "age": 40,
    "sex": 0,
    "cp": 0,
    "trestbps": 120,
    "chol": 180,
    "fbs": 0,
    "restecg": 0,
    "thalach": 170,
    "exang": 0,
    "oldpeak": 0.0,
    "slope": 2,
    "ca": 0,
    "thal": 3
}

def test_prediction(data):
    try:
        # Make the POST request
        response = requests.post(url, json=data)
        
        # Check if the request was successful
        if response.status_code == 200:
            result = response.json()
            print(f"Prediction: {'Heart Disease' if result['prediction'] == 1 else 'No Heart Disease'}")
            print(f"Probability: {result['probability']:.2f}")
            print(f"Confidence: {result['confidence']}")
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    print("Testing API with high risk patient data:")
    test_prediction(high_risk_data)
    
    print("\nTesting API with low risk patient data:")
    test_prediction(low_risk_data)
    
    print("\nAPI test complete!") 