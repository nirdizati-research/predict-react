import {
  PREDICTION_SUBMITTED,
  PREDICTION_SUCCEEDED,
  PREDICTION_FAILED,
  RUNTIME_SUBMITTED,
  RUNTIME_SUCCEEDED,
  RUNTIME_FAILED,
  submitPrediction,
  predictionSucceeded,
  predictionFailed,
  submitRuntime,
  runtimeSucceeded,
  runtimeFailed
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
      expect(submitRuntime().type).toBe(RUNTIME_SUBMITTED);
    });
  });
  describe('runtimeSucceeded', () => {
    it('has correct payload type', () => {
      expect(runtimeSucceeded().type).toBe(RUNTIME_SUCCEEDED);
    });
  });
  describe('runtimeFailed', () => {
    it('has correct payload type', () => {
      expect(runtimeFailed().type).toBe(RUNTIME_FAILED);
    });
  });
});
