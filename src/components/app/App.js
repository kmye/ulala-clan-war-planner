import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import PlayerList from '../player/PlayerList';
import TeamList from '../team/TeamList';

const {
  Header, Footer, Sider, Content,
} = Layout;

function App() {
  const siderWidth = 300;

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <Sider
          width={siderWidth}
          style={{
            background: '#fff',
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,

          }}
        >
          <PlayerList />
        </Sider>

        <Layout style={{
          marginLeft: siderWidth,
          height: '100vh',
        }}
        >

          <Header className="header" style={{ background: 'antiquewhite' }}><h2>Ulala Clan War Planner</h2></Header>

          <Content style={{
            margin: '10px',
            padding: '20px',
            background: 'white',
            overflow: 'auto',
          }}
          >

            <TeamList />

          </Content>

          <Footer className="custom-footer">Developed by kmye ©2019</Footer>
        </Layout>

      </Layout>
    </DndProvider>

  );
}

export default connect()(App);
