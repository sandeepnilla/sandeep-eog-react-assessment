import * as actions from "../actions";

const initialState = {
  loading: false,
  data: []
};

const startLoading = (state, action) => {
  return { ...state, loading: true };
};

const droneDataRecevied = (state, action) => {
  console.log(state);
  return {
    ...state,
    loading: false,
    data: action.data
  };
};

const handlers = {
  [actions.FETCH_DRONE_DATA]: startLoading,
  [actions.FETCH_DRONE_DATA_RECEIVED]: droneDataRecevied
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
