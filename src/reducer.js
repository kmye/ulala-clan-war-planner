import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';

import player from './reducers/player';
import playerInputForm from './reducers/playerInputForm';
import teamList from './reducers/teamList';

export default combineReducers({
  // TODO add reducer here
  player,
  playerInputForm,
  teamList,
  router: routerReducer,
});
