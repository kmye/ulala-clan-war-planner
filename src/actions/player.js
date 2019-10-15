import {
    PLAYER_ADD, PLAYER_CLEAR,
    PLAYER_DELETE,
    PLAYER_FORM_CLOSE,
    PLAYER_FORM_OPEN,
    PLAYER_INIT,
    PLAYER_SORT_BY_POWER,
    PLAYER_UPDATE
} from "../constants/actionTypes";

export const initPlayers = () => ({
    type: PLAYER_INIT
});

export const clearPlayers = () => ({
    type: PLAYER_CLEAR
})

export const addPlayer = player => ({
    type: PLAYER_ADD,
    payload: {
        player: player
    }
});

export const updatePlayer = (player) => ({
    type: PLAYER_UPDATE,
    payload: {
        player: player
    }
});

export const deletePlayer = playerIndex => ({
    type: PLAYER_DELETE,
    payload: {
        playerIndex: playerIndex
    }
});

export const sortPlayersByPower = sortType => ({
    type: PLAYER_SORT_BY_POWER,
    payload: {
        sortType: sortType
    }
})

export const openForm = (player) => ({
    type: PLAYER_FORM_OPEN,
    payload: {
        playerInput: player
    }
});

export const closeForm = () => ({
    type: PLAYER_FORM_CLOSE,
});
