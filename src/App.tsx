import React from 'react';
import './App.css';
import {TodolistsList} from "./components/todolists/TodolistsList";
import {Header} from "./components/header/Header";
import {Navigate, Route, Routes} from 'react-router-dom';
import { Login } from './components/login/Login';

function App() {

    return (
        <div className='App'>
            <div className={'container'}>
                <Header/>
                <Routes>
                    <Route path="/" element={<TodolistsList/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to={"/404"}/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
