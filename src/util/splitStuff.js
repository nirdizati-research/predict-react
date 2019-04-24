import {SPLIT_SINGLE} from '../reference';

export const getLogProperties = (splitById, logById) => (splitId) => {
    const split = splitById[splitId];
    // no split yet handle
    if (split === undefined) {
        return {maxEventsInLog: 0, traceAttributes: []};
    }
    const logId = split.type === SPLIT_SINGLE ? split.original_log : split.training_log;
    const log = logById[logId];
    // no logs yet handle
    if (log === undefined) {
        return {maxEventsInLog: 0, traceAttributes: []};
    }
    return {maxEventsInLog: log.properties.maxEventsInLog, traceAttributes: log.properties.traceAttributes};
};
