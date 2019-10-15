export const getAllPlayers = store => store.player.players;

export const fillUpEmptySpots = (players) => {
    let emptySpots = 4 - players.length;
    for (let i = 0; i < emptySpots; i++) {
        players.push(null)
    }
    return players;
};

export const getPlayersByTeamType = (players, teamType) => {
    return players.filter((value) => {
        return value.teamType === teamType;
    })
}

export const getPlayersByTeamIndex = (players, index) => {
    let filtered = players.filter((value) => {
        return value.teamIndex === index;
    });
    return fillUpEmptySpots(filtered)
};
