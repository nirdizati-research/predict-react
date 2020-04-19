import React from 'react';
import {shallow} from 'enzyme';
import Incremental from '../../../components/advanced/Incremental';
import {jobs} from '../../../../stories/JobStatusTable';


describe('IncrementalTable Result Table', () => {
    it('renders', () => {
        const element = shallow(<Incremental
                                    jobs={jobs}
                                    classification={['classification1', 'classification2']}
                                    regression={['regression1', 'regression2']}
                                    timeSeriesPrediction={['timeSeriesPrediction1', 'timeSeriesPrediction2']}
                                    onClickCheckbox={new function () {}}/>);
        expect(element).toBeDefined();
    });
});
