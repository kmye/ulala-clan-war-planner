import {PLAYER_ADD, PLAYER_ASSIGN_TEAM, PLAYER_DELETE, PLAYER_INIT, PLAYER_UPDATE} from "../constants/actionTypes";
import {PLAYER_MASTER} from "../constants/localStorage";


function storePlayersInLocalStorage(players) {
    localStorage.setItem(PLAYER_MASTER, JSON.stringify(players));
}

function removePlayerIdFromArray(playerId, arrayList) {
    return arrayList.filter(function (value, index) {
        return index !== playerId;
    });
}

export default (state = {}, action) => {

    switch (action.type) {

        case PLAYER_INIT: {
            const localStoragePlayers = localStorage.getItem(PLAYER_MASTER);
            return {
                ...state,
                players: localStoragePlayers == null ? [] : JSON.parse(localStoragePlayers)
            };
        }

        case PLAYER_ADD: {
            action.payload.player.playerId = action.payload.id;
            state.players.push(action.payload.player);
            storePlayersInLocalStorage(state.players);
            return {
                ...state,
                players: state.players
            };
        }

        case PLAYER_UPDATE: {
            state.players[action.payload.player.playerIndex] = action.payload.player;
            storePlayersInLocalStorage(state.players);
            return {
                ...state,
                players: state.players
            };
        }

        case PLAYER_DELETE: {
            let filtered = removePlayerIdFromArray(action.payload.id, state.players);
            storePlayersInLocalStorage(filtered);
            return {
                ...state,
                players: filtered
            };
        }

        case PLAYER_ASSIGN_TEAM: {
            const {player, team} = action.payload;
            player.teamIndex = team.teamIndex;
            player.teamType = team.teamType;
            state.players[action.payload.player.playerIndex] = player;
            storePlayersInLocalStorage(state.players);
            return {
                ...state,
                players: state.players
            }
        }
        default:
            return state;
    }
}
