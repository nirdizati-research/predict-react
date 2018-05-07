import {advancedConfigChange} from '../../util/advancedFormInput';

const state = {
  someOtherField: true,
  otherObj: {},
  complex: {}
};

it('adds string key to state', () => {
  const config = {methodConfig: 'complex', key: 'key'};
  expect(advancedConfigChange(state, config, 'name')).toMatchObject({complex: {key: 'name'}});
});

it('adds int key to state', () => {
  const config = {methodConfig: 'complex', key: 'key', isNumber: true};
  expect(advancedConfigChange(state, config, '3')).toMatchObject({complex: {key: 3}});
});

it('adds float key to state', () => {
  const config = {methodConfig: 'complex', key: 'key', isFloat: true};
  expect(advancedConfigChange(state, config, '3.00005')).toMatchObject({complex: {key: 3.00005}});
});

describe('maybeNumber', () => {
  it('adds as float if number', () => {
    const config = {methodConfig: 'complex', key: 'key', maybeNumber: true};
    expect(advancedConfigChange(state, config, '3.00005')).toMatchObject({complex: {key: 3.00005}});
  });

  it('adds as string if string', () => {
    const config = {methodConfig: 'complex', key: 'key', maybeNumber: true};
    expect(advancedConfigChange(state, config, 'alfa')).toMatchObject({complex: {key: 'alfa'}});
  });
});

it('does not change other state', () => {
  const config = {methodConfig: 'complex', key: 'key'};
  expect(advancedConfigChange(state, config, 'name')).toMatchObject({otherObj: {}, someOtherField: true});
});


it('rewrites existing values', () => {
  const config = {methodConfig: 'complex', key: 'key'};
  const newState = advancedConfigChange(state, config, 'name');
  expect(advancedConfigChange(newState, config, 'name2')).toMatchObject({complex: {key: 'name2'}});
});
