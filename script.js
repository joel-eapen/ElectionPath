// script.js

const state = {
    lang: 'en',
    voiceEnabled: false,
    quizCurrentIndex: 0,
    quizScore: 0,
    quizAnswers: [],
    currentJourneyPhase: 0
};

// --- Data: Election Journey ---
const journeyPhases = [
    {
        title: "Eligibility",
        desc: "Ensure you meet the basic criteria to cast your vote.",
        steps: ["Must be a citizen", "Must meet the minimum age requirement (usually 18+)", "Must not be disqualified under law"],
        action: "Check your birth certificate or ID to confirm your age and citizenship."
    },
    {
        title: "Registration",
        desc: "Add your name to the electoral roll.",
        steps: ["Fill out the voter registration form (online or offline)", "Submit proof of address and age", "Wait for application processing"],
        action: "Visit your national or state voter portal to register as soon as possible."
    },
    {
        title: "Verification",
        desc: "Confirm your details are correct on the voter list.",
        steps: ["Receive your Voter ID card", "Search your name in the electoral roll", "Report any spelling or address mistakes"],
        action: "Search for your name on the official electoral search website."
    },
    {
        title: "Campaign & Awareness",
        desc: "Understand the candidates and their promises.",
        steps: ["Read party manifestos", "Attend public debates or meetings", "Verify candidate backgrounds"],
        action: "Research the candidates in your specific constituency, don't just look at national leaders."
    },
    {
        title: "Voting Day",
        desc: "Cast your vote securely.",
        steps: ["Go to your designated polling booth", "Show your valid ID", "Cast your vote on the EVM or ballot paper"],
        action: "Go early to avoid long queues and double-check your booth location beforehand."
    },
    {
        title: "Results",
        desc: "The votes are counted and winners declared.",
        steps: ["Wait for the official counting day", "Follow trusted news sources for updates", "Respect the democratic mandate"],
        action: "Watch the results unfold and stay informed about your newly elected representative."
    }
];

// --- Data: Glossary ---
const glossaryData = [
    { term: "Constituency", def: "A specific geographical area that elects a representative to a legislative body." },
    { term: "EVM", def: "Electronic Voting Machine; used to cast votes electronically rather than using paper ballots." },
    { term: "Voter ID", def: "An identification card issued by the Election Commission to eligible voters (also known as EPIC)." },
    { term: "Ballot", def: "A process of voting, in writing and typically in secret." },
    { term: "Manifesto", def: "A public declaration of policy and aims, especially one issued before an election by a political party." },
    { term: "Polling Booth", def: "The designated place where voters go to cast their votes." },
    { term: "Electoral Roll", def: "The official list of registered voters in a specific constituency." },
    { term: "Incumbent", def: "The current holder of a political office." },
    { term: "Nota (None of the Above)", def: "An option allowing voters to officially reject all candidates." },
    { term: "Voter Turnout", def: "The percentage of eligible voters who cast a ballot in an election." },
    { term: "Democracy", def: "A system of government by the whole population or all the eligible members of a state, typically through elected representatives." },
    { term: "By-election", def: "An election held to fill a political office that has become vacant between regularly scheduled elections." },
    { term: "Campaign", def: "An organized effort which seeks to influence the decision making progress within a specific group." },
    { term: "Candidate", def: "A person who applies for a job or is nominated for election." },
    { term: "Coalition", def: "An alliance for combined action, especially a temporary alliance of political parties forming a government." },
    { term: "Election Commission", def: "An independent constitutional authority responsible for administering election processes." },
    { term: "Exit Poll", def: "A poll of people leaving a polling place, asking how they voted." },
    { term: "First-Past-The-Post", def: "An electoral system in which voters indicate on a ballot the candidate of their choice, and the candidate who receives the most votes wins." },
    { term: "Gerrymandering", def: "Manipulate the boundaries of an electoral constituency so as to favor one party or class." },
    { term: "Indelible Ink", def: "A semi-permanent ink applied to voters' fingers to prevent multiple voting." },
    { term: "VVPAT", def: "Voter Verifiable Paper Audit Trail; provides feedback to voters using a ballotless voting system." },
    { term: "Polling Officer", def: "An official appointed to be in charge of a polling station." }
];

