import {
    PLAYER_ADD,
    PLAYER_UPDATE,
    PLAYER_DELETE
} from "../constants/actionTypes";

export default (state = {}, action) => {
    switch (action.type) {
        case PLAYER_ADD:
            return {

            };

        case PLAYER_UPDATE:
            return {

            };

        case PLAYER_DELETE:
            return  {

            };

        default:
            return state;
    }
}
