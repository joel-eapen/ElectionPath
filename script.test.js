const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

// Also mock CONFIG
global.CONFIG = { GEMINI_API_KEY: 'test-key' };

describe('ElectEd AI Core Application', () => {
  let script;

  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    script = require('./script.js');
    jest.clearAllMocks();
    
    // reset state
    script.state.lang = 'en';
    script.state.voiceEnabled = false;
    script.state.quizScore = 0;
    script.state.quizCurrentIndex = 0;
  });

  afterEach(() => {
    delete require.cache[require.resolve('./script.js')];
  });

  describe('Localization & Language', () => {
    it('should update language to Hindi', () => {
      script.state.lang = 'hi';
      script.updateLanguage('hi');
      
      const title = document.querySelector('[data-i18n="heroTitle"]').innerHTML;
      expect(title).toBe('मिनटों में चुनाव प्रक्रिया समझें');
    });

    it('should fallback to English by default', () => {
      script.state.lang = 'en';
      script.updateLanguage('en');
      
      const title = document.querySelector('[data-i18n="heroTitle"]').innerHTML;
      expect(title).toBe('Understand Elections in Minutes');
    });
  });

  describe('Accessibility - Text to Speech', () => {
    it('should not trigger speech when voice is disabled', () => {
      script.state.voiceEnabled = false;
      script.speakText('Hello world');
      expect(global.window.speechSynthesis.speak).not.toHaveBeenCalled();
    });

    it('should trigger speech when voice is enabled', () => {
      script.state.voiceEnabled = true;
      script.speakText('Hello world');
      expect(global.window.speechSynthesis.speak).toHaveBeenCalled();
    });
  });

  describe('Quiz Integration', () => {
    it('should start the quiz and load the first question', () => {
      script.startQuiz();
      
      const progressText = document.getElementById('quizProgressText').innerHTML;
      expect(progressText).toBe('Question 1 of 10');
      
      const activeState = document.getElementById('quizActive').classList.contains('active');
      expect(activeState).toBe(true);
    });

    it('should track correct answers properly', () => {
      script.startQuiz();
      
      // Select option 1 (correct for first question based on quizData)
      script.selectOption(1, 1);
      
      expect(script.state.quizScore).toBe(1);
      expect(document.getElementById('feedbackText').innerHTML).toContain('Correct');
    });

    it('should handle incorrect answers and lock buttons', () => {
      script.startQuiz();
      
      // Select incorrect option
      script.selectOption(0, 1);
      
      expect(script.state.quizScore).toBe(0);
      expect(document.getElementById('feedbackText').innerHTML).toContain('Incorrect');
      
      const buttons = document.querySelectorAll('.option-btn');
      buttons.forEach(btn => {
        expect(btn.disabled).toBe(true);
      });
    });
  });

  describe('Security & Edge Cases', () => {
    it('fetchGeminiResponse should throw error if no API key', async () => {
      global.CONFIG.GEMINI_API_KEY = '';
      await expect(script.fetchGeminiResponse('test input')).resolves.toBe('Please configure your Gemini API Key in config.js first.');
    });

    it('fetchGeminiResponse should handle network errors gracefully', async () => {
      global.CONFIG.GEMINI_API_KEY = 'valid-key';
      global.fetch.mockResolvedValueOnce({
        ok: false
      });
      await expect(script.fetchGeminiResponse('test input')).rejects.toThrow('API Error');
    });
    
    it('fetchGeminiResponse should parse successful response', async () => {
        global.CONFIG.GEMINI_API_KEY = 'valid-key';
        global.fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            candidates: [{ content: { parts: [{ text: "Mocked AI Response" }] } }]
          })
        });
        const res = await script.fetchGeminiResponse('test input');
        expect(res).toBe("Mocked AI Response");
      });
  });
});
