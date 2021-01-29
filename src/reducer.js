import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';

import player from './reducers/player';
import playerInputForm from './reducers/player_import_form';
import teamList from './reducers/team_list';

export default combineReducers({
  // TODO add reducer here
  player,
  playerInputForm,
  teamList,
  router: routerReducer,
});
