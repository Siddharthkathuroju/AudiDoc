// components/Form.js
"use client";
import { useState } from "react";
import "../../styles/globals.css";

export default function Form() {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [pdfData, setPdfData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMicClick = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    if (!isListening) {
      recognition.start();
      setIsListening(true);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText((prevText) => prevText + " " + transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate/text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`Failed to submit data: ${response.status}`);
      }

      const result = await response.json();
      setGeneratedText(result.content);
    } catch (error) {
      console.error("Error submitting data:", error.message);
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAgain = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate/text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`Failed to generate text again: ${response.status}`);
      }

      const result = await response.json();
      setGeneratedText(result.content);
    } catch (error) {
      console.error("Error generating text again:", error.message);
      alert("Failed to generate text again. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate/pdfgen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: generatedText }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`Failed to generate PDF: ${response.status}`);
      }

      const result = await response.json();
      setPdfData(result.pdf);

      const link = document.createElement("a");
      link.href = `data:application/pdf;base64,${result.pdf}`;
      link.download = "generated.pdf";
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error.message);
      alert("PDF generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <textarea
        className="border border-gray-300 rounded-lg p-2 w-full max-w-md text-black bg-white"
        placeholder="Type something here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        onClick={handleMicClick}
        className={`flex items-center justify-center ${
          isListening ? "bg-red-500" : "bg-blue-500"
        } text-white rounded-full p-2 h-10 w-10`}
        aria-label="Microphone button"
      >
        🎤
      </button>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white rounded-lg px-4 py-2 mt-4"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
      {generatedText && (
        <>
          <p className="text-white mt-4">{generatedText}</p>
          <div className="flex gap-4">
            <button
              onClick={handleDownloadPdf}
              className="bg-purple-500 text-white rounded-lg px-4 py-2"
              disabled={loading}
            >
              {loading ? "Generating PDF..." : "Download PDF"}
            </button>
            <button
              onClick={handleGenerateAgain}
              className="bg-yellow-500 text-white rounded-lg px-4 py-2"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Again"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
