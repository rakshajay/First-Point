import React, { useState } from "react";
import axios from "axios";
import "./TextInput.scss";
import ModelUploader from "../ModelUploader/ModelUploader";
import plusIcon from "../../assets/Icons/plus-3.png";

const TextInput = () => {
  const [prompt, setPrompt] = useState("");
  const [modelId, setModelId] = useState(null);
  const [modelUrls, setModelUrls] = useState(null);
  const [textInputOpen, setTextInputOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const apiUrl = "https://api.meshy.ai/v2/text-to-3d";
  const apiKey = import.meta.env.VITE_API_CODE;

  const promptSubmit = async () => {
    try {
      setLoading(true);
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
      const modelId = response.data.result;
      setModelId(modelId);

      const checkModelProgress = setInterval(async () => {
        try {
          const getModelResponse = await axios.get(`${apiUrl}/${modelId}`, {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          });

          if (getModelResponse.data && getModelResponse.data.progress >= 100) {
            setModelUrls(getModelResponse.data.model_urls.glb);
            setLoading(false);
            clearInterval(checkModelProgress);
          }
        } catch (error) {
          console.error("Error checking model progress:", error);
          setLoading(false);
          clearInterval(checkModelProgress);
        }
      }, 60000); // Check progress every minute
    } catch (error) {
      console.error("Error creating 3D model:", error);
      setLoading(false);
    }
  };

  const showTextInput = () => {
    setTextInputOpen(true);
  };

  const hideTextInput = () => {
    setTextInputOpen(false);
  };

  return (
    <div className="home">
      {/* <div className="home-prompt">
        <div style={{ visibility: textInputOpen ? "visible" : "hidden" }}>
          <h2 className="home-info"> 
            "Hey there! Why not add your favorite object and become part of this collaborative installation?"
          </h2>
        </div>
        <div>
          <input
            id="1"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type what object you like to add here"
            onMouseEnter={showTextInput}
            onMouseLeave={hideTextInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                promptSubmit(); 
              }
            }}
          />
          {loading && <p>Loading, please wait, might take a minute...</p>}
        </div>
        <div className={`home-button-wrapper ${loading ? "loading" : ""}`}>
          <img
            src={plusIcon}
            onClick={promptSubmit}
            onMouseEnter={showTextInput}
            onMouseLeave={hideTextInput}
            className="home-button"
            style={{ opacity: loading ? 0 : 1 }}
          />
        </div>
      </div> */}
      <div>
        <ModelUploader newModel={modelUrls} />
      </div>
    </div>
  );
};

export default TextInput;
