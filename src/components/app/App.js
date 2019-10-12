import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {connect} from "react-redux";
import {Layout} from "antd";
import ClanWarPlanner from "../clan-war/ClanWarPlanner";

const {Header, Footer, Content} = Layout;

function App() {
    return (
        <Layout>
            <Header className="header" style={{background: "antiquewhite"}}><h2>Ulala Clan War Planner</h2></Header>
            <Content style={{padding: '0 24px', minHeight: 800}}><ClanWarPlanner/></Content>
            <Footer style={{textAlign: 'center'}}>Developed by kmye ©2019</Footer>
        </Layout>

    );
}

export default connect()(App);
