import React from 'react';
import './App.css';
import {TodolistsList} from "./components/todolists/TodolistsList";
import {Header} from "./components/header/Header";

function App() {

    return (
        <div className='App'>
            <div className={'container'}>
                <Header/>
                <TodolistsList/>
            </div>
        </div>
    );
}

export default App;
