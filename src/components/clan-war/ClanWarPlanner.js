import React from "react";
import {Layout} from "antd";
import PlayerList from "../player/PlayerList";

const {Sider} = Layout

function ClanWarPlanner() {
    return (
        <Layout>
            <Sider
                width={250}
                style={{
                    background: "white",
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
            >
                <PlayerList/>
            </Sider>


        </Layout>
    )
}

export default ClanWarPlanner
