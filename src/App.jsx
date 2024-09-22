import './App.scss';
import React, { useState } from "react";
import {BrowserRouter,Routes, Route} from "react-router-dom";
import TextInput from './Components/TextInput/TextInput';
import { Suspense } from "react";
import SelfIntro from './Components/SelfIntro/SelfIntro';
import Architecture from './pages/Architecture/Architecture';
import Header from './Components/Header/Header';



function App() {
  return (
  <BrowserRouter>
  <Header />
        <Routes>
                <Route
                  path="/"
                  element={<Suspense fallback={null}><TextInput /></Suspense>}
                />
                <Route
                  path="/intro"
                  element={<SelfIntro />}
                />
                <Route
                  path="/Architecture"
                  element={<Architecture />}
                />
                </Routes>
                
  </BrowserRouter>
  )
}

export default App
