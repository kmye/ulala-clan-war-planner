import {
  PLAYER_ADD, PLAYER_AUTO_ASSIGN, PLAYER_CLEAR,
  PLAYER_DELETE,
  PLAYER_FORM_CLOSE,
  PLAYER_FORM_OPEN,
  PLAYER_INIT,
  PLAYER_SORT_BY_POWER,
  PLAYER_UNASSIGN,
  PLAYER_UPDATE,
} from '../constants/action_types';

export const initPlayers = () => ({
  type: PLAYER_INIT,
});

export const clearPlayers = () => ({
  type: PLAYER_CLEAR,
});

export const addPlayer = (player) => ({
  type: PLAYER_ADD,
  payload: {
    player,
  },
});

export const updatePlayer = (player) => ({
  type: PLAYER_UPDATE,
  payload: {
    player,
  },
});

export const deletePlayer = (playerIndex) => ({
  type: PLAYER_DELETE,
  payload: {
    playerIndex,
  },
});

export const sortPlayersByPower = (sortType) => ({
  type: PLAYER_SORT_BY_POWER,
  payload: {
    sortType,
  },
});

export const autoAssignPlayers = () => ({
  type: PLAYER_AUTO_ASSIGN,
});

export const unassignPlayer = (player) => ({
  type: PLAYER_UNASSIGN,
  payload: {
    player,
  },
});

export const openForm = (player) => ({
  type: PLAYER_FORM_OPEN,
  payload: {
    playerInput: player,
  },
});

export const closeForm = () => ({
  type: PLAYER_FORM_CLOSE,
});
