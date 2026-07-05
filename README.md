# 🎓 AI Student Evaluator  
## 📌 Project Overview
Evaluating every student's understanding after a classroom session is time-consuming and often subjective. Instructors typically review lengthy discussion threads or assignments manually, making it difficult to identify learning gaps quickly.
**AI Student Evaluator** automates this process by leveraging **Generative AI** to compare the mentor's reference summary with students' WhatsApp discussions and generate meaningful insights.
The application evaluates each student's understanding, identifies strengths and missing concepts, generates personalized recommendations, and visualizes class-wide analytics through an interactive dashboard. 
---
# ⚙️ Prerequisites
Before running the application, ensure the following software is installed:
- Java 21
- Maven
- Node.js
- npm
- Google Gemini API Key
- IntelliJ IDEA (Recommended)
---
# 🔑 Gemini API Configuration
Create an API key from Google AI Studio.
Set the API key in:
```
AppConstants.java
``` 
```java
public static final String GEMINI_API_KEY = "YOUR_API_KEY";
```
--- 
# ▶️ Running the Backend
Clone the repository
```bash
git clone <repository-url>
```
Navigate to backend
```bash
cd AIStudentEvaluator
```
Run
```bash
mvn clean install
mvn exec:java
```
---
# 💻 Running the Frontend
Navigate to frontend
```bash
cd frontend ai-mentor-ui
```
Install dependencies
```bash
npm install
```
Run
```bash
npm run dev
```
Application launches at
```
http://localhost:5173
```
--- 
# 📥 Application Workflow
### Step 1
Prepare mentor summary using **Tactiq.ai** transcript.
↓ 
### Step 2
Copy WhatsApp classroom discussion.
↓
### Step 3
Paste chat into the UI available at http://localhost:5173
↓
### Step 4
Google Gemini evaluates every student.
↓
### Step 5
Generate Dashboard Data.
↓
### Step 6
Visualize analytics. 
↓ 
### Step 7
Export PDF report.
---  
# 📄 Sample Input 
## Mentor Summary
```
TestNG is a testing framework used with Selenium,
Playwright, Appium and API Automation.
```
## WhatsApp Chat 
```
Aditi:
TestNG supports Selenium and annotations. 
Hunaid:
TestNG provides @BeforeMethod and @Test.
Akshay:
Next class will cover Page Object Model.
```
---
# 📈 Sample Output
## 📸 Screenshots
 
 
 
## 🎥 Recording
https://drive.google.com/file/d/1hqZ9eJgqEs-xrr-He1eKEKzqYFbkoAaD/view?usp=sharing  
---
# 📚 Documentation
The repository includes:
- High Level Design (HLD)
- Testing Evidence
- Accuracy Report
--- 
# 👨‍💻 Author
**Utkarsh Yadav** 
QA Automation Engineer 
Built as part of an AI Engineering Competition submission.
---
# 📜 License
This project is intended for educational and competition purposes.

