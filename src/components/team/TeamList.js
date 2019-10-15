import React from "react";
import {Col, Row} from "antd";
import {getAllPlayers, getPlayersByTeamIndex, getPlayersByTeamType} from "../../selector";
import {connect} from "react-redux";
import {TeamCard} from "./TeamCard";
import {updatePlayer} from "../../actions/player";
import {TeamType} from "../../constants/teamTypes";

const mapStateToProps = state => ({
    players: getAllPlayers(state)
});

class TeamList extends React.Component {

    updatePlayerToTeam = (player, team) => {
        player.teamIndex = team.teamIndex;
        player.teamType = team.teamType;
        this.props.updatePlayer(player)
    };

    buildTeamTemplateByType(players, teamType, totalTeams) {
        let teamPlayers = getPlayersByTeamType(this.props.players, teamType);
        let teamTemplate = [];

        for (let i = 0; i < totalTeams; i++) {
            teamTemplate.push({
                players: getPlayersByTeamIndex(teamPlayers, i),
                teamType: teamType,
                teamIndex: i
            });
        }

        return teamTemplate;
    }

    renderTeam(teams) {
        return (
            teams.map((item, index) => (
                <TeamCard key={index} team={item}
                          updatePlayerToTeam={this.updatePlayerToTeam}/>
            ))
        )
    }

    render() {

        let defenseTeamTemplates = [];
        let attackTeamTemplates = [];
        let eliteTeamTemplates = [];

        if (this.props.players != null) {
            // defense teams
            defenseTeamTemplates = this.buildTeamTemplateByType(this.props.players, TeamType.DEFENSE, 8);
            attackTeamTemplates = this.buildTeamTemplateByType(this.props.players, TeamType.ATTACK, 8);
            eliteTeamTemplates = this.buildTeamTemplateByType(this.props.players, TeamType.ELITE, 1);
        }

        return (
            <Row gutter={16}
                 type="flex"
                 justify="space-around"
                 align="top">
                <Col span={8}>
                    <h3>Defense</h3>
                    {this.renderTeam(defenseTeamTemplates)}
                </Col>
                <Col span={8}>
                    <h3>Elite</h3>
                    {this.renderTeam(eliteTeamTemplates)}
                </Col>
                <Col span={8}>
                    <h3>Attack</h3>
                    {this.renderTeam(attackTeamTemplates)}
                </Col>
            </Row>

        )
    }


}

export default connect(mapStateToProps, {updatePlayer})(TeamList);
