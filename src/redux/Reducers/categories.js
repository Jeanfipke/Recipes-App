import { SELECTED_CATEGORY } from '../Actions/typeActions';

const INITIAL_STATE = {
  category: '',
};

const categories = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SELECTED_CATEGORY:
    return {
      ...state,
      category: action.payload,
    };
  default:
    return state;
  }
};

export default categories;
