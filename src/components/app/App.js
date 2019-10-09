import React from 'react';
import './App.css';
import {ClanWarSetting} from '../clan-war/ClanWarSetting.js';
import 'antd/dist/antd.css';
import {connect} from "react-redux";

function App() {
    return (
        <div className="App">
            <header className="App-header">
            </header>
            <ClanWarSetting/>
        </div>
    );
}

export default connect()(App);
