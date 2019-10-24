import {
    PLAYER_ADD,
    PLAYER_AUTO_ASSIGN,
    PLAYER_CLEAR,
    PLAYER_DELETE,
    PLAYER_INIT,
    PLAYER_SORT_BY_POWER,
    PLAYER_UNASSIGN,
    PLAYER_UPDATE
} from "../constants/actionTypes";
import {PLAYER_MASTER} from "../constants/localStorage";
import {ClassType, getAllClassIdsByType} from "../constants/ulalaClasses";
import {TeamType} from "../constants/teamTypes";

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

function sortPlayers(players, sortAscending) {
    let sorted = players.sort(function (a, b) {
        return (sortAscending) ? (a.power - b.power) : (b.power) - (a.power);
    });

    return sorted.map((item, index) => {
        item.playerIndex = index;
        return item;
    });
}

function autoAssignPlayers(players) {

    let sortedPlayers = sortPlayers(players, false);

    // separate into tank, dps and healers
    let tankPlayers = sortedPlayers.filter((item) => {
        return getAllClassIdsByType(ClassType.TANK).includes(item.class.key)
    });

    let dpsPlayers = sortedPlayers.filter((item) => {
        return getAllClassIdsByType(ClassType.DPS).includes(item.class.key)
    });

    let magicDpsPlayers = sortedPlayers.filter((item) => {
        return getAllClassIdsByType(ClassType.MAGIC_DPS).includes(item.class.key)
    });

    let supportPlayers = sortedPlayers.filter((item) => {
        return getAllClassIdsByType(ClassType.SUPPORT).includes(item.class.key)
    });

    let assignedPlayers = [];

    const shiftPlayer = (players, teamIndex, teamType) => {
        let player = players.shift();
        player.teamIndex = teamIndex;
        player.teamType = teamType;

        return player;
    };

    const assignToTeams = (teamIndex, teamType) => {
        let assignedCount = 0;

        do {
            if (tankPlayers.length > 0) {
                assignedPlayers.push(shiftPlayer(tankPlayers, teamIndex, teamType));
                ++assignedCount;
            }

            if (supportPlayers.length > 0) {
                assignedPlayers.push(shiftPlayer(supportPlayers, teamIndex, teamType));
                ++assignedCount;
            }

            if (magicDpsPlayers.length > 0) {
                assignedPlayers.push(shiftPlayer(magicDpsPlayers, teamIndex, teamType));
                ++assignedCount;
            }

            if (dpsPlayers.length > 0) {
                assignedPlayers.push(shiftPlayer(dpsPlayers, teamIndex, teamType));
                ++assignedCount;
            }

        } while (assignedCount < 4)
    };

    assignToTeams(0, TeamType.ELITE);

    for (let i = 0; i < 8; ++i) {
        assignToTeams(i, TeamType.ATTACK);
        assignToTeams(i, TeamType.DEFENSE);
    }

    let unassignedPlayers = sortedPlayers.filter((item) => {
        return item.teamIndex === undefined || item.teamIndex === null;
    });

    return assignedPlayers.concat(unassignedPlayers);
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

        case PLAYER_CLEAR: {
            localStorage.setItem(PLAYER_MASTER, null);
            return {
                ...state,
                players: []
            }
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

        case PLAYER_SORT_BY_POWER:
            const sortType = action.payload.sortType;
            let sorted = sortPlayers(state.players, sortType);
            storePlayersInLocalStorage(sorted);
            return {
                ...state,
                players: sorted
            };

        case PLAYER_AUTO_ASSIGN: {
            let assignedPlayers = autoAssignPlayers(state.players);
            storePlayersInLocalStorage(assignedPlayers);
            return {
                ...state,
                players: assignedPlayers
            }
        }
        case PLAYER_UNASSIGN: {
            let player = action.payload.player;
            player.teamIndex = null;
            player.teamType = null;
            let updatedArray = updatePlayerInArray(player, state.players);
            storePlayersInLocalStorage(updatedArray);
            return {
                ...state,
                players: updatedArray
            }
        }

        default:
            return state;
    }
}
