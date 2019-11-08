// replace current state with new list
export const listRetrieved = (objectList) => {
    if (objectList.length === 0) {
        return {allIds: [], byId: {}};
    }
    const allIds = objectList.map(({id}) => id);
    const byId = Object.assign(...objectList.map((obj) => ({[obj.id]: obj})));
    return {allIds, byId};
};

export const logListRetrieved = (objectList) => {
    if (objectList.length === 0) {
        return {allIds: [], byId: {}};
    }
    const allIds = objectList.map(({id}) => id);
    const byId = Object.assign(...objectList.map((obj) => (
        {
            [obj.id]: {
                'id': obj.id,
                'name': obj.name,
                'properties': obj.properties
            }
        })));
    return {allIds, byId};
};

// partial update of objects
export const addListToStore = ({allIds, byId}, objectList) => {
    const newObjs = listRetrieved(objectList);
    return {allIds: [...new Set([...allIds, ...newObjs.allIds])], byId: {...byId, ...newObjs.byId}};
};


export const removeFromStore = ({allIds, byId}, objectId) => {
    allIds = allIds.filter(element => element !== objectId);
    delete byId[objectId];
    return {allIds, byId};
};
