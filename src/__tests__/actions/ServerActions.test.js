import {
    deleteJob,
    getJobs,
    getLogInfo,
    getLogList,
    getSplits,
    postSplit,
    postTraining,
    getShapValues,
    getIceValues,
    getSkaterValues,
    getLimeTemporalStabilityValues,
    getPredictionTemporalStabilityValues,
    getDecodingDf,
    getEncodedUniqueValues,
    getRetrainValues,
    getCmFeedbackValues,
    getModels,
    postPrediction,
    postReplay,
    getTraceList
} from '../../actions/ServerActions';
import {JOB_DELETED, jobsFailed, jobsRetrieved, trainingFailed,
     trainingSucceeded, decodingtRetrieved, decodingFailed,
      encodedUniqueValuesRetrieved, encodedUniqueValuesFailed} from '../../actions/JobActions';
import {logInfoFailed, logInfoRetrieved, logListFailed, logListsRetrieved} from '../../actions/LogActions';
import {splitFailed, splitsFailed, splitsRetrieved, splitSucceeded} from '../../actions/SplitActions';
import {shapValueListRetrieved,
     shapValueListFailed, iceValueListRetrieved, iceValueListFailed,
      skaterValueListRetrieved, skaterValueListFailed, retrainValueListRetrieved,
       retrainValueListFailed, cmfeedbackValueListRetrieved,
        cmfeedbackValueListFailed} from '../../actions/ExplanationActions';
import {limeTemporalStabilityResult, encodedUniqueDFResultList, temporalStabilityResult,
    shapResult, iceResultList, skaterResult,
    retrainResult, cmFeedbackResult, decodedDFResultList, traceList} from '../../../stories/Explanation';
import {temporalLimePredictionListRetrieved, temporalPredictionListRetrieved,
     temporalPredictionListFailed, temporalLimePredictionListFailed} from '../../actions/PredictionAction';
import {modelsRetrieved, modelsFailed} from '../../actions/ModelActions';
import {predictionSucceeded, predictionFailed, replaySucceeded, replayFailed} from '../../actions/RuntimeActions';
import {traceListRetrieved, traceListFailed} from '../../actions/TraceActions';

// https://www.jstwister.com/post/unit-testing-beginners-guide-mock-http-and-files/

const error = {error: 'big error message'};
const standardError = (mockXHR) => {
    mockXHR.status = 500;
    mockXHR.responseText = JSON.stringify(error);
};

const logs = [{log: 'name'}];
const job = {id: 1};

const splits = [{type: 'single', config: 'like me'}];
const createMockXHR = (responseJSON, status) => {
    const mockXHR = {
        open: jest.fn(),
        send: jest.fn(),
        setRequestHeader: jest.fn(),
        readyState: 4,
        status: status || 200,
        responseText: JSON.stringify(
            responseJSON || {}
        )
    };
    return mockXHR;
};
const splitBody = {
    config: {},
    original_log: 4
};

