import React, { useState } from "react";
import axios from "axios";
import "./TextInput.scss";
import ModelUploader from "../ModelUploader/ModelUploader";
import InfoModal from "../InfoModal/InfoModal";
import plusIcon from "../../assets/Icons/plus-3.png";

const TextInput = () => {
  const [prompt, setPrompt] = useState("");
  const [modelId, setModelId] = useState(null);
  const [modelUrls, setModelUrls] = useState(null);
  const [textInputOpen, setTextInputOpen] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state

  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_CODE;

  const promptSubmit = async () => {
    try {
      setLoading(true); // Start loading when prompt is submitted
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
            setModelUrls(getModelResponse.data.model_urls.glb);
            console.log("model url triggred", modelUrls);
            setLoading(false); // Stop loading when model is ready
            clearInterval(checkModelProgress);
          } else {
            console.log(
              "Model Loading Progress:",
              getModelResponse.data.progress
            );
          }
        } catch (error) {
          console.error("Error checking model progress:", error);
          setLoading(false); // Stop loading on error
          clearInterval(checkModelProgress);
        }
      }, 1 * 60 * 1000); // Check progress every minute
    } catch (error) {
      console.error("Error creating 3D model:", error);
      setLoading(false); // Stop loading on error
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
      <div className="home-prompt">
        <div style={{ visibility: textInputOpen ? "visible" : "hidden" }}>
          <h2 className="home-info"> 
            "Hey there! Why not add your favorite object and become part of this collaborative installation?"
          </h2>
        </div>
        <div >
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
    
          />{loading && <p>Loading, please wait, might take a minute...</p>}
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

      </div>

      {/* <div>{modalOpen && <InfoModal />}</div> */}

      
      <div>
        <ModelUploader newModel={modelUrls} />
      </div>
    </div>
  );
};

export default TextInput;
