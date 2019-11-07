/**
 * Created by Williams.Rizzi on 9/9/19.
 */
import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import FetchState from './../FetchState';
import {fetchStatePropType, jobPropType, selectLabelProptype} from '../../propTypes';
import BarChartCard from '../chart/BarChartCard';
import {getChartHeader} from '../validation/ColumnHelper';
import {CLASSIFICATION} from '../../reference';
import BubbleChartCard from '../chart/BubbleChartCard';

const PostHocExplanation = (props) => {
    const events = {
        'W_Assessing_application': 4098,
        'W_Calling _missing_information': 1647,
        'W_Calling_after_offers': 4098,
        'W_Check_for_fraud': 130,
        'W_Filling_in application': 6117,
        'W_Fixing_incoming_lead': 3588
    };
    const traces = [[1, 2, 3, 4, 5]];

    return <Card className="md-block-centered">
        <CardTitle title="Post Hoc"/>
        <CardText>
            <div className="md-cell md-cell--6" key="1">
                <BarChartCard data={events} cardTitle="LIME"
                              chartTitle='LIME chart description'
                              hTitle='LIME chart scale'/>
            </div>
            <div className="md-cell md-cell--6" key="2">
                <BubbleChartCard cardTitle={'asdf'} columns={getChartHeader(CLASSIFICATION)}
                                 vTitle='v' hTitle='h' data={traces}/>
            </div>
            <div className="md-cell md-cell--6" key="3">
                <BubbleChartCard cardTitle={'asdf'} columns={getChartHeader(CLASSIFICATION)}
                                 vTitle='v' hTitle='h' data={traces}/>
            </div>
            <div className="md-cell md-cell--6" key="4">
                <BarChartCard data={events} cardTitle="LIME"
                              chartTitle='LIME chart description'
                              hTitle='LIME chart scale'/>
            </div>
            <FetchState fetchState={props.fetchState}/>
        </CardText>
    </Card>;
};


PostHocExplanation.propTypes = {
    jobs: PropTypes.arrayOf(jobPropType).isRequired,
    splitLabels: selectLabelProptype,
    fetchState: fetchStatePropType,
    methodChange: PropTypes.func.isRequired,
    splitChange: PropTypes.func.isRequired,
    prefixLengths: PropTypes.arrayOf(PropTypes.string).isRequired,
    prefixChange: PropTypes.func.isRequired,
    selectedPrefixes: PropTypes.arrayOf(PropTypes.number).isRequired,
    selectedSplitId: PropTypes.number.isRequired,
    filterOptionChange: PropTypes.func.isRequired,
    labelChange: PropTypes.func.isRequired,
    filterOptions: PropTypes.shape({
        encodings: PropTypes.arrayOf(PropTypes.string).isRequired,
        clusterings: PropTypes.arrayOf(PropTypes.string).isRequired,
        classification: PropTypes.arrayOf(PropTypes.string).isRequired,
        regression: PropTypes.arrayOf(PropTypes.string).isRequired,
        timeSeriesPrediction: PropTypes.arrayOf(PropTypes.string).isRequired,
        labelling: PropTypes.any.isRequired,
        attributeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
        thresholds: PropTypes.arrayOf(PropTypes.number).isRequired,
        padding: PropTypes.string.isRequired
    }).isRequired,
    predictionMethod: PropTypes.string.isRequired
};
export default PostHocExplanation;
