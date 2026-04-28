global.window.speechSynthesis = {
  cancel: jest.fn(),
  speak: jest.fn()
};
global.SpeechSynthesisUtterance = jest.fn();
global.fetch = jest.fn();