// --- Data: Quiz ---
const quizData = [
    { q: "What is the general minimum age to vote in most democracies?", opts: ["16", "18", "21", "25"], ans: 1 },
    { q: "What does EVM stand for?", opts: ["Electronic Voting Machine", "Electoral Valid Method", "Election Verification Mechanism", "Every Vote Matters"], ans: 0 },
    { q: "What is an Electoral Roll?", opts: ["A type of bread", "The list of candidates", "The official list of registered voters", "A rulebook for politicians"], ans: 2 },
    { q: "What should you do if your name is missing from the voter list on election day?", opts: ["Vote anyway", "You cannot vote", "Bribe the officer", "Vote online"], ans: 1 },
    { q: "What is a Constituency?", opts: ["A political party", "A geographical voting area", "A type of law", "An election official"], ans: 1 },
    { q: "What document declares a political party's promises?", opts: ["The Constitution", "A Manifesto", "An Affidavit", "A Ballot"], ans: 1 },
    { q: "What does NOTA mean?", opts: ["Notice of Total Agreement", "None Of The Above", "National Organization of Teachers", "No Other Terms Applied"], ans: 1 },
    { q: "Where do you actually cast your vote?", opts: ["Police Station", "Post Office", "Polling Booth", "Bank"], ans: 2 },
    { q: "Who is an incumbent?", opts: ["A new candidate", "The person currently holding the office", "The election commissioner", "A voter who didn't vote"], ans: 1 },
    { q: "Which of these is generally required to cast a vote?", opts: ["A valid ID", "A college degree", "Property ownership", "A tax return"], ans: 0 }
];

