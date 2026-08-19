import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react'
import Classlist from './components/Classlist';
import DetailClass from './components/DetailClass';

//1.Reducer: Quản lý trạng thái lớp học
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/classes" element={<Classlist />} />
        <Route path="/detail/:id" element={<DetailClass />} />
        <Route path="/" element={<Navigate to="/classes" replace/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

