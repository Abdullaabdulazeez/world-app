// src/App.js
import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FavoritePage } from './component/FavoritePage';
import { LoginPage } from './component/LoginPage';
import { Registerpage } from './component/Registerpage';
import { HomePage } from './component/HomePage';
import { Navbar } from './component/NavBar';


export const AuthContext = createContext();

function App() {
  const [auth, setAuth] = useState(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Registerpage />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
