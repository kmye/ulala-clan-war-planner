import {
    PLAYER_ADD,
    PLAYER_DELETE,
    PLAYER_FORM_CLOSE,
    PLAYER_FORM_OPEN,
    PLAYER_INIT,
    PLAYER_UPDATE
} from "../../constants/actionTypes";

export const initPlayers = () => ({
    type: PLAYER_INIT
})

let playerId = 0;

export const addPlayer = content => ({
    type: PLAYER_ADD,
    payload: {
        id: ++playerId,
        player: content
    }
});

export const updatePlayer = content => ({
    type: PLAYER_UPDATE,
    payload: {
        player: content
    }
})

export const deletePlayer = playerId => ({
    type: PLAYER_DELETE,
    payload: {
        id: playerId
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
