import React from 'react';
import {Team} from './Team.js';
import {Col, Row} from 'antd';

export class ClanWarSetting extends React.Component {

    constructor(props) {
        super(props);

        let defenseTeams = [];
        let attackTeams = [];

        for (let i = 0; i < 8; ++i) {
            defenseTeams.push(new Team({teamIndex: i, teamType: "Defense"}));
            attackTeams.push(new Team({teamIndex: i, teamType: "Attack"}));
        }
        this.state = {
            defenseTeams: defenseTeams,
            attackTeams: attackTeams,
            eliteTeam: new Team({teamIndex: 1, teamType: "Elite"}),
        };

    }

    renderTeamByTypes(teams) {
        return (
            <Row gutter={16}>
                {teams.map((item, index) => (
                    <Col key={index} span={12}>
                        <Team key={index} teamIndex={index + 1} value={item}/>
                    </Col>
                ))}
            </Row>
        );
    }

    render() {

        return (
            <div>

                {this.renderTeamByTypes(this.state.defenseTeams)}

                <Row>
                    <Col span={12}>
                        <Team teamIndex={1} value={this.state.eliteTeam}/>
                    </Col>
                </Row>

                {this.renderTeamByTypes(this.state.attackTeams)}

            </div>
        )
    }
}
