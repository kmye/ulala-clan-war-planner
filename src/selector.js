import {TEAM_TYPE_ATTACK, TEAM_TYPE_DEFENSE, TEAM_TYPE_ELITE} from "./constants/teamTypes";

export const getAllPlayers = store => store.player.players;

export const getDefensePlayers = (players) => {
    return players.filter((value) => {
        return value.teamType === TEAM_TYPE_DEFENSE;
    })
};

export const getAttackPlayers = (players) => {
    return players.filter((value) => {
        return value.teamType === TEAM_TYPE_ATTACK;
    })
}

export const getElitePlayers = (players) => {
    return players.filter((value) => {
        return value.teamType === TEAM_TYPE_ELITE;
    })
}

export const getPlayersByTeamIndex = (players, index) => {
    return players.filter((value) => {
        return value.teamIndex === index;
    })
};
