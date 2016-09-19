const byId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.items,
    };
  }
  return state;
};

export default byId;

export const getItem = (state, id) => state[id];
