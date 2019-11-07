import React from 'react';
import {shallow} from 'enzyme';
import {TableRow} from 'react-md/lib/DataTables/index';
import DoubleSplitTableCard from '../../../components/split/DoubleSplitTableCard';
import {splits} from '../../../../stories/Split';
import SingleSplitTableCard from '../../../components/split/SingleSplitTableCard';
import {SPLIT_DOUBLE, SPLIT_SINGLE} from '../../../reference';

it('renders nothing without splits', () => {
    const element = shallow(<DoubleSplitTableCard splits={[]}/>);
    expect(element).toBeDefined();
    // Header row
    expect(element.find(TableRow).length).toBe(1);
});

it('renders nothing without splits', () => {
    const element = shallow(<SingleSplitTableCard splits={[]}/>);
    expect(element).toBeDefined();
    // Header row
    expect(element.find(TableRow).length).toBe(1);
});

it('renders single splits if present', () => {
    const element = shallow(<SingleSplitTableCard splits={splits.filter((split) => split.type === SPLIT_SINGLE)}/>);
    expect(element.find(TableRow).length).toBe(2);
});

it('renders double splits if present', () => {
    const element = shallow(<DoubleSplitTableCard splits={splits.filter((split) => split.type === SPLIT_DOUBLE)}/>);
    expect(element.find(TableRow).length).toBe(2);
});
