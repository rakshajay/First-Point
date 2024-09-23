import React, { useState } from "react";
import axios from "axios";
import "./TextInput.scss";
import ModelUploader from "../ModelUploader/ModelUploader";

const TextInput = () => {
  const [prompt, setPrompt] = useState("");
  const [modelId, setModelId] = useState(null);
  const [modelUrls, setModelUrls] = useState(null);

  const apiUrl = import.meta.env.API_URL;
  const apiKey = import.meta.env.API_CODE;
  

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
            setModelUrls(getModelResponse.data.model_urls.glb); // shd setModelUrls inside the 100% check
            clearInterval(checkModelProgress); // this is to ensure this runs immediately after the condition is true
          } else {
            console.log("Model Loading Progress:", getModelResponse.data.progress);
          }
        } catch (error) {
          console.error("Error checking model progress:", error);
          clearInterval(checkModelProgress); // To clear the interval on error to prevent infinite loops
        }
      }, 1 * 60 * 1000); 
      
    
    } catch (error) {
      console.error("Error creating 3D model:", error);
    }
  };

  return (
    <div className="home">
      <div className="home-prompt">
        <input
          id="1"
          type="text"
          value={prompt}
          onChange={function (e) { setPrompt(e.target.value); }}
          placeholder="Add 3D to the Instsallation. A Unicorn?"
        />
        <button onClick={promptSubmit}>Submit</button>
      </div>
      <div>
        <ModelUploader newModel={modelUrls} />
      </div>
      <div className="home-index">
      <h1><a href="#architecture">Architecture</a></h1>
          <h1><a href="#ar-vr-xr">AR/VR/XR</a></h1>
          <h1><a href="#cooking">Cooking</a></h1>
          <h1><a href="#painting">Painting</a></h1>
          <h1><a href="#web-design">Web Design/Development</a></h1>
          <h1><a href="#ai-robotics">AI/Robotics</a></h1>
          <h1><a href="#gaming">Gaming</a></h1>
          <h1><a href="#Resume">Gaming</a></h1>
      </div>
    </div>
  );
};

export default TextInput;
