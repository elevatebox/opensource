from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline

# Initialize the app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (update for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class AnalyzeRequest(BaseModel):
    content: str

# Initialize the ML model
classifier = pipeline("sentiment-analysis", model="bert-base-uncased")

@app.post("/analyze")
def analyze(request: AnalyzeRequest):
    # Process the input content
    result = classifier(request.content[:512])
    score = result[0]["score"] if "score" in result[0] else result[0]["label"]
    return {"score": score}