// --- Data: Translations ---
const translations = {
    en: {
        logo: "ElectEd AI",
        heroBadge: "Your Guide to Democracy",
        heroTitle: "Understand Elections in Minutes",
        heroSubtitle: "A simple, interactive, and engaging assistant for first-time voters and anyone wanting to navigate the democratic process with confidence.",
        heroCTA: "Start Your Journey",
        heroCardTitle: "Smart Insights",
        heroCardDesc: "AI-powered answers to all your voting questions.",
        journeyTitle: "Your Election Journey",
        journeySubtitle: "Follow these 6 steps to make your voice heard.",
        assistantTitle: "Smart Assistant",
        assistantSubtitle: "Ask any question about the election process.",
        chatPlaceholder: "Type your question here...",
        chatWelcome: "Hello! I'm your election assistant. How can I help you today? Try asking: 'Am I eligible to vote?' or 'What documents do I need?'",
        quizTitle: "Test Your Knowledge",
        quizSubtitle: "Take a quick quiz to see how ready you are for election day.",
        quizIntroTitle: "Are you ready?",
        quizIntroDesc: "10 questions covering eligibility, process, and terms.",
        startQuizBtn: "Start Quiz",
        nextBtn: "Next Question",
        restartQuizBtn: "Try Again",
        resultMsg: "Quiz Complete!",
        glossaryTitle: "Election Glossary",
        glossarySubtitle: "Confused by the jargon? Find simple definitions here.",
        glossarySearchPlaceholder: "Search terms (e.g., EVM, Ballot)...",
        dataVizTitle: "Voter Turnout Insights",
        dataVizSubtitle: "Understanding participation through data.",
        chartTitle: "Recent Election Turnout %",
        disclaimer: "Disclaimer: This is an educational tool and not an official election authority. Please refer to official government sources for binding information.",
        credits: "Built for civic education & hackathons. © 2026",
        actionText: "What YOU should do:"
    },
    hi: {
        logo: "इलेक्टएड एआई",
        heroBadge: "लोकतंत्र के लिए आपका मार्गदर्शक",
        heroTitle: "मिनटों में चुनाव प्रक्रिया समझें",
        heroSubtitle: "पहली बार मतदान करने वालों और लोकतांत्रिक प्रक्रिया को आत्मविश्वास के साथ नेविगेट करने वाले किसी भी व्यक्ति के लिए एक सरल, संवादात्मक और आकर्षक सहायक।",
        heroCTA: "अपनी यात्रा शुरू करें",
        heroCardTitle: "स्मार्ट अंतर्दृष्टि",
        heroCardDesc: "आपके सभी मतदान संबंधी प्रश्नों के एआई-संचालित उत्तर।",
        journeyTitle: "आपकी चुनाव यात्रा",
        journeySubtitle: "अपनी आवाज़ उठाने के लिए इन 6 चरणों का पालन करें।",
        assistantTitle: "स्मार्ट सहायक",
        assistantSubtitle: "चुनाव प्रक्रिया के बारे में कोई भी प्रश्न पूछें।",
        chatPlaceholder: "अपना प्रश्न यहाँ टाइप करें...",
        chatWelcome: "नमस्ते! मैं आपका चुनाव सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ? पूछने का प्रयास करें: 'क्या मैं वोट देने के योग्य हूँ?' या 'मुझे किन दस्तावेजों की आवश्यकता है?'",
        quizTitle: "अपने ज्ञान का परीक्षण करें",
        quizSubtitle: "चुनाव के दिन के लिए आप कितने तैयार हैं, यह देखने के लिए एक त्वरित प्रश्नोत्तरी लें।",
        quizIntroTitle: "क्या आप तैयार हैं?",
        quizIntroDesc: "योग्यता, प्रक्रिया और शर्तों को कवर करने वाले 10 प्रश्न।",
        startQuizBtn: "प्रश्नोत्तरी शुरू करें",
        nextBtn: "अगला प्रश्न",
        restartQuizBtn: "पुनः प्रयास करें",
        resultMsg: "प्रश्नोत्तरी पूर्ण!",
        glossaryTitle: "चुनाव शब्दावली",
        glossarySubtitle: "शब्दावली से भ्रमित हैं? यहाँ सरल परिभाषाएँ खोजें।",
        glossarySearchPlaceholder: "शब्द खोजें (उदा., EVM, बैलेट)...",
        dataVizTitle: "मतदाता मतदान अंतर्दृष्टि",
        dataVizSubtitle: "डेटा के माध्यम से भागीदारी को समझना।",
        chartTitle: "हालिया चुनाव मतदान %",
        disclaimer: "अस्वीकरण: यह एक शैक्षिक उपकरण है और कोई आधिकारिक चुनाव प्राधिकरण नहीं है। कृपया बाध्यकारी जानकारी के लिए आधिकारिक सरकारी स्रोतों को देखें।",
        credits: "नागरिक शिक्षा और हैकाथॉन के लिए निर्मित। © 2026",
        actionText: "आपको क्या करना चाहिए:"
    }
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initUI();
    setupEventListeners();
    renderTimeline(0);
    renderGlossary(glossaryData);
    renderChart();
});

function initUI() {
    updateLanguage(state.lang);
}

function setupEventListeners() {
    // Language Switcher
    document.getElementById('langEn').addEventListener('click', () => setLanguage('en'));
    document.getElementById('langHi').addEventListener('click', () => setLanguage('hi'));

    // Voice Toggle
    document.getElementById('voiceToggle').addEventListener('click', (e) => {
        state.voiceEnabled = !state.voiceEnabled;
        e.currentTarget.classList.toggle('active', state.voiceEnabled);
        if(!state.voiceEnabled) window.speechSynthesis.cancel();
    });

    // Navigation CTA
    document.getElementById('startJourneyBtn').addEventListener('click', () => {
        document.getElementById('journey').scrollIntoView({ behavior: 'smooth' });
    });

    // Chat
    document.getElementById('sendBtn').addEventListener('click', handleChat);
    document.getElementById('chatInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });

    // Quiz
    document.getElementById('startQuizBtn').addEventListener('click', startQuiz);
    document.getElementById('nextQuestionBtn').addEventListener('click', nextQuestion);
    document.getElementById('restartQuizBtn').addEventListener('click', resetQuiz);

    // Glossary
    document.getElementById('glossarySearch').addEventListener('input', filterGlossary);
}

// --- Multi-lingual ---
function setLanguage(lang) {
    state.lang = lang;
    document.getElementById('langEn').classList.toggle('active', lang === 'en');
    document.getElementById('langHi').classList.toggle('active', lang === 'hi');
    updateLanguage(lang);
    renderTimeline(state.currentJourneyPhase); // re-render current phase text
}

function updateLanguage(lang) {
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = t[key];
            } else {
                el.innerHTML = t[key];
            }
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if(t[key]) el.placeholder = t[key];
    });
}

