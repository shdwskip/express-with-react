import { AppThunk } from '../common/generic.types';
import { SIMULATED_LOADING_TIME_IN_MS } from '../common/constants';

export const GET_NAVIGATION_NODES_START = 'GET_NAVIGATION_NODES_START';
export const GET_NAVIGATION_NODES_SUCCESS = 'GET_NAVIGATION_NODES_SUCCESS';
export const GET_NAVIGATION_NODES_FAIL = 'GET_NAVIGATION_NODES_FAIL';

export const getNavgiationNodes = (): AppThunk => async (dispatch) => {
  dispatch({ type: GET_NAVIGATION_NODES_START });

  try {
    const result = await fetch('http://localhost:5000/navigation');
    const data = await result.json();

    // simulating response delay
    setTimeout(() => {
      dispatch({ type: GET_NAVIGATION_NODES_SUCCESS, payload: data });
    }, SIMULATED_LOADING_TIME_IN_MS);
  } catch (error) {
    dispatch({ type: GET_NAVIGATION_NODES_FAIL, payload: error });
  }
};
