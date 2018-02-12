/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import React from 'react';
import {shallow} from 'enzyme';
import {CardTitle} from 'react-md';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../../reference';
import ResultTableCard from '../../../components/validation/ResultTableCard';
import {Chart} from 'react-google-charts';

const data = [
  [1, 'linear', 321.16984512656944, 470.1483088530332, -0.75205320910182749],
  [2, 'xboost', 218.33484913201886, 218.33484913201886, 0.10676014147290103]
];
let element = null;
describe('ResultTableCard', () => {
  beforeEach(() => {
    element = shallow(<ResultTableCard data={data} predictionMethod={CLASSIFICATION}/>);
  });

  it('renders', () => {
    expect(element).toBeDefined();
    expect(element.find(Chart).length).toBe(1);
  });

  it('does not show table if no data', () => {
    element.setProps({data: []});
    expect(element.find(Chart).length).toBe(0);
  });

  it('renders classification table', () => {
    expect(element.find(CardTitle).props().title).toMatch(CLASSIFICATION);
  });

  it('renders regression table', () => {
    element.setProps({predictionMethod: REGRESSION});
    expect(element.find(CardTitle).props().title).toMatch(REGRESSION);
  });

  it('renders next activity table', () => {
    element.setProps({predictionMethod: NEXT_ACTIVITY});
    expect(element.find(CardTitle).props().title).toMatch(NEXT_ACTIVITY);
  });
});
