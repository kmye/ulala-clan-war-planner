/* eslint react/prop-types: 0 */

import React from "react";
import {Col, Divider, Row} from "antd";
import {getAllPlayers, getPlayersByTeamIndex, getPlayersByTeamType} from "../../selector";
import {connect} from "react-redux";
import {TeamCard} from "./TeamCard";
import {unassignPlayer, updatePlayer} from "../../actions/player";
import {TeamType} from "../../constants/team_types";

const mapStateToProps = state => ({
    ...state.teamList,
    players: getAllPlayers(state),
});

class TeamList extends React.Component {

    updatePlayerToTeam = (player, team) => {
        player.teamIndex = team.teamIndex;
        player.teamType = team.teamType;
        this.props.updatePlayer(player)
    };

    onUnassignPlayerClick = (player) => {
        this.props.unassignPlayer(player);
    };

    buildTeamTemplateByType(players, teamType, totalTeams) {
        const teamPlayers = getPlayersByTeamType(this.props.players, teamType);
        const teamTemplate = [];

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
        const isEliteTeam = teams && teams.length === 1;

        return (
            teams.map((item, index) => (
                <Col span={!isEliteTeam ? 12 : 24} key={index}>
                    <TeamCard team={item}
                              updatePlayerToTeam={this.updatePlayerToTeam}
                              onUnassignPlayerClick={this.onUnassignPlayerClick}/>
                </Col>
            ))
        )
    }

    renderInRows(defenseTeamTemplates, eliteTeamTemplates, attackTeamTemplates) {
        return (
            <>
                <Divider><h2>Defense</h2></Divider>
                <Row>{this.renderTeam(defenseTeamTemplates)}</Row>
                <Divider><h2>Elite</h2></Divider>
                <Row>{this.renderTeam(eliteTeamTemplates)}</Row>
                <Divider><h2>Attack</h2></Divider>
                <Row>{this.renderTeam(attackTeamTemplates)}</Row>
            </>
        )
    }

    render() {

        const players = this.props.players;

        const defenseTeamTemplates = (players != null) ? this.buildTeamTemplateByType(players, TeamType.DEFENSE, 8) : [];
        const attackTeamTemplates = (players != null) ? this.buildTeamTemplateByType(players, TeamType.ATTACK, 8) : [];
        const eliteTeamTemplates = (players != null) ? this.buildTeamTemplateByType(players, TeamType.ELITE, 1): [];

        return (
            this.renderInRows(defenseTeamTemplates, eliteTeamTemplates, attackTeamTemplates)
        )
    }
}

export default connect(mapStateToProps, {updatePlayer, unassignPlayer})(TeamList);
