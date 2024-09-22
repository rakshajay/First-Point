import React, { useState } from "react";
import axios from "axios";
import "./TextInput.scss";
import ModelUploader from "../ModelUploader/ModelUploader";

const TextInput = () => {
  const [prompt, setPrompt] = useState("");
  const [modelId, setModelId] = useState(null);
  const [modelUrls, setModelUrls] = useState(null);

  const apiKey = "msy_3hxOqTwQqyAEG0A778oruSNfhYYYdwDoU1YE";
  const apiUrl = "https://api.meshy.ai/v2/text-to-3d"; // Removed trailing slash

  const promptSubmit = async () => {
    try {
      const response = await axios.post(
        apiUrl,
        {
          mode: "preview",
          prompt: prompt,
          art_style: "pbr",
          negative_prompt: "low quality, low resolution, low poly, ugly",
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response:", response.data.result);
      const modelId = response.data.result;
      setModelId(modelId);
      console.log("Model ID:", modelId);

      const checkModelProgress = setInterval(async () => {
        try {
          const getModelResponse = await axios.get(`${apiUrl}/${modelId}`, {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          });
          console.log("getModelResponse:", getModelResponse.data);
      
          if (getModelResponse.data && getModelResponse.data.progress >= 100) {
            console.log(
              "3D Model URLs (glb):",
              getModelResponse.data.model_urls.glb
            );
            setModelUrls(getModelResponse.data.model_urls.glb); // Move setModelUrls inside the 100% check
            clearInterval(checkModelProgress); // Ensure this runs immediately after the condition is true
          } else {
            console.log("Model Loading Progress:", getModelResponse.data.progress);
          }
        } catch (error) {
          console.error("Error checking model progress:", error);
          clearInterval(checkModelProgress); // Clear the interval on error to prevent infinite loops
        }
      }, 1 * 60 * 1000); // Checking every minute
      
    
    } catch (error) {
      console.error("Error creating 3D model:", error);
    }
  };

  return (
    <>
      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}>
        <input
          id="1"
          type="text"
          value={prompt}
          onChange={function (e) { setPrompt(e.target.value); }}
          placeholder="Enter prompt for your own customized 3D model"
        />
        <button onClick={promptSubmit}>Submit</button>
      </div>
      <div className="canvas">
        <ModelUploader newModel={modelUrls} />
      </div>
      <button style={{ position: "absolute", bottom: 20, right: 20, zIndex: 10 }}>
      
      </button>
      <button style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}>
       ?
      </button>
    </>
  );
};

export default TextInput;
