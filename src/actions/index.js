export const createPayloadForwardingAction = (type) => (payload) =>
    ({type: type, payload: payload});

