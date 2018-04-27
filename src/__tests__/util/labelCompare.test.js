import {
  ATTRIBUTE_NUMBER,
  ATTRIBUTE_STRING,
  CLASSIFICATION,
  DURATION,
  NEXT_ACTIVITY,
  REGRESSION,
  REMAINING_TIME,
  THRESHOLD_CUSTOM,
  THRESHOLD_MEAN
} from '../../reference';
import {labelCompare} from '../../util/labelCompare';

const remainingTime = {type: REMAINING_TIME};
const atrNum = {type: ATTRIBUTE_NUMBER, attribute_name: 'name'};


const regCompare = labelCompare(REGRESSION);
const classCompare = labelCompare(CLASSIFICATION); // can also be labelling

it('false if wrong type', () => {
  const result = regCompare(remainingTime, atrNum);
  expect(result).toEqual(false);
});

describe('Regression', () => {
  it('remaining time', () => {
    const result = regCompare(remainingTime, remainingTime);
    expect(result).toEqual(true);
  });

  it('true if same numerical attribute', () => {
    const result = regCompare(atrNum, atrNum);
    expect(result).toEqual(true);
  });
  it('false if different numerical attribute', () => {
    const result = regCompare(atrNum, {type: ATTRIBUTE_NUMBER, attribute_name: 'name1'});
    expect(result).toEqual(false);
  });
});

describe('Classification', () => {
  describe('Duration', () => {
    const durMean = {type: DURATION, threshold_type: THRESHOLD_MEAN};
    const durCustom = {type: DURATION, threshold_type: THRESHOLD_CUSTOM, threshold: 100};
    it('true if both threshold mean', () => {
      expect(classCompare(durMean, durMean)).toEqual(true);
    });
    it('true if threshold custom with same threshold', () => {
      expect(classCompare(durCustom, durCustom)).toEqual(true);
    });

    it('false if different thresholds types or numbers', () => {
      expect(classCompare(durMean, durCustom)).toEqual(false);
      const result = classCompare(durCustom, {type: DURATION, threshold_type: THRESHOLD_CUSTOM, threshold: 2});
      expect(result).toEqual(false);
    });
  });

  describe('Numerical attribute', () => {
    const atrNumMean = {type: ATTRIBUTE_NUMBER, threshold_type: THRESHOLD_MEAN, attribute_name: 'name'};
    const atrNumCustom = {
      type: ATTRIBUTE_NUMBER,
      threshold_type: THRESHOLD_CUSTOM,
      attribute_name: 'name',
      threshold: 10
    };
    it('false if different attributes', () => {
      expect(classCompare(atrNumMean, {type: ATTRIBUTE_NUMBER, attribute_name: 'name1'})).toEqual(false);
    });
    it('true if both threshold mean', () => {
      expect(classCompare(atrNumMean, atrNumMean)).toEqual(true);
    });
    it('true if threshold custom with same threshold', () => {
      expect(classCompare(atrNumCustom, atrNumCustom)).toEqual(true);
    });

    it('false if different thresholds types or numbers', () => {
      expect(classCompare(atrNumMean, atrNumCustom)).toEqual(false);
      const result = classCompare(atrNumCustom, {
        type: ATTRIBUTE_NUMBER,
        attribute_name: 'name1',
        threshold_type: THRESHOLD_CUSTOM,
        threshold: 2
      });
      expect(result).toEqual(false);
    });
  });

  describe('Next activity', () => {
    const ne = {type: NEXT_ACTIVITY};
    it('true if both next activity', () => {
      expect(classCompare(ne, ne)).toEqual(true);
    });
  });

  describe('String attribute', () => {
    const atrStr = {type: ATTRIBUTE_STRING, attribute_name: 'name'};
    it('true if both same attribute', () => {
      expect(classCompare(atrStr, atrStr)).toEqual(true);
    });
    it('false if different attribute', () => {
      expect(classCompare(atrStr, {type: ATTRIBUTE_STRING, attribute_name: 'name1'})).toEqual(false);
    });
  });
});
