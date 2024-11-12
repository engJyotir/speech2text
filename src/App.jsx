import "./App.css";
import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useState } from "react";

let isActive = false;

function App() {
  const [activeStatus, setActiveStatus] = useState("Speech recognition is not active");

  function startListening() {
    if (isActive === false) {
      setActiveStatus("Speech recognition is active");
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
      isActive = true;
    } else if (isActive) {
      setActiveStatus("Speech recognition is not active");
      SpeechRecognition.stopListening();
      isActive = false;
    }
  }

  const { transcript, resetTranscript } = useSpeechRecognition();

  function copy(text) {
    navigator.clipboard.writeText(text);
  }

  const downloadTranscript = () => {
    const element = document.createElement("a");
    const file = new Blob([transcript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto p-6 bg-blue-900 text-white rounded-lg shadow-lg mt-10">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Speech to Text</h2>
            <p className="text-orange-300">Convert your speech to text with ease</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <button
              id="btn"
              onClick={startListening}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-full flex items-center space-x-2 transition-colors duration-300"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
              <span>Start/Stop</span>
            </button>
            <div className="flex space-x-2">
              <button
                id="btn"
                onClick={resetTranscript}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full flex items-center transition-colors duration-300"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 mr-1"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v2"></path>
                  <path d="M6 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
                <span>Clear</span>
              </button>
              <button
                id="btn"
                onClick={() => copy(transcript)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full flex items-center transition-colors duration-300"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 mr-1"
                >
                  <rect width="14" height="14" x="5" y="5" rx="2" ry="2"></rect>
                  <polyline points="7 10 12 15 17 10"></polyline>
                </svg>
                <span>Copy</span>
              </button>
            </div>
          </div>
          <textarea
            value={transcript}
            className="w-full p-3 text-gray-800 bg-orange-100 rounded-lg focus:outline-none resize-none"
            placeholder="Your text will appear here..."
            rows="4"
            disabled
          ></textarea>
          <div className="flex items-center justify-center space-x-2">
            <div
              className={`w-4 h-4 rounded-full ${
                isActive ? "bg-blue-500" : "bg-orange-500"
              }`}
            ></div>
            <span className="text-gray-300">{activeStatus}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
