import React, { Component } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import ToDo from "../ToDo/ToDo";
import './App.scss';

function App() {
    return (
        <div>
            <Header />
            <div className="page-main">
                <Sidebar/>
                <ToDo/>
            </div>
        </div>
    );
}

export default App;