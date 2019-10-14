import React from "react";
import {Col, Row} from "antd";
import {getAttackPlayers, getDefensePlayers, getElitePlayers, getPlayersByTeamIndex} from "../../selector";
import {connect} from "react-redux";
import {TeamCard} from "./TeamCard";
import {updatePlayer} from "../../actions/player";
import {TEAM_TYPE_ATTACK, TEAM_TYPE_DEFENSE, TEAM_TYPE_ELITE} from "../../constants/teamTypes";

const mapStateToProps = state => ({
    ...state.player
});

class TeamList extends React.Component {

    updatePlayerToTeam = (player, team) => {
        player.teamIndex = team.teamIndex;
        player.teamType = team.teamType;
        this.props.updatePlayer(player)
    };

    render() {

        let defenseTeamTemplates = [];
        let defenseTeamPlayers = [];

        let attackTeamTemplates = [];
        let attackTeamPlayers = [];

        let eliteTeamPlayers = [];

        if (this.props.players != null) {
            let i;
            // defense teams
            defenseTeamPlayers = getDefensePlayers(this.props.players);

            for (i = 0; i < 8; i++) {
                defenseTeamTemplates.push({
                    players: getPlayersByTeamIndex(defenseTeamPlayers, i),
                    teamType: TEAM_TYPE_DEFENSE,
                    teamIndex: i
                });
            }

            // elite team
            eliteTeamPlayers = {
                players: getElitePlayers(this.props.players),
                teamType: TEAM_TYPE_ELITE,
                teamIndex: 0
            };

            // attack teams
            attackTeamPlayers = getAttackPlayers(this.props.players);

            for (i = 0; i < 8; ++i) {
                attackTeamTemplates.push({
                    players: getPlayersByTeamIndex(attackTeamPlayers, i),
                    teamType: TEAM_TYPE_ATTACK,
                    teamIndex: i
                });
            }
        }

        return (
            <Row gutter={16}
                 type="flex"
                 justify="space-around"
                 align="top">
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
                    {
                        <TeamCard key={0} team={eliteTeamPlayers}
                              updatePlayerToTeam={this.updatePlayerToTeam}/>
                    }
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

export default connect(mapStateToProps, {updatePlayer})(TeamList);
