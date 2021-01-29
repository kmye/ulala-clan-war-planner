import { PLAYER_FORM_CLOSE, PLAYER_FORM_OPEN } from '../constants/action_types';

export default (state = {}, action) => {
  switch (action.type) {
    case PLAYER_FORM_OPEN:
      return {
        ...state,
        playerInput: action.payload.playerInput,
        visible: true,
      };

    case PLAYER_FORM_CLOSE:
      return {
        ...state,
        visible: false,
      };

    default:
      return state;
  }
};
