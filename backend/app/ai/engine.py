from textblob import TextBlob
import spacy
from typing import Dict, List
import copy
import logging

try:
    from google import genai
    from app.core.config import settings
    # Initialize genai client only if key is available
    if settings.GEMINI_API_KEY:
        ai_client = genai.Client(api_key=settings.GEMINI_API_KEY)
    else:
        ai_client = None
except ImportError:
    ai_client = None

# Load SpaCy small model (fast extraction)
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    logging.warning("Downloading en_core_web_sm model...")
    import spacy.cli
    spacy.cli.download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

class NLPEngine:
    @staticmethod
    def analyze_sentiment(text: str) -> Dict[str, any]:
        """
        Uses TextBlob for rapid sentiment prototyping. 
        In production, this would use a DistilBERT pipeline.
        """
        blob = TextBlob(text)
        polarity = blob.sentiment.polarity
        
        if polarity > 0.1:
            sentiment = "positive"
        elif polarity < -0.1:
            sentiment = "negative"
        else:
            sentiment = "neutral"
            
        # Mock confidence based on absolute polarity strength
        confidence = min(abs(polarity) + 0.5, 0.99)
        if sentiment == "neutral":
            confidence = 0.85
            
        return {
            "sentiment": sentiment,
            "confidence": round(confidence, 2)
        }

    @staticmethod
    def analyze_emotions(text: str) -> Dict[str, float]:
        """
        Mocked emotion detection for demonstration. 
        Production uses HuggingFace Transformers (e.g. j-hartmann/emotion-english-distilroberta-base)
        """
        text = text.lower()
        has_joy = any(w in text for w in ["love", "happy", "great", "excellent", "good"])
        has_anger = any(w in text for w in ["hate", "bad", "terrible", "worst", "angry", "baffling"])
        has_sadness = any(w in text for w in ["sad", "depressed", "sorry"])
        has_fear = any(w in text for w in ["scared", "fear", "worried", "panic"])
        
        return {
            "joy": 0.8 if has_joy else 0.1,
            "anger": 0.9 if has_anger else 0.05,
            "fear": 0.7 if has_fear else 0.05,
            "sadness": 0.6 if has_sadness else 0.1,
            "surprise": 0.4 # Default
        }

    @staticmethod
    def extract_topics(text: str) -> Dict[str, List[str]]:
        """Uses SpaCy for Named Entity Recognition and Keyword extraction."""
        doc = nlp(text)
        
        entities = list(set([ent.text for ent in doc.ents if ent.label_ in ["ORG", "PRODUCT", "GPE", "PERSON"]]))
        
        # Extract noun chunks as topics
        keywords = list(set([chunk.text.lower() for chunk in doc.noun_chunks if len(chunk.text) > 3]))
        
        return {
            "keywords": keywords[:5],
            "entities": entities[:5]
        }
        
    @staticmethod
    def generate_summary(texts: List[str]) -> str:
        """
        Uses Gemini API for generative summarization of public opinion.
        Falls back to basic concatenation if no key is provided.
        """
        if not ai_client:
            return "Gemini API key not configured. Summary unavailable."
            
        prompt = (
            "Analyze the following social media/user comments and generate a concise executive summary "
            "highlighting public opinion, sentiment insights, and trend explanations.\n\nComments:\n" +
            "\n".join([f"- {t}" for t in texts[:20]]) # Limit to avoid huge prompts
        )
        
        try:
            response = ai_client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
            )
            return response.text
        except Exception as e:
            return f"Error generating summary: {str(e)}"
