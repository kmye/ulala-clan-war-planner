import {
    PLAYER_ADD, PLAYER_ASSIGN_TEAM,
    PLAYER_DELETE,
    PLAYER_FORM_CLOSE,
    PLAYER_FORM_OPEN,
    PLAYER_INIT,
    PLAYER_UPDATE
} from "../constants/actionTypes";
import {PLAYER_ID} from "../constants/localStorage";

export const initPlayers = () => ({
    type: PLAYER_INIT
});

let storagePlayerId = localStorage.getItem(PLAYER_ID);
let playerId = storagePlayerId ? parseInt(storagePlayerId) : 0;

const incrementPlayerId = () => {
    let newPlayerId = ++playerId;
    localStorage.setItem(PLAYER_ID, newPlayerId);
    return newPlayerId
};

export const addPlayer = content => ({
    type: PLAYER_ADD,
    payload: {
        id: incrementPlayerId(),
        player: content
    }
});

export const updatePlayer = (content) => ({
    type: PLAYER_UPDATE,
    payload: {
        player: content
    }
})

export const deletePlayer = playerIndex => ({
    type: PLAYER_DELETE,
    payload: {
        id: playerIndex
    }
});

export const assignPlayerTeam = (player, team) => ({
    type: PLAYER_ASSIGN_TEAM,
    payload: {
        player: player,
        team: team
    }
});


export const openForm = (player) => ({
    type: PLAYER_FORM_OPEN,
    payload: {
        player
    }
});

export const closeForm = () => ({
    type: PLAYER_FORM_CLOSE,
});
