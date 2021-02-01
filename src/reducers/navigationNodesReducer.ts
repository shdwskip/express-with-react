import {
  GET_NAVIGATION_NODES_FAIL,
  GET_NAVIGATION_NODES_SUCCESS,
} from '../actions';
import { RenderTree } from '../common/generic.types';

interface INavigationAction {
  type: typeof GET_NAVIGATION_NODES_SUCCESS | typeof GET_NAVIGATION_NODES_FAIL;
  payload: RenderTree[];
}

interface INavigationState {
  data: RenderTree[] | [];
}

const initialState: INavigationState = {
  data: [],
};

export default (
  state = initialState,
  action: INavigationAction
): INavigationState => {
  switch (action.type) {
    case GET_NAVIGATION_NODES_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case GET_NAVIGATION_NODES_FAIL:
      return {
        ...state,
        data: [],
      };
    default:
      return state;
  }
};
