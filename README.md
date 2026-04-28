# ElectEd AI – Election Journey Assistant

**ElectEd AI** is a simple, modern, and interactive civic guide designed to help first-time voters and citizens easily understand the democratic electoral process. Built with a premium, minimalist design, it offers a guided journey, an AI-powered smart assistant, and an interactive quiz to test your knowledge.

🌍 **Live Demo:** [https://elected-ai-assistant-360104069799.us-central1.run.app](https://elected-ai-assistant-360104069799.us-central1.run.app)

## 🚀 Features

- **Interactive Electoral Journey:** A guided 6-phase stepper explaining the election process from Eligibility to Results.
- **Smart Assistant:** Powered by the **Google Gemini 2.0 Flash API**, providing non-partisan, short, and actionable answers to election-related questions.
- **Interactive Knowledge Quiz:** A 10-question quiz featuring dynamic animations, progress tracking, and a detailed answer-review screen.
- **Searchable Glossary:** A filterable dictionary of 22 key election terms (e.g., EVM, Ballot, Gerrymandering).
- **Data Visualization:** A pure-CSS bar chart visualizing national vs. global voter turnout trends.
- **Accessibility & Internationalization:** 
  - Bilingual support (English & Hindi)
  - Built-in Voice Reader utilizing the browser's `SpeechSynthesis` API.
- **Premium Design:** A minimalist, high-contrast black-and-white theme that works perfectly across desktops, tablets, and mobile devices.

## 🛠 Tech Stack

- **Frontend:** Pure HTML5, CSS3, and Vanilla JavaScript (Zero external dependencies or frameworks).
- **AI Integration:** Google Gemini REST API.
- **Deployment:** Dockerized and hosted on Google Cloud Run.

## 💻 Local Setup

1. **Clone or Download** the repository to your local machine.
2. **Configure the API Key:**
   - Open `config.js`
   - Replace the `GEMINI_API_KEY` placeholder with your actual Google Gemini API key. *(Note: Never commit your real API key to a public repository).*
3. **Run the App:**
   - Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).
   - No local server or build step is required!

## ☁️ Deployment (Google Cloud Run)

This project includes a lightweight `Dockerfile` that packages the application using an `nginx:alpine` image.

To deploy via the Google Cloud CLI:
```bash
gcloud run deploy elected-ai-assistant --source . --port 80 --allow-unauthenticated
```

## 📝 License
This project was built for educational and civic purposes. Feel free to fork and modify!
