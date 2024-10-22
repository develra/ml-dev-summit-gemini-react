import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function GeminiPromptSubmit() {
  const [apiKey, setApiKey] = useState("");
  const [inputPrompt, setInputPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setError(null); // Clear any previous error
    if (!apiKey) {
      setError("Please enter your API key.");
      return;
    }
    if (!inputPrompt) {
      setError("Please enter a prompt.");
      return;
    }

    try {
      const client = new GoogleGenerativeAI(apiKey);
      const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent([inputPrompt]);

      setOutput(result.response.text());
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error("Error generating text:", err); // Important for debugging
      setOutput(""); // Clear output on error
    }
  };

  return (
    <div>
      <h1>Simple React Gemini App for ML Dev Summit - Team #10</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        <label htmlFor="apiKey">API Key:</label>
        <input
          type="text"
          id="apiKey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Gemini API key"
        />
      </div>
      <div>
        <label htmlFor="prompt">Prompt:</label>
        <textarea
          id="prompt"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder="Enter your prompt here"
        />
      </div>
      <button onClick={handleSubmit}>Submit Prompt</button>
      <div>
        <h2>Output:</h2>
        {output ? <pre>{output}</pre> : <p>No output yet.</p>}
      </div>
    </div>
  );
}

export default GeminiPromptSubmit;