// --- Voice ---
function speakText(text) {
    if (!state.voiceEnabled) return;
    
    // Simple HTML strip
    const cleanText = text.replace(/<[^>]*>?/gm, '');
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Try to set language
    utterance.lang = state.lang === 'hi' ? 'hi-IN' : 'en-US';
    window.speechSynthesis.speak(utterance);
}

// --- Journey Timeline ---
function renderTimeline(activeIndex) {
    state.currentJourneyPhase = activeIndex;
    const stepsContainer = document.getElementById('timelineSteps');
    const contentContainer = document.getElementById('journeyContent');
    const progress = document.getElementById('timelineProgress');

    // Update Progress Bar
    const progressPercentage = (activeIndex / (journeyPhases.length - 1)) * 100;
    progress.style.width = `${progressPercentage}%`;

    // Render Steps
    stepsContainer.innerHTML = '';
    journeyPhases.forEach((phase, index) => {
        const step = document.createElement('div');
        step.className = `step-node ${index === activeIndex ? 'active' : ''} ${index < activeIndex ? 'completed' : ''}`;
        step.innerText = index + 1;
        step.addEventListener('click', () => renderTimeline(index));
        stepsContainer.appendChild(step);
    });

    // Render Content
    const phase = journeyPhases[activeIndex];
    const actionLabel = translations[state.lang].actionText || "What YOU should do:";
    
    contentContainer.innerHTML = `
        <div class="journey-phase" style="animation: fadeIn 0.5s ease;">
            <h3>Step ${activeIndex + 1}: ${phase.title}</h3>
            <p>${phase.desc}</p>
            <div class="journey-grid">
                <div class="journey-card">
                    <h4>Key Steps</h4>
                    <ul>
                        ${phase.steps.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
                <div class="journey-card">
                    <h4>${actionLabel}</h4>
                    <p>${phase.action}</p>
                </div>
            </div>
        </div>
    `;
    
    if(state.voiceEnabled) speakText(`${phase.title}. ${phase.desc}. ${actionLabel}. ${phase.action}`);
}

// --- Chat Assistant (Gemini) ---
async function handleChat() {
    const inputEl = document.getElementById('chatInput');
    const text = inputEl.value.trim();
    if (!text) return;

    inputEl.value = '';
    addChatMessage(text, 'user');

    // Show loading
    const loaderId = addChatLoader();
    
    try {
        const responseText = await fetchGeminiResponse(text);
        removeElement(loaderId);
        addChatMessage(responseText, 'bot');
        speakText(responseText);
    } catch (error) {
        removeElement(loaderId);
        addChatMessage("Sorry, I am currently unable to process your request. Please check your API key or connection.", 'bot');
    }
}

function addChatMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Parse basic markdown if bot
    if (sender === 'bot') {
        let htmlLines = [];
        let inList = false;
        const lines = text.split('\n');
        
        for (let line of lines) {
            line = line.trim();
            if (!line) continue;
            
            // Format bold and italic
            let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
            
            if (formattedLine.startsWith('- ') || formattedLine.startsWith('* ')) {
                if (!inList) {
                    htmlLines.push('<ul>');
                    inList = true;
                }
                htmlLines.push(`<li>${formattedLine.substring(2)}</li>`);
            } else {
                if (inList) {
                    htmlLines.push('</ul>');
                    inList = false;
                }
                htmlLines.push(`<p>${formattedLine}</p>`);
            }
        }
        if (inList) htmlLines.push('</ul>');
        
        contentDiv.innerHTML = htmlLines.join('');
    } else {
        contentDiv.innerText = text;
    }

    msgDiv.appendChild(contentDiv);
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addChatLoader() {
    const id = 'loader-' + Date.now();
    const chatMessages = document.getElementById('chatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message bot`;
    msgDiv.id = id;
    
    msgDiv.innerHTML = `
        <div class="message-content">
            <div class="loading-dots">
                <div></div><div></div><div></div>
            </div>
        </div>
    `;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return id;
}

function removeElement(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

async function fetchGeminiResponse(userMessage) {
    if(!CONFIG.GEMINI_API_KEY || CONFIG.GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
        return "Please configure your Gemini API Key in config.js first.";
    }

    // System instruction prompt
    const systemInstruction = `You are an election education assistant. 
Rules:
1. Keep answers extremely short, clear, and direct (max 2-3 sentences).
2. Prevent long paragraphs.
3. Use bullet points wherever useful to break down information.
4. Always end your response with a clear, actionable "Next step:" suggestion.
5. Do not give political opinions.
The user is interacting in language: ${state.lang === 'hi' ? 'Hindi' : 'English'}. Respond in the user's language.`;
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${CONFIG.GEMINI_API_KEY}`;
    
    const payload = {
        systemInstruction: {
            parts: [{ text: systemInstruction }]
        },
        contents: [
            { role: "user", parts: [{ text: userMessage }] }
        ],
        generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 250
        }
    };

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error("API Error");

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// --- Quiz System ---
function startQuiz() {
    state.quizCurrentIndex = 0;
    state.quizScore = 0;
    state.quizAnswers = [];
    switchQuizState('quizActive');
    loadQuestion();
}

function switchQuizState(stateId) {
    document.querySelectorAll('.quiz-state').forEach(el => el.classList.remove('active'));
    document.getElementById(stateId).classList.add('active');
}

function loadQuestion() {
    const qData = quizData[state.quizCurrentIndex];
    document.getElementById('questionText').innerText = qData.q;
    
    const optsContainer = document.getElementById('optionsContainer');
    optsContainer.innerHTML = '';
    
    document.getElementById('feedbackText').innerText = '';
    document.getElementById('nextQuestionBtn').classList.add('hidden');

    // Update Progress
    document.getElementById('quizProgressText').innerText = `Question ${state.quizCurrentIndex + 1} of ${quizData.length}`;
    document.getElementById('quizProgressFill').style.width = `${((state.quizCurrentIndex) / quizData.length) * 100}%`;

    qData.opts.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.addEventListener('click', () => selectOption(index, qData.ans));
        optsContainer.appendChild(btn);
    });
}

function selectOption(selectedIndex, correctIndex) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true); // Lock answers

    // Track answer
    const qData = quizData[state.quizCurrentIndex];
    state.quizAnswers.push({
        q: qData.q,
        userAns: selectedIndex,
        correctAns: correctIndex,
        opts: qData.opts
    });

    if (selectedIndex === correctIndex) {
        // Correct answer animation is handled by CSS .correct class
        buttons[selectedIndex].classList.add('correct');
        document.getElementById('feedbackText').innerText = "Correct! Well done.";
        document.getElementById('feedbackText').className = "feedback-text correct";
        state.quizScore++;
        if(state.voiceEnabled) speakText("Correct!");
    } else {
        // Add shake animation class
        buttons[selectedIndex].classList.add('wrong');
        buttons[correctIndex].classList.add('correct');
        document.getElementById('feedbackText').innerText = "Incorrect. The highlighted answer is correct.";
        document.getElementById('feedbackText').className = "feedback-text wrong";
        if(state.voiceEnabled) speakText("Incorrect.");
    }

    document.getElementById('nextQuestionBtn').classList.remove('hidden');
    document.getElementById('quizProgressFill').style.width = `${((state.quizCurrentIndex + 1) / quizData.length) * 100}%`;
}

function nextQuestion() {
    state.quizCurrentIndex++;
    if (state.quizCurrentIndex < quizData.length) {
        loadQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    switchQuizState('quizResult');
    document.getElementById('finalScore').innerText = `${state.quizScore}/${quizData.length}`;
    
    const msgEl = document.getElementById('resultMessage');
    if (state.quizScore >= 8) {
        msgEl.innerText = "Excellent! You are fully prepared for election day!";
    } else if (state.quizScore >= 5) {
        msgEl.innerText = "Good job! A quick review of the glossary might help.";
    } else {
        msgEl.innerText = "Keep learning! The election journey guide above has all the answers.";
    }

    // Populate review container
    const reviewContainer = document.getElementById('quizReview');
    reviewContainer.innerHTML = '';
    
    state.quizAnswers.forEach((ans, i) => {
        const item = document.createElement('div');
        item.className = 'review-item';
        
        const isCorrect = ans.userAns === ans.correctAns;
        const userText = ans.opts[ans.userAns];
        const correctText = ans.opts[ans.correctAns];
        
        item.innerHTML = `
            <p>${i + 1}. ${ans.q}</p>
            <div class="user-ans ${isCorrect ? '' : 'incorrect'}">Your answer: ${userText}</div>
            ${!isCorrect ? `<div class="correct-ans">Correct answer: ${correctText}</div>` : ''}
        `;
        reviewContainer.appendChild(item);
    });
}

function resetQuiz() {
    switchQuizState('quizIntro');
}

// --- Glossary ---
function renderGlossary(data) {
    const grid = document.getElementById('glossaryGrid');
    grid.innerHTML = '';
    
    if (data.length === 0) {
        grid.innerHTML = '<p style="color:var(--text-secondary);grid-column:1/-1;text-align:center;">No terms found.</p>';
        return;
    }

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'glossary-card';
        card.innerHTML = `
            <h3>${item.term}</h3>
            <p>${item.def}</p>
        `;
        // Add voice support for glossary items
        card.addEventListener('click', () => speakText(`${item.term}. ${item.def}`));
        grid.appendChild(card);
    });
}

function filterGlossary(e) {
    const term = e.target.value.toLowerCase();
    const filtered = glossaryData.filter(item => 
        item.term.toLowerCase().includes(term) || item.def.toLowerCase().includes(term)
    );
    renderGlossary(filtered);
}

// --- Data Viz (Simple pure JS bar chart) ---
function renderChart() {
    const chartContainer = document.getElementById('turnoutChart');
    
    // Dummy Data
    const data = [
        { year: "2014", india: 66.4, global: 62 },
        { year: "2019", india: 67.4, global: 60 },
        { year: "2024", india: 65.8, global: 61 }
    ];

    // Find max value to scale heights
    const maxVal = 100; // Let's use 100% as the max scale for turnout

    data.forEach(d => {
        const group = document.createElement('div');
        group.className = 'chart-bar-group';
        
        const wrapper = document.createElement('div');
        wrapper.className = 'bars-wrapper';

        // India Bar
        const barIndia = document.createElement('div');
        barIndia.className = 'bar india';
        // Add label
        const lblIndia = document.createElement('span');
        lblIndia.className = 'bar-label';
        lblIndia.innerText = d.india + '%';
        barIndia.appendChild(lblIndia);
        
        // Global Bar
        const barGlobal = document.createElement('div');
        barGlobal.className = 'bar global';
        const lblGlobal = document.createElement('span');
        lblGlobal.className = 'bar-label';
        lblGlobal.innerText = d.global + '%';
        barGlobal.appendChild(lblGlobal);

        // Animate heights using setTimeout
        setTimeout(() => {
            barIndia.style.height = `${(d.india / maxVal) * 100}%`;
            barGlobal.style.height = `${(d.global / maxVal) * 100}%`;
        }, 500);

        wrapper.appendChild(barIndia);
        wrapper.appendChild(barGlobal);
        
        const label = document.createElement('div');
        label.className = 'chart-label';
        label.innerText = d.year;

        group.appendChild(wrapper);
        group.appendChild(label);
        chartContainer.appendChild(group);
    });
}
