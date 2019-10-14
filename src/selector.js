import {TEAM_TYPE_ATTACK, TEAM_TYPE_DEFENSE, TEAM_TYPE_ELITE} from "./constants/teamTypes";

export const getAllPlayers = store => store.player.players;

const fillUpEmptySpots = (players) => {
    let emptySpots = 4 - players.length;
    for (let i = 0; i < emptySpots; i++) {
        players.push(null)
    }
    return players;
};

export const getDefensePlayers = (players) => {
    return players.filter((value) => {
        return value.teamType === TEAM_TYPE_DEFENSE;
    })
};

export const getAttackPlayers = (players) => {
    return players.filter((value) => {
        return value.teamType === TEAM_TYPE_ATTACK;
    })
};

export const getElitePlayers = (players) => {
    let filtered = players.filter((value) => {
        return value.teamType === TEAM_TYPE_ELITE;
    });
    return fillUpEmptySpots(filtered)
};

export const getPlayersByTeamIndex = (players, index) => {
    let filtered = players.filter((value) => {
        return value.teamIndex === index;
    });

    return fillUpEmptySpots(filtered)
};
