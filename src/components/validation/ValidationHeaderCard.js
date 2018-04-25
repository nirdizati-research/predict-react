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
  classLabelControls,
  clustering,
  encoding,
  LABELLING,
  predictionMethods,
  regLabelControls,
  REGRESSION,
  regressionMethods
} from '../../reference';
import {splitLabels} from '../../helpers';

const ValidationHeaderCard = (props) => {
  const prefixControls = props.prefixLengths.map((prefix) => ({label: prefix, value: prefix}));

  const defaultValue = ',' + props.selectedPrefixes.join(',');

  const checkBoxChange = (value, event) => {
    props.prefixChange(event.target.value);
  };

  const checkies = props.prefixLengths.length > 0 ?
    <SelectionControlGroup type="checkbox" label="Prefix lengths" name="prefixLengths" id="prefixLengths"
                           onChange={checkBoxChange} controls={prefixControls} inline
                           value={defaultValue}/> : null;
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
                                    value={props.filterOptions.regression.join(',')}/>;
    } else if (props.predictionMethod === CLASSIFICATION) {
      return <SelectionControlGroup type="checkbox" controls={classificationMethods} id="classification"
                                    name='classification'
                                    label="Classification methods" onChange={props.filterOptionChange} inline
                                    value={props.filterOptions.classification.join(',')}/>;
    } else {
      return null;
    }
  };

  const encodings = props.predictionMethod !== LABELLING ?
    <SelectionControlGroup type="checkbox" label="Encoding methods" name="encodings" id="encodings"
                           onChange={props.filterOptionChange} controls={encoding} inline
                           value={props.filterOptions.encodings.join(',')}/> : null;
  const clusterings = props.predictionMethod !== LABELLING ?
    <SelectionControlGroup type="checkbox" label="Clustering methods" name="clusterings" id="clusterings"
                           onChange={props.filterOptionChange} controls={clustering} inline
                           value={props.filterOptions.clusterings.join(',')}/> : null;

  const controls = () => (props.predictionMethod === REGRESSION ? regLabelControls : classLabelControls);
  const labelType = <SelectField
    key="type"
    id="type"
    label="Label type"
    className="md-cell md-cell--3"
    menuItems={controls()}
    position={SelectField.Positions.BELOW}
    onChange={props.labelTypeChange}
    value={props.filterOptions.labelType}
  />;
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
        <div className="md-cell md-cell--6">
          <SelectionControlGroup id="prediction" name="prediction" type="radio" label="Prediction method"
                                 inline controls={predictionMethods}
                                 onChange={localMethodChange}/>
          {encodings}
          {labelType}
        </div>
        <div className="md-cell md-cell--6">
          {clusterings}
          {methods()}
        </div>
      </div>
      <div className="md-cell">
        {checkies}
      </div>
      <FetchState fetchState={props.fetchState}/>
    </CardText>
  </Card>;
};


ValidationHeaderCard.propTypes = {
  splitLabels: splitLabels,
  fetchState: PropTypes.shape({
    inFlight: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  methodChange: PropTypes.func.isRequired,
  splitChange: PropTypes.func.isRequired,
  prefixLengths: PropTypes.arrayOf(PropTypes.string).isRequired,
  prefixChange: PropTypes.func.isRequired,
  selectedPrefixes: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedSplitId: PropTypes.number.isRequired,
  filterOptionChange: PropTypes.func.isRequired,
  labelTypeChange: PropTypes.func.isRequired,
  filterOptions: PropTypes.shape({
    encodings: PropTypes.arrayOf(PropTypes.string).isRequired,
    clusterings: PropTypes.arrayOf(PropTypes.string).isRequired,
    classification: PropTypes.arrayOf(PropTypes.string).isRequired,
    regression: PropTypes.arrayOf(PropTypes.string).isRequired,
    labelType: PropTypes.string.isRequired
  }).isRequired,
  predictionMethod: PropTypes.string.isRequired
};
export default ValidationHeaderCard;
