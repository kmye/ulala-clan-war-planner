import {combineReducers} from 'redux';

import {routerReducer} from 'react-router-redux';

import player from './reducers/player';
import playerInputForm from './reducers/playerInputForm';

export default combineReducers({
    // TODO add reducer here
    player,
    playerInputForm,
    router: routerReducer
});
