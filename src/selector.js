export const getAllPlayers = (store) => store.player.players;

export const fillUpEmptySpots = (players) => {
  const emptySpots = 4 - players.length;
  for (let i = 0; i < emptySpots; i++) {
    players.push(null);
  }
  return players;
};

export const getPlayersByTeamType = (players, teamType) => players.filter((value) => value.teamType === teamType);

export const getPlayersByTeamIndex = (players, index) => {
  const filtered = players.filter((value) => value.teamIndex === index);
  return fillUpEmptySpots(filtered);
};
