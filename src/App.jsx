import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AppViews } from './WebSite/AppViews';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { Authorized } from './WebSite/Authorized';
import React from 'react';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="*"
        element={
          <Authorized>
            <AppViews />
          </Authorized>
        }
      />
    </Routes>
  )
}

export default App

