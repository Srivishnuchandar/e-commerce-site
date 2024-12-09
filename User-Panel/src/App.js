import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./reg";
import Login from './login';
import Welcome from './welcome';
import Profile from './myprofile';
function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;