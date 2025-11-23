AI Resume Matcher — Project Overview

AI Resume Matcher is a lightweight, end-to-end system that analyzes a user’s PDF resume and predicts the most suitable job role based on extracted skills and TF-IDF text similarity. It consists of a React frontend, a Node.js backend, and a Python FastAPI microservice for machine-learning processing.

📌 Project Description

This project allows users to upload their resume in PDF format and instantly receive:

A list of detected technical skills

The most relevant job position for the candidate

A match percentage between the resume content and predefined job-role profiles

The system uses classical NLP (TF-IDF similarity + keyword-based skill extraction) to produce clear and meaningful output.

It is designed to be fast, simple, and easy to extend with more advanced ML or LLM-based models.

📥 Input

1. PDF Resume (Uploaded by the user)
The resume may contain:

Work experience

Technical skills

Projects

Education

Tools & technologies used

The PDF is sent to a backend server, which forwards it to the ML microservice for analysis.

📤 Output

The system returns a structured JSON response containing:

1. Extracted Skills

A set of technical skills detected in the PDF text based on keyword matching.

Example:

["python", "react", "mongodb", "api", "html", "css"]

2. Best-Fit Job Role

Determined using TF-IDF similarity between resume text and predefined job-role descriptions.

Example:

"Full Stack Developer"

3. Match Percentage

A similarity score (0–100%) indicating how well the resume matches the predicted role.

Example:

14.13%


These results are displayed visually on the frontend with an interactive UI.

🎯 Core Logic
Skill Extraction

The resume text is scanned for known skill keywords (Python, React, Java, Docker, NLP, etc.).

Matching is case-insensitive and based on simple substring search.

Job Role Matching

The system compares the resume text against short descriptions of roles such as:

Backend Developer

Frontend Developer

Full Stack Developer

Data Analyst

Machine Learning Engineer

TF-IDF vectors are computed, and the most similar role is selected.

📦 System Components
Frontend (React + TailwindCSS)

File upload interface

“Analyze Resume” button

Result display UI (skills, role, match %)

Backend (Node.js)

Accepts PDF upload

Sends file data to ML microservice

Returns JSON response to frontend

ML Microservice (FastAPI + sklearn)

Extracts PDF text

Performs keyword skill detection

Performs TF-IDF job-role matching

Responds with structured analysis
