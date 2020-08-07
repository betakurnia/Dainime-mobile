import { GET_PAGE_COUNT } from "../actions/types";

const initialState = {
  pageCount: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PAGE_COUNT:
      return {
        ...state,
        pageCount: action.payload
      };
    default:
      return state;
  }
}