describe('ServerActions', function () {
    const dispatch = jest.fn();
    const oldXMLHttpRequest = global.XMLHttpRequest;
    let mockXHR = null;

    beforeEach(() => {
        mockXHR = createMockXHR();
        global.XMLHttpRequest = jest.fn(() => mockXHR);
    });

    afterEach(() => {
        global.XMLHttpRequest = oldXMLHttpRequest;
        dispatch.mockClear();
    });

    it('handles unknown error', () => {
        mockXHR.status = 500;
        mockXHR.responseText = 'Clearly not JSON';

        getJobs()(dispatch);
        mockXHR.onreadystatechange();

        expect(dispatch.mock.calls[0][0]).toEqual(jobsFailed('Unknown error'));
    });

    describe('getJobs', () => {
        it('dispatches jobsRetrieved on success', () => {
            mockXHR.responseText = JSON.stringify(logs);

            getJobs()(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0]).toEqual(jobsRetrieved(logs));
        });

        it('dispatches jobsFailed on error', () => {
            standardError(mockXHR);

            getJobs()(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0]).toEqual(jobsFailed(error.error));
        });
    });

    describe('getLogInfo', () => {
        it('dispatches logInfoRetrieved on success', () => {
            mockXHR.responseText = JSON.stringify(logs);

            getLogInfo({logId: 1, infoType: 'events'})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0]).toEqual(logInfoRetrieved({logId: 1, infoType: 'events', data: logs}));
        });

        it('dispatches logInfoFailed on error', () => {
            standardError(mockXHR);

            getLogInfo({logId: 1, infoType: 'events'})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0]).toEqual(logInfoFailed({logId: 1, error: error.error}));
        });
    });

    describe('delete job', () => {
        it('dispatches jobDeleted on success', () => {
            mockXHR.responseText = JSON.stringify(logs);

            deleteJob({id: 1})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0]).toEqual({type: JOB_DELETED, id: 1});
        });
    });

    describe('postTraining', () => {
        it('dispatches trainingSucceeded on success', () => {
            mockXHR.responseText = JSON.stringify(logs);

            postTraining({})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0]).toEqual(trainingSucceeded(logs));
        });

        it('dispatches trainingFailed on error', () => {
            standardError(mockXHR);

            postTraining({})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0]).toEqual(trainingFailed(error.error));
        });
    });

    describe('postPrediction ', () => {
        it('dispatches predictionSumitted on success', () => {
            mockXHR.responseText = JSON.stringify(job);

            postPrediction({})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0]).toEqual(predictionSucceeded(job));
        });

        it('dispatches predictionSumitted on error', () => {
            standardError(mockXHR);

            postPrediction({})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0]).toEqual(predictionFailed(error.error));
        });
    });

    describe('postReplay', () => {
        it('dispatches Replay on success', () => {
            mockXHR.responseText = JSON.stringify(job);

            postReplay({})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0]).toEqual(replaySucceeded(job));
        });

        it('dispatches predictionSumitted on error', () => {
            standardError(mockXHR);

            postReplay({})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0]).toEqual(replayFailed(error.error));
        });
    });

    describe('getLogList', () => {
        describe('on success', () => {
            const logList = [
                {
                    'id': 1,
                    'name': 'general_example.xes'
                },
                {
                    'id': 4,
                    'name': 'nonlocal.mxml.gz'
                }
            ];

            beforeEach(() => {
                mockXHR.responseText = JSON.stringify(logList);
            });

            it('dispatches logListsRetrieved', () => {
                getLogList()(dispatch);
                mockXHR.onreadystatechange();
                expect(dispatch.mock.calls[0][0]).toEqual(logListsRetrieved(logList));
            });
        });

        it('dispatches trainingFailed on error', () => {
            standardError(mockXHR);

            getLogList()(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0]).toEqual(logListFailed(error.error));
        });
    });

    describe('getSplits', () => {
        it('dispatches splitsRetrieved on success', () => {
            mockXHR.responseText = JSON.stringify(splits);

            getSplits()(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0]).toEqual(splitsRetrieved(splits));
        });

        it('dispatches splitsFailed on error', () => {
            standardError(mockXHR);

            getSplits()(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0]).toEqual(splitsFailed(error.error));
        });
    });

    describe('postSplit', () => {
        it('dispatches splitSucceeded on success', () => {
            mockXHR.responseText = JSON.stringify({any: 'response'});

            postSplit(splitBody)(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0]).toEqual(splitSucceeded({any: 'response'}));
        });

        it('dispatches splitFailed on error', () => {
            standardError(mockXHR);

            postSplit(splitBody)(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0]).toEqual(splitFailed(error.error));
        });
    });

    describe('getModels', () => {
        it('dispatches Models on success', () => {
            mockXHR.responseText = JSON.stringify([]);

            getModels({})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
            .toEqual(modelsRetrieved([]));
        });
        it('dispatches Models on error', () => {
            standardError(mockXHR);

            getModels({})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
                .toEqual(modelsFailed(error.error));
        });
    });

    describe('getTraceList', () => {
        it('dispatches traceList on success', () => {
            mockXHR.responseText = JSON.stringify(traceList);

            getTraceList({jobId: 1})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
            .toEqual(traceListRetrieved(traceList));
        });
        it('dispatches traceList on error', () => {
            standardError(mockXHR);

            getTraceList({jobId: 1})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
                .toEqual(traceListFailed(error.error));
        });
    });

    describe('getShap', () => {
        it('dispatches shapRetrieved on success', () => {
            mockXHR.responseText = JSON.stringify(shapResult);

            getShapValues({jobId: 1, traceId: 1})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
            .toEqual(shapValueListRetrieved(shapResult));
        });
        it('dispatches shapRetreived on error', () => {
            standardError(mockXHR);

            getShapValues({jobId: 1, traceId: 1})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
                .toEqual(shapValueListFailed(error.error));
        });
    });

    describe('getIce', () => {
        it('dispatches iceRetrieved on success', () => {
            mockXHR.responseText = JSON.stringify(iceResultList);

            getIceValues({jobId: 1, attribute: 'Age'})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
            .toEqual(iceValueListRetrieved(iceResultList));
        });
        it('dispatches iceRetreived on error', () => {
            standardError(mockXHR);

            getIceValues({jobId: 1, attribute: 'Age'})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
                .toEqual(iceValueListFailed(error.error));
        });
    });

    describe('getSkater', () => {
        it('dispatches skaterRetrieved on success', () => {
            mockXHR.responseText = JSON.stringify(skaterResult);

            getSkaterValues({jobId: 1})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
            .toEqual(skaterValueListRetrieved(skaterResult));
        });
        it('dispatches skaterRetrieved on error', () => {
            standardError(mockXHR);

            getSkaterValues({jobId: 1})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
                .toEqual(skaterValueListFailed(error.error));
        });
    });

    describe('getLimeTemporalStabilityValues', () => {
        it('dispatches LimeTemporalStabilityValues on success', () => {
            mockXHR.responseText = JSON.stringify(limeTemporalStabilityResult);

            getLimeTemporalStabilityValues({jobId: 1, traceId: 1})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
            .toEqual(temporalLimePredictionListRetrieved(limeTemporalStabilityResult));
        });
        it('dispatches LimeTemporalStabilityValues on error', () => {
            standardError(mockXHR);

            getLimeTemporalStabilityValues({jobId: 1, traceId: 1})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
                .toEqual(temporalLimePredictionListFailed(error.error));
        });
    });

    describe('getPredictionTemporalStabilityValues', () => {
        it('dispatches LimeTemporalStabilityValues on success', () => {
            mockXHR.responseText = JSON.stringify(temporalStabilityResult);

            getPredictionTemporalStabilityValues({jobId: 1, traceId: 1})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
            .toEqual(temporalPredictionListRetrieved(temporalStabilityResult));
        });
        it('dispatches getPredictionTemporalStabilityValues on error', () => {
            standardError(mockXHR);

            getPredictionTemporalStabilityValues({jobId: 1, traceId: 1})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
                .toEqual(temporalPredictionListFailed(error.error));
        });
    });

    describe('getDecodedDf', () => {
        it('dispatches decodedDf on success', () => {
            mockXHR.responseText = JSON.stringify(decodedDFResultList);

            getDecodingDf({jobId: 1})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
            .toEqual(decodingtRetrieved(decodedDFResultList));
        });
        it('dispatches decodedDf on error', () => {
            standardError(mockXHR);

            getDecodingDf({jobId: 1})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
                .toEqual(decodingFailed(error.error));
        });
    });

    describe('getEncodedUniqueValues', () => {
        it('dispatches EncodedUniqueValues on success', () => {
            mockXHR.responseText = JSON.stringify(encodedUniqueDFResultList);

            getEncodedUniqueValues({jobId: 1})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
            .toEqual(encodedUniqueValuesRetrieved(encodedUniqueDFResultList));
        });
        it('dispatches EncodedUniqueValues on error', () => {
            standardError(mockXHR);

            getEncodedUniqueValues({jobId: 1})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
                .toEqual(encodedUniqueValuesFailed(error.error));
        });
    });

    describe('getRetrainValues', () => {
        it('dispatches RetrainValues on success', () => {
            mockXHR.responseText = JSON.stringify(retrainResult);

            getRetrainValues({jobId: 1, data: []})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
            .toEqual(retrainValueListRetrieved(retrainResult));
        });
        it('dispatches RetrainValues on error', () => {
            standardError(mockXHR);

            getRetrainValues({jobId: 1, traceId: 1})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
                .toEqual(retrainValueListFailed(error.error));
        });
    });

    describe('getCmFeedbackValues', () => {
        it('dispatches CmFeedbackValues on success', () => {
            mockXHR.responseText = JSON.stringify(cmFeedbackResult);

            getCmFeedbackValues({jobId: 1, attribute: 'Age'})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
            .toEqual(cmfeedbackValueListRetrieved(cmFeedbackResult));
        });
        it('dispatches CmFeedbackValues on error', () => {
            standardError(mockXHR);

            getCmFeedbackValues({jobId: 1, traceId: 1})(dispatch);
            mockXHR.onreadystatechange();

            expect(dispatch.mock.calls[0][0])
                .toEqual(cmfeedbackValueListFailed(error.error));
        });
    });
});
