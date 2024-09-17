import React, { useState } from 'react';
import axios from 'axios';
import './TextInput.scss';

const TextInput = () => {
  const [prompt, setPrompt] = useState('');
  const [modelId, setModelId] = useState(null);

//   const apiKey = 'msy_cEGM8k0DmZMYMcDgr9h6MwIVsxeDxUEQrrty'; // Replace with your Meshy API key-fedra
  const apiKey = 'msy_3hxOqTwQqyAEG0A778oruSNfhYYYdwDoU1YE';
   const apiUrl = 'https://api.meshy.ai/v2/text-to-3d/';
  // Function to handle the prompt submission
  const promptSubmit = async () => {
    try {
      // POST request to create a 3D model based on the prompt
      const response = await axios.post(
        `${apiUrl}`,
        {
          mode: 'preview',
          prompt: prompt,
          art_style: 'realistic',
          negative_prompt: 'low quality, low resolution, low poly, ugly',
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
    
      const modelId = response.data.result; // Get the model ID from the response
      setModelId(modelId);
      console.log('Model ID:', modelId);

      // GET request to fetch model URLs using the model ID
      const getModelResponse = await axios.get(
        `${apiUrl}${modelId}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const modelUrls = getModelResponse.data;
      console.log('3D Model URLs:', modelUrls);
      
    } catch (error) {
      console.error('Error creating 3D model:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt for 3D model"
      />
      <button onClick={promptSubmit}>Submit</button>
    </div>
  );
};

export default TextInput;
