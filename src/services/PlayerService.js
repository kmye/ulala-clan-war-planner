import {PLAYER_MASTER} from "../constants/localStorage";
import {ClassType, getAllClassIdsByType} from "../constants/ulalaClasses";
import {TeamType} from "../constants/teamTypes";

class PlayerService {

    addPlayer(player, existingPlayerList) {
        let newPlayers = existingPlayerList.slice();
        player.playerIndex = newPlayers.length;
        newPlayers.push(player);
        this.storePlayersInLocalStorage(newPlayers);
        return newPlayers;
    }

    updatePlayer(player, existingPlayers) {
        const results = existingPlayers.map((item, index) => {
            if (index !== player.playerIndex) {
                return item
            }

            // Otherwise, this is the one we want - return an updated value
            return {
                ...item,
                ...player
            }
        });
        this.storePlayersInLocalStorage(results);
        return results;
    }

    sortPlayers(players, sortAscending) {
        let sorted = players.sort(function (a, b) {
            return (sortAscending) ? (a.power - b.power) : (b.power) - (a.power);
        });

        return sorted.map((item, index) => {
            item.playerIndex = index;
            return item;
        });
    }

    autoAssignPlayers(players) {

        let sortedPlayers = this.sortPlayers(players, false);

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

    removePlayer(playerIndex, existingPlayers) {
        let filtered = existingPlayers.filter(function (value, index) {
            return index !== playerIndex;
        });

        // update all index
        const updatedPlayers = filtered.map((item, index) => {
            item.playerIndex = index;
            return item;
        });
        this.storePlayersInLocalStorage(updatedPlayers);

        return updatedPlayers
    }


    storePlayersInLocalStorage(players) {
        localStorage.setItem(PLAYER_MASTER, JSON.stringify(players));
    }
}

export const playerService = new PlayerService();
