import './App.scss';
import React, { useState } from "react";
import {BrowserRouter,Routes, Route} from "react-router-dom";
import TextInput from './Components/TextInput/TextInput';
import { Suspense } from "react";
import SelfIntro from './Components/SelfIntro/SelfIntro';
import Architecture from './pages/Architecture/Architecture';
import WebDev from './pages/WebDev/WebDev';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Resume from './Components/Resume/Resume';

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
                  path="/resume"
                  element={<Resume />}
                />
                <Route
                  path="/architecture"
                  element={<Architecture />}
                />
                <Route
                  path="/webdev"
                  element={<WebDev />}
                />
                </Routes>
                <Footer />
  </BrowserRouter>
  )
}

export default App
