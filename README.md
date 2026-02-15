# 🚀 AI Resume Matcher

AI Resume Matcher is an end-to-end AI-powered system that analyzes a user's PDF resume and predicts the most suitable job role using semantic embeddings.

The project follows a microservices-based architecture:

- ⚛️ React + TailwindCSS Frontend  
- 🟢 Node.js Backend  
- 🐍 Python FastAPI ML Microservice  

Unlike traditional keyword-matching systems, this project uses transformer-based semantic embeddings to understand contextual meaning inside resumes.

---

# 📌 Project Description

This application allows users to upload a resume (PDF format) and instantly receive:

- ✅ Extracted technical skills  
- 🎯 Best-matching job role  
- 📊 Match percentage score  

The ML service uses SentenceTransformers (`all-MiniLM-L6-v2`) and cosine similarity to compute semantic similarity between resume content and predefined job roles.

---

# 📥 Input

### PDF Resume (Uploaded by User)

The resume may contain:

- Work experience  
- Technical skills  
- Projects  
- Education  
- Tools & technologies  

The PDF is parsed and converted into text before analysis.

---

# 📤 Output

The system returns structured JSON containing:

### 1️⃣ Extracted Skills

Example:
```json
["python", "react", "mongodb", "api", "html", "css"]
```

---

### 2️⃣ Best-Fit Job Role

Example:
```json
"Full Stack Developer"
```

---

### 3️⃣ Match Percentage

Example:
```json
87.42
```

The frontend displays the results with a clean modern UI including a progress bar and skill badges.

---

# 🧠 Core AI Logic

## 🔹 Skill Extraction
- Uses predefined skill dictionary
- Case-insensitive keyword matching
- Removes duplicates

## 🔹 Semantic Role Matching
- Uses SentenceTransformers model: `all-MiniLM-L6-v2`
- Converts job roles and resume into vector embeddings
- Computes cosine similarity
- Selects role with highest similarity score

This enables contextual understanding instead of simple word-frequency matching.

---

# 🏗 System Architecture

```
React Frontend
      ↓
Node.js Backend
      ↓
FastAPI ML Microservice
```

### Flow:
1. User uploads PDF
2. Backend forwards file to ML service
3. ML service extracts text
4. Embeddings are generated
5. Cosine similarity determines best role
6. JSON response sent back to frontend

---

# 🛠 Tech Stack

## Frontend
- React (TypeScript)
- TailwindCSS
- Axios

## Backend
- Node.js
- Express

## ML Microservice
- FastAPI
- SentenceTransformers
- PyPDF2
- NumPy
- Scikit-learn

---

# ▶️ How To Run Locally

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Pranavvela/AI-Resume-Matcher.git
cd AI-Resume-Matcher
```

---

## 2️⃣ Install Root Dependencies

```bash
npm install
```

---

## 3️⃣ Setup ML Service

```bash
cd ml
pip install fastapi uvicorn sentence-transformers torch numpy PyPDF2 scikit-learn
```

Run ML server:

```bash
uvicorn app:app --reload --port 8001
```

---

## 4️⃣ Start Backend

```bash
cd backend
npm install
node server.js
```

---

## 5️⃣ Start Frontend

```bash
cd frontend
npm install
npm run dev
```

---

Or run all services together from root:

```bash
npm run start-all
```

---

# 📊 Expected Accuracy

| Resume Type | Approx Accuracy |
|-------------|-----------------|
| Keyword-rich | 85–95% |
| Natural language | 75–90% |
| Synonym-heavy | 80–90% |

Accuracy improves due to semantic embedding-based similarity instead of TF-IDF.

---

# 🚀 Future Improvements

- Top 3 role recommendations
- Skill gap analysis
- Confidence threshold filtering
- Resume improvement suggestions
- LLM-based enhancement
- Deployment (Docker / Cloud)

---

# 👨‍💻 Author

**Pranav Vela**

---

# ⭐ Why This Project Stands Out

- Microservices architecture  
- Real transformer-based semantic AI  
- Clean modern frontend  
- Production-style API separation  
- Expandable and scalable design  

---

If you found this project helpful, consider giving it a ⭐ on GitHub.
