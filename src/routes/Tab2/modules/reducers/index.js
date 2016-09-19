import { combineReducers } from 'redux'
import byId, * as fromById from './byId'
import createList, * as fromList from './createList'

const listByFilter = combineReducers({
  all: createList('all'),
  zapas: createList('zapas'),
  invest: createList('invest'),
});

const items = combineReducers({
  byId,
  listByFilter,
});

export default items;

export const getVisibleItems = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getItem(state.byId, id));
};

export const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.listByFilter[filter]);

export const getErrorMessage = (state, filter) =>
  fromList.getErrorMessage(state.listByFilter[filter]);
