import React from "react";
import {Col, Row} from "antd";
import {getDefensePlayers, getElitePlayers, getPlayersByTeamIndex} from "../../selector";
import {connect} from "react-redux";
import {TeamCard} from "./TeamCard";
import {assignPlayerTeam} from "../../actions/player";
import {TEAM_TYPE_DEFENSE} from "../../constants/teamTypes";

const mapStateToProps = state => ({
   ...state.player
});

class TeamList extends React.Component {

    updatePlayerToTeam = (player, team) => {
        this.props.assignPlayerTeam(player, team)
    };

    render() {

        console.log("render team list")

        let defenseTeamTemplates = [];
        let defenseTeamPlayers = [];

        let attackTeamTemplates = [];
        let attackTeamPlayers = [];

        let eliteTeamPlayers = [];

        if (this.props.players != null) {
            let i;
            // defense teams
            defenseTeamPlayers = getDefensePlayers(this.props.players);

            console.log(defenseTeamPlayers)

            for (i = 0; i < 8; i++) {
                let players = getPlayersByTeamIndex(defenseTeamPlayers, i);

                defenseTeamTemplates.push({
                    players: players,
                    teamType: TEAM_TYPE_DEFENSE,
                    teamIndex: i
                });
            }

            // elite team
            eliteTeamPlayers = getElitePlayers(this.props.players)

            // attack teams
            // attackTeamPlayers = getAttackPlayers(players);
            //
            // for (i = 0; i < 8; ++i) {
            //     attackTeamTemplates[i].players = getPlayersByTeamIndex(attackTeamPlayers, i);
            // }
        }

        return (
            <Row gutter={16}
                 type="flex"
                 justify="space-around"
                 align="middle">
                <Col span={8}>
                    <h3>Defense</h3>
                    {
                        defenseTeamTemplates.map((item, index) => (
                            <TeamCard key={index} team={item}
                                      updatePlayerToTeam={this.updatePlayerToTeam}/>
                        ))
                    }
                </Col>
                <Col span={8}>
                    <h3>Elite</h3>
                </Col>
                <Col span={8}>
                    <h3>Attack</h3>
                    {
                        attackTeamTemplates.map((item, index) => (
                            <TeamCard key={index} team={item}
                                      updatePlayerToTeam={this.updatePlayerToTeam}/>
                        ))
                    }
                </Col>
            </Row>

        )
    }
}

export default connect(mapStateToProps, {assignPlayerTeam})(TeamList);
