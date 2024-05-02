import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Index from "views/Index.js";
import FullAnalysis from "views/examples/analysis/FullAnalysis.js";
import IntensiveAnalysis from "views/examples/analysis/IntensiveAnalysis/IntensiveAnalysis.js";
import MapAnalysis from "views/examples/analysis/MapAnalysis.js";
import IntensiveAnalysis from "views/examples/analysis/IntensiveAnalysis.js";
import MapAnalysis from "views/examples/analysis/Map/MapAnalysis.js";
import Landing from "views/examples/Landing.js";
import Login from "views/examples/Login.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import ChatBot from './views/examples/chatBot/chatBot.js';
import { AuthProvider } from 'contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" exact element={<Index />} />
        <Route path="/landing-page" exact element={<Landing />} />
        <Route path="/full-analysis-page" exact element={<FullAnalysis />} />
        <Route path="/intensive-analysis-page" exact element={<IntensiveAnalysis />} />
        <Route path="/map-analysis-page" exact element={<MapAnalysis />} />
        <Route path="/login-page" exact element={<Login />} />
        <Route path="/profile-page" exact element={<Profile />} />
        <Route path="/register-page" exact element={<Register />} />
        <Route path="/chat-bot" element={<ChatBot />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
