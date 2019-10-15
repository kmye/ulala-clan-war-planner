import {PLAYER_ADD, PLAYER_DELETE, PLAYER_INIT, PLAYER_UPDATE} from "../constants/actionTypes";
import {PLAYER_MASTER} from "../constants/localStorage";

function storePlayersInLocalStorage(players) {
    localStorage.setItem(PLAYER_MASTER, JSON.stringify(players));
}

function removePlayerFromArray(playerIndex, arrayList) {
    let filtered = arrayList.filter(function (value, index) {
        return index !== playerIndex;
    });

    // update all index
    return filtered.map((item, index) => {
        item.playerIndex = index;
        return item;
    })
}

function updatePlayerInArray(player, arrayList) {
    return arrayList.map((item, index) => {
        if (index !== player.playerIndex) {
            return item
        }

        // Otherwise, this is the one we want - return an updated value
        return {
            ...item,
            ...player
        }
    })
}

export default (state = {}, action) => {

    switch (action.type) {

        case PLAYER_INIT: {
            let localStoragePlayers = localStorage.getItem(PLAYER_MASTER);
            return {
                ...state,
                players: localStoragePlayers == null ? [] : JSON.parse(localStoragePlayers)
            };
        }

        case PLAYER_ADD: {
            let {player} = action.payload;
            let newPlayers = state.players.slice();
            player.playerIndex = newPlayers.length;
            newPlayers.push(player);
            storePlayersInLocalStorage(newPlayers);
            return {
                ...state,
                players: newPlayers
            };
        }

        case PLAYER_UPDATE: {
            let updatedArray = updatePlayerInArray(action.payload.player, state.players);
            storePlayersInLocalStorage(updatedArray);
            return {
                ...state,
                players: updatedArray
            };
        }

        case PLAYER_DELETE: {
            let filtered = removePlayerFromArray(action.payload.playerIndex, state.players);
            storePlayersInLocalStorage(filtered);
            return {
                ...state,
                players: filtered
            };
        }


        default:
            return state;
    }
}
