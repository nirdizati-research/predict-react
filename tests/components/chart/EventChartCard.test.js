import React from 'react';
import {shallow} from 'enzyme';
import {Chart} from 'react-google-charts';
import FetchState from '../../../src/components/FetchState';
import EventChartCard from '../../../src/components/chart/EventChartCard';

const fetchState = {
  inFlight: false
};
const events = {
  'W_Assessing_application': 4098,
  'W_Calling _missing_information': 1647,
  'W_Calling_after_offers': 4098,
  'W_Check_for_fraud': 130,
  'W_Filling_in application': 6117,
  'W_Fixing_incoming_lead': 3588
};

describe('EventChartCard', () => {
  it('renders', () => {
    const element = shallow(<EventChartCard fetchState={fetchState}
                                            data={events}/>);
    expect(element).toBeDefined();
    expect(element.find(FetchState).length).toBe(1);
    expect(element.find(Chart).length).toBe(1);
  });

  it('maps and sorts data', () => {
    const element = shallow(<EventChartCard fetchState={fetchState}
                                            data={events}/>);
    const chartProps = element.find(Chart).props();

    expect(chartProps.rows.length).toBe(6);
    expect(chartProps.rows[0]).toEqual(['W_Filling_in application', 6117]);
    expect(chartProps.rows[5]).toEqual(['W_Check_for_fraud', 130]);
  });
});
