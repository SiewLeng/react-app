import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Counter } from './features/counter/Counter';
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path ='/' element={<Home/>}/>
        <Route path ='/counter' element={<Counter/>}/>
        <Route path ='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;