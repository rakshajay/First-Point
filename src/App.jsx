import './App.scss'
import React, { useState } from "react";
import {BrowserRouter,Routes, Route} from "react-router-dom";
import ModelUploader from './Components/ModelUploader/ModelUploader';



function App() {
  return (
  <BrowserRouter>
        <Routes>
                <Route
                  path="/"
                  element={<ModelUploader />}
                />
                </Routes>
                
  </BrowserRouter>
  )
}

export default App
