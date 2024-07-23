import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoginPage from './LoginPage';
import ForgetPasswordPage from './ForgetPasswordPage';
import Register from './Register';
import CardTransition from './CardTransition';
import ResetPasswordPage from './ResetPasswordPage';


const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<CardTransition><LoginPage /></CardTransition>} />
        <Route path="/register" element={<CardTransition><Register /></CardTransition>} />
        <Route path="/forget-password" element={<CardTransition><ForgetPasswordPage /></CardTransition>} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage/>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
