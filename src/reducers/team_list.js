import { TEAM_INIT } from '../constants/action_types';

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
