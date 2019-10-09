import React from 'react';
import {Player} from './Player.js';
import {Card, Col, Row} from 'antd';


export class Team extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            teamIndex: props.teamIndex,
            teamType: props.teamType,
            players: Array(4).fill(null),
            teamPower: 0
        };

    }

    onPlayerDataChange = (formValues, playerIndex) => {

        this.setState((state) => {

            let newPlayers = state.players.map((item, index) => {
                if (index === playerIndex) {
                    return {value: formValues};
                }
                return item;
            })

            return {
                players: newPlayers,
                teamPower: this.getTeamPower(newPlayers)
            }
        })

    }

    renderPlayer(index) {
        return (
            <Col key={index}>
                <Player playerIndex={index} value={this.state.players[index]}
                        onChange={this.onPlayerDataChange}/>
            </Col>
        );
    }

    render() {
        return (
            <Card title={"Team " + this.state.teamIndex}>
                <Card.Meta title={"Power: " + this.state.teamPower}/>
                <br/>
                <Row>
                    {this.state.players.map((item, index) => (this.renderPlayer(index)))}
                </Row>
            </Card>
        )
    }

    getTeamPower = (players) => {
        let totalPower = 0;

        for (let i = 0; i < 4; ++i) {
            if (players[i] != null) {
                totalPower += parseInt(players[i].value.power);
            }
        }

        return totalPower;
    }
}
