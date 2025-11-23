# AI Resume Matcher — Project Overview

**AI Resume Matcher** is a lightweight, end-to-end system that analyzes a user’s PDF resume and predicts the most suitable job role based on extracted skills and TF-IDF text similarity. It consists of a React frontend, a Node.js backend, and a Python FastAPI microservice for machine-learning processing.

---

## 📌 Project Description

This project allows users to upload their resume in PDF format and instantly receive:

- A list of detected technical skills  
- The most relevant job position for the candidate  
- A match percentage between the resume content and predefined job-role profiles  

The system uses classical NLP (TF-IDF similarity + keyword-based skill extraction) to produce clear and meaningful output.

It is designed to be fast, simple, and easily extendable with more advanced ML or LLM-based models.

---

## 📥 Input

### PDF Resume (Uploaded by the User)

The resume may contain:

- Work experience  
- Technical skills  
- Projects  
- Education  
- Tools & technologies used  

The PDF is processed by the ML microservice to extract all text and perform analysis.

---

## 📤 Output

The system returns structured JSON containing:

### 1. Extracted Skills
A set of technical skills detected in the resume text based on keyword scanning.

**Example:**
```

["python", "react", "mongodb", "api", "html", "css"]

```

### 2. Best-Fit Job Role
Predicted using TF-IDF similarity between resume text and predefined job-role descriptions.

**Example:**
```

"Full Stack Developer"

```

### 3. Match Percentage
A similarity score (0–100%) representing how well the resume matches the predicted role.

**Example:**
```

14.13%

```

The frontend displays these results with a clean UI.

---

## 🎯 Core Logic

### Skill Extraction
- Uses a predefined list of technology keywords  
- Searches for occurrences within extracted resume text  
- Case-insensitive matching  

### Job Role Matching
- TF-IDF vectorizer converts resume text + role descriptions into numerical vectors  
- Cosine similarity is computed  
- The role with the highest similarity is selected as the best match  

---

## 📦 System Components

### Frontend (React + TailwindCSS)
- File upload interface  
- “Analyze Resume” button  
- Display of best role, match %, and extracted skills  

### Backend (Node.js)
- Accepts and stores PDF temporarily  
- Sends binary data to FastAPI microservice  
- Returns JSON response to frontend  

### ML Microservice (FastAPI + sklearn)
- Extracts PDF content using PyPDF2  
- Performs skill extraction  
- Performs TF-IDF job role matching  
- Returns final analysis  



