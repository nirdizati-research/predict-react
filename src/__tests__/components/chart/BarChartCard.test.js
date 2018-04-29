import React from 'react';
import {shallow} from 'enzyme';
import {Chart} from 'react-google-charts';
import BarChartCard from '../../../components/chart/BarChartCard';

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
    const element = shallow(<BarChartCard data={events} cardTitle="title"
                                          chartTitle='chart title' hTitle='hTitle'/>);
    expect(element).toBeDefined();
    expect(element.find(Chart).length).toBe(1);
  });

  it('maps and sorts data', () => {
    const element = shallow(<BarChartCard data={events} cardTitle="title"
                                          chartTitle='chart title' hTitle='hTitle'/>);
    const chartProps = element.find(Chart).props();

    expect(chartProps.rows.length).toBe(6);
    expect(chartProps.rows[0]).toEqual(['W_Filling_in application', 6117, '6117', '#990099']);
    expect(chartProps.rows[5]).toEqual(['W_Check_for_fraud', 130, '130', '#109618']);
  });
});
