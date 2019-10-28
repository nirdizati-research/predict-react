import {
  PREDICTION_SUBMITTED,
  PREDICTION_SUCCEEDED,
  PREDICTION_FAILED,
  REPLAY_SUBMITTED,
  REPLAY_SUCCEEDED,
  REPLAY_FAILED,
  submitPrediction,
  predictionSucceeded,
  predictionFailed,
  submitReplay,
  replaySucceeded,
  replayFailed
} from '../../actions/RuntimeActions';

describe('RuntimeActions', () => {
  describe('submitPrediction', () => {
    it('has correct payload type', () => {
      expect(submitPrediction().type).toBe(PREDICTION_SUBMITTED);
    });
  });
  describe('predictionSucceeded', () => {
    it('has correct payload type', () => {
      expect(predictionSucceeded().type).toBe(PREDICTION_SUCCEEDED);
    });
  });
  describe('predictionFailed', () => {
    it('has correct payload type', () => {
      expect(predictionFailed().type).toBe(PREDICTION_FAILED);
    });
  });
  describe('submitRuntime', () => {
    it('has correct payload type', () => {
      expect(submitReplay().type).toBe(REPLAY_SUBMITTED);
    });
  });
  describe('runtimeSucceeded', () => {
    it('has correct payload type', () => {
      expect(replaySucceeded().type).toBe(REPLAY_SUCCEEDED);
    });
  });
  describe('runtimeFailed', () => {
    it('has correct payload type', () => {
      expect(replayFailed().type).toBe(REPLAY_FAILED);
    });
  });
});
