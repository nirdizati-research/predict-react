/**
 * Created by tonis.kasekamp on 10/17/17.
 */
import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import PropTypes from 'prop-types';
import FetchState from './../FetchState';
import {SelectionControlGroup} from 'react-md/lib/SelectionControls/index';
import {
  CLASSIFICATION,
  classificationMethods,
  clustering,
  encoding,
  padding,
  predictionMethods,
  REGRESSION,
  regressionMethods
} from '../../reference';
import {fetchStatePropType, splitLabelPropType} from '../../propTypes';
import LabelControls from '../Labelling/LabelControls';

const ValidationHeaderCard = (props) => {
  const prefixControls = props.prefixLengths.map((prefix) => ({label: prefix, value: prefix}));

  const defaultValue = ',' + props.selectedPrefixes.join(',');

  const checkBoxChange = (value, event) => {
    props.prefixChange(event.target.value);
  };

  const checkies = props.prefixLengths.length > 0 ?
    <SelectionControlGroup type="checkbox" label="Prefix lengths" name="prefixLengths" id="prefixLengths"
                           onChange={checkBoxChange} controls={prefixControls} inline value={defaultValue}/> : null;
  const selectChange = (value, _) => {
    props.splitChange(value);
  };
  const localMethodChange = (value, _) => {
    props.methodChange(value);
  };

  const methods = () => {
    if (props.predictionMethod === REGRESSION) {
      return <SelectionControlGroup type="checkbox" controls={regressionMethods} id="regression" name='regression'
                                    label="Regression methods" onChange={props.filterOptionChange} inline
                                    className="md-cell md-cell--12"
                                    value={props.filterOptions.regression.join(',')}/>;
    } else if (props.predictionMethod === CLASSIFICATION) {
      return <SelectionControlGroup type="checkbox" controls={classificationMethods} id="classification"
                                    name='classification' className="md-cell md-cell--12"
                                    label="Classification methods" onChange={props.filterOptionChange} inline
                                    value={props.filterOptions.classification.join(',')}/>;
    } else {
      return null;
    }
  };

  const encodings =
    <SelectionControlGroup type="checkbox" label="Encoding methods" name="encodings" id="encodings"
                           onChange={props.filterOptionChange} controls={encoding} inline className="md-cell md-cell--6"
                           value={props.filterOptions.encodings.join(',')}/>;
  const clusterings =
    <SelectionControlGroup type="checkbox" label="Clustering methods" name="clusterings" id="clusterings"
                           onChange={props.filterOptionChange} controls={clustering} inline
                           className="md-cell md-cell--6"
                           value={props.filterOptions.clusterings.join(',')}/>;


  return <Card className="md-block-centered">
    <CardTitle title="Validation selection">
      <SelectField
        id="log-name-select"
        placeholder="log.xes"
        className="md-cell"
        menuItems={props.splitLabels}
        position={SelectField.Positions.BELOW}
        onChange={selectChange}
        value={props.selectedSplitId}
      /></CardTitle>
    <CardText>
      <div className="md-grid md-grid--no-spacing">
        <SelectionControlGroup id="prediction" name="prediction" type="radio" label="Prediction method"
                               inline controls={predictionMethods} value={props.predictionMethod}
                               onChange={localMethodChange} className="md-cell md-cell--6"/>
        {encodings}
        {clusterings}
        <SelectionControlGroup type="radio" name="padding-filter" id="padding-filter" label="Encoded log padding" inline
                               onChange={props.filterOptionChange} className="md-cell md-cell--6"
                               controls={padding} value={props.filterOptions.padding}/>
        {methods()}
        {checkies}
      </div>
      <h4>Label controls</h4>
      <LabelControls labelChange={props.labelChange}
                     predictionMethod={props.predictionMethod} {...props.filterOptions}/>
      <FetchState fetchState={props.fetchState}/>
    </CardText>
  </Card>;
};


ValidationHeaderCard.propTypes = {
  splitLabels: splitLabelPropType,
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
    label: PropTypes.any.isRequired,
    attributeNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    thresholds: PropTypes.arrayOf(PropTypes.number).isRequired,
    padding: PropTypes.string.isRequired
  }).isRequired,
  predictionMethod: PropTypes.string.isRequired
};
export default ValidationHeaderCard;
