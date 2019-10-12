import {PLAYER_ADD, PLAYER_DELETE, PLAYER_INIT, PLAYER_UPDATE} from "../constants/actionTypes";

export default (state = {}, action) => {

    switch (action.type) {

        case PLAYER_INIT: {
            return {
                ...state,
                players: []
            };
        }

        case PLAYER_ADD: {
            action.payload.player.playerId = action.payload.id;
            state.players[action.payload.id] = action.payload.player;
            return {
                ...state,
                players: state.players
            };
        }

        case PLAYER_UPDATE: {
            let filtered = state.players.filter(function (value, index, arr) {
                return value.playerId !== action.payload.player.playerId;
            });
            filtered[action.payload.player.playerId] = action.payload.player;

            return {
                ...state,
                players: filtered
            };
        }

        case PLAYER_DELETE: {
            let filtered = state.players.filter(function (value, index, arr) {
                return value.playerId !== action.payload.id;
            });

            return {
                ...state,
                players: filtered
            };
        }

        default:
            return state;
    }
}
