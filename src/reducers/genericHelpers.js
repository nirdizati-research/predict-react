// replace current state with new list
export const listRetrieved = (objectList) => {
  const allIds = objectList.map(({id}) => id);
  const byId = Object.assign(...objectList.map((obj) => ({[obj.id]: obj})));
  return {allIds, byId};
};

// partial update of objects
export const addListToStore = ({allIds, byId}, objectList) => {
  const newObjs = listRetrieved(objectList);
  // allIds = allIds.concat(objectList.map(({id}) => id));
  // byId = objectList.map((obj))
  return {allIds: allIds.concat(newObjs.allIds), byId: {...byId, ...newObjs.byId}};
};
