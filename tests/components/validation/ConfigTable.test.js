/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import React from 'react';
import {mount, shallow} from 'enzyme';
import ClassConfigTable from '../../../src/components/validation/ClassConfigTable';
import {TableRow} from 'react-md/lib/DataTables/index';
import {TableColumn} from 'react-md';
import RegConfigTable from '../../../src/components/validation/RegConfigTable';
import ConfigTableCard from '../../../src/components/validation/ConfigTableCard';
import {CLASSIFICATION, NEXT_ACTIVITY, REGRESSION} from '../../../src/reference';


const regJobs = [{
  uuid: '12345678',
  status: 'aa',
  run: 'aa',
  log: 'aa',
  timestamp: 'aa',
  prefix: 0,
  type: 'aa'
}];

const classJobs = [{
  uuid: '12345678',
  status: 'aa',
  run: 'aa',
  log: 'aa',
  timestamp: 'aa',
  prefix: 0,
  rule: 'aa',
  threshold: 0,
  type: 'aa'
}];

describe('ConfigTableCard', () => {
  const element = shallow(<ConfigTableCard jobs={[]} predictionMethod={CLASSIFICATION}/>);
  it('renders', () => {
    expect(element).toBeDefined();
  });

  it('renders classification table', () => {
    element.setProps({predictionMethod: CLASSIFICATION});
    expect(element.find(ClassConfigTable).length).toBe(1);
  });

  it('renders next activity table', () => {
    element.setProps({predictionMethod: NEXT_ACTIVITY});
    expect(element.find(RegConfigTable).length).toBe(1);
  });

  it('renders regression table', () => {
    element.setProps({predictionMethod: REGRESSION});
    expect(element.find(RegConfigTable).length).toBe(1);
  });
});

describe('ClassConfigTable', () => {
  it('renders nothing without jobs', () => {
    const element = shallow(<ClassConfigTable jobs={[]}/>);
    expect(element).toBeDefined();
    // Header row
    expect(element.find(TableRow).length).toBe(1);
    expect(element.find(TableColumn).length).toBe(9);
  });

  it('renders jobs if present', () => {
    const element = mount(<ClassConfigTable jobs={classJobs}/>);
    expect(element.find(TableRow).length).toBe(2);
    // uuid
    expect(element.text()).toMatch(/1234567/);
    expect(element.text()).not.toMatch(/12345678/);
  });
});

describe('RegConfigTable', () => {
  it('renders nothing without jobs', () => {
    const element = shallow(<RegConfigTable jobs={[]}/>);
    expect(element).toBeDefined();
    // Header row
    expect(element.find(TableRow).length).toBe(1);
    expect(element.find(TableColumn).length).toBe(7);
  });

  it('renders jobs if present', () => {
    const element = mount(<RegConfigTable jobs={regJobs}/>);
    expect(element.find(TableRow).length).toBe(2);
    // uuid
    expect(element.text()).toMatch(/1234567/);
    expect(element.text()).not.toMatch(/12345678/);
  });
});
