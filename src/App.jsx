import './App.scss';
import React from "react";
import {BrowserRouter,Routes, Route} from "react-router-dom";
import TextInput from './Components/TextInput/TextInput';
import { Suspense } from "react";
import SelfIntro from './Components/SelfIntro/SelfIntro';
import ProjectGallery from './pages/ProjectGallery/ProjectGallery';
import AllProjects from './pages/AllProjects/AllProjects';
import OnBuild from './Components/OnBuild/OnBuild';
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
                  element={<ProjectGallery />}
                />
                <Route
                  path="/OnBuild"
                  element={<OnBuild />}
                />
                <Route
                  path="/OnBuild"
                  element={<OnBuild />}
                />
                <Route
                  path="/webdev"
                  element={<ProjectGallery />}
                />
                <Route
                  path="/OnBuild"
                  element={<OnBuild />}
                />
                <Route
                  path="/OnBuild"
                  element={<OnBuild />}
                />
                <Route
                  path="/projects"
                  element={<AllProjects />}
                />
                </Routes>
                <Footer />
  </BrowserRouter>
  )
}

export default App
