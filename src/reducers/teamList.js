import { TEAM_INIT } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case TEAM_INIT: {
      return {
        ...state,
        displayInRow: true,
      };
    }

    default: {
      return state;
    }
  }
};
