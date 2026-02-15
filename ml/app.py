from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
from io import BytesIO
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

# Allow backend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------
# Load Embedding Model (Semantic AI)
# -------------------------------------------
model = SentenceTransformer("all-MiniLM-L6-v2")

# -------------------------------------------
# Predefined skill dictionary
# -------------------------------------------
SKILL_KEYWORDS = [
    "python", "java", "javascript", "react", "node", "spring", "spring boot",
    "html", "css", "mongodb", "mysql", "machine learning", "deep learning",
    "nlp", "data analysis", "docker", "git", "api", "rest", "tensorflow"
]

# -------------------------------------------
# Job role descriptions
# -------------------------------------------
JOB_ROLES = {
    "Backend Developer": "Develop and maintain server-side applications using Java, Spring Boot, APIs, databases and backend architecture.",
    "Frontend Developer": "Build responsive user interfaces using JavaScript, React, HTML, CSS and modern frontend tools.",
    "Full Stack Developer": "Work on both frontend and backend using React, Node, databases, APIs and full stack architecture.",
    "Data Analyst": "Analyze data using Python, statistics, Excel, visualization tools and generate insights.",
    "Machine Learning Engineer": "Build and train machine learning models using Python, TensorFlow, NLP and AI techniques."
}

# Precompute role embeddings once (efficient)
role_names = list(JOB_ROLES.keys())
role_texts = list(JOB_ROLES.values())
role_embeddings = model.encode(role_texts)

# -------------------------------------------
# PDF TEXT EXTRACTION
# -------------------------------------------
def extract_text_from_pdf(pdf_bytes):
    reader = PyPDF2.PdfReader(BytesIO(pdf_bytes))
    text = ""
    for page in reader.pages:
        extracted = page.extract_text()
        if extracted:
            text += extracted
    return text.lower()

# -------------------------------------------
# Skill Extraction
# -------------------------------------------
def extract_skills(text):
    found = []
    for skill in SKILL_KEYWORDS:
        if skill in text:
            found.append(skill)
    return list(set(found))

# -------------------------------------------
# Semantic Role Matching
# -------------------------------------------
def get_best_role(text):
    candidate_embedding = model.encode([text])

    similarities = cosine_similarity(candidate_embedding, role_embeddings)[0]

    best_index = np.argmax(similarities)
    best_role = role_names[best_index]
    match_percentage = round(float(similarities[best_index] * 100), 2)

    return best_role, match_percentage

# -------------------------------------------
# MAIN ENDPOINT
# -------------------------------------------
@app.post("/analyze")
async def analyze_resume(file: UploadFile = File(...)):
    pdf_bytes = await file.read()
    text = extract_text_from_pdf(pdf_bytes)

    skills = extract_skills(text)
    best_role, match = get_best_role(text)

    return {
        "skills": skills,
        "best_role": best_role,
        "match_percentage": match
    }
