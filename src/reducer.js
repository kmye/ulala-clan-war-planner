import {combineReducers} from 'redux';

import {routerReducer} from 'react-router-redux';

import player from './reducers/player';

export default combineReducers({
    // TODO add reducer here
    player,
    router: routerReducer
});
