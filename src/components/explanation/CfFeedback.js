import React, {PureComponent} from 'react';
import {Card, CardTitle, CardText} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import {TextField} from 'react-md';
import CfFeedbackResultTable from './CfFeedbackResultTable';
import SelectField from 'react-md/lib/SelectFields';
import {Row} from 'react-grid-system';
import RetrainResultTable from './RetrainResultTable';
import {getFeatureNamesAndValueFromSelectedPatterns} from '../../util/dataReducers';

class CfFeedback extends PureComponent {
    constructor(props) {
      super(props);
      let removedIndexFeatures = [];
      let removedIndexPatterns = [];
      let numberOfDropdownFeatures = 0;
      let numberOfDropdownPatterns = 0;
      let shownDropdownsFeatures = 0;
      let shownDropdownsPatterns = 0;
      let selectedMatrix = 'All';
      let featureNames = [];
      let patterns = [];
      this.state = {
        numberOfDropdownFeatures,
        numberOfDropdownPatterns,
        shownDropdownsFeatures,
        shownDropdownsPatterns,
        removedIndexFeatures,
        removedIndexPatterns,
        featureNames,
        patterns,
        selectedMatrix
      };
    }
    onChangeFeatureName(value, index, event, data) {
      let i=0;
      let arr = this.state.featureNames;
      for (i=0; i < this.state.numberOfDropdownFeatures; i++) {
        if (data.id == 'features_'+i) {
          arr[i] = data.value;
        }
      }
      this.setState({featureNames: arr});
      this.setState({removedIndexFeatures: this.state.removedIndexFeatures.concat(-2)});
    }

    onChangePattern(value, index, event, data) {
      let i=0;
      let arr = this.state.patterns;
      for (i=0; i < this.state.numberOfDropdownPatterns; i++) {
        if (data.id == 'patterns_'+i) {
          arr[i] = data.value;
        }
      }
      this.setState({patterns: arr});
      this.setState({removedIndexPatterns: this.state.removedIndexPatterns.concat(-2)});
    }

    onChangeFeatureValue(id) {
    }

    getFeatureNamesSelector(id) {
        return (
          <SelectField
            id={'features_'+id}
            placeholder="Feature Name"
            className="md-cell md-cell--3"
            value={this.state.featureNames[id]}
            menuItems={this.props.featureNames}
            position={SelectField.Positions.BELOW}
            onChange={this.onChangeFeatureName.bind(this)}
          />
        );
      }
      getFeatureValuesSelector(id) {
        return (
          <SelectField
            className="md-cell md-cell--3"
            id={'value_'+id}
            placeholder="Feature values"
            menuItems={this.props.featureValues['decodedResult'][(this.state.featureNames[id])]}
            position={SelectField.Positions.BELOW}
            onChange={() => this.onChangeFeatureValue(id)}
          />
        );
      }

      getPatternSelector(id) {
        return (
          <SelectField
            id={'patterns_'+id}
            placeholder="Select pattern"
            className="md-cell md-cell--7"
            value={this.state.patterns[id]}
            menuItems={this.props.patterns}
            position={SelectField.Positions.BELOW}
            onChange={this.onChangePattern.bind(this)}
          />
        );
      }

    getInputText() {
      return (
        <TextField
              key="topK"
              id="topK"
              label="Top K value"
              type="number"
              defaultValue={0}
              inputStyle={{fontSize: 16}}
              min={0}
              className="md-cell--4"
          />
      );
    }
    drawLine() {
      return (
        <hr
        style={{
            color: 'black',
            height: 2,
            marginTop: 20,
            marginBottom: 20
        }}
    />
      );
    }
    featureAddButton(id) {
      return (
      <button
      className="md-cell md-cell--2"
        style={{marginLeft: 130, padding: '10px 20px 10px 20px',
         color: 'black', borderRadius: 5, borderWidth: 1,
         borderColor: '#fff'}}
         onClick={() => this.onFeatureAddClicked()}
         >ADD</button>);
    }
    featureRemoveButton(id) {
      return (
      <button
      className="md-cell md-cell--2"
      id={'remove_'+id}
      style={{margin: '10px', padding: '10px 20px 10px 20px',
        color: 'red', borderRadius: 5, borderWidth: 1,
        borderColor: '#fff'}}
        onClick={() => this.onFeatureRemoveClicked(id)}
      >REMOVE</button>);
    }

    patternAddButton(id) {
      return (
      <button
      className="md-cell md-cell--2"
        style={{marginLeft: '10px', padding: '10px 20px 10px 20px',
         color: 'black', borderRadius: 5, borderWidth: 1,
         borderColor: '#fff'}}
         onClick={() => this.onPatternAddClicked()}
         >ADD</button>);
    }
    patternRemoveButton(id) {
      return (
      <button
      className="md-cell md-cell--2"
      id={'remove_'+id}
      style={{margin: '10px', padding: '10px 20px 10px 20px',
        color: 'red', borderRadius: 5, borderWidth: 1,
        borderColor: '#fff'}}
        onClick={() => this.onPatternRemoveClicked(id)}
      >REMOVE</button>);
    }
    submitTopKButton() {
      return (
      <button
      id={'submit_topk'}
      style={{margin: '10px', padding: '0px 50px 0px 50px',
        color: 'darkblue', borderRadius: 5, borderWidth: 1,
        borderColor: '#fff'}}
        onClick={() => this.onSubmitTopKClicked()}
      >SUBMIT</button>);
    }
    evaluateFeatureButton() {
      return (
      <button
      id={'evaluate_feature'}
      style={{margin: '10px', padding: '10px 60px 10px 60px',
        color: 'darkblue', borderRadius: 5, borderWidth: 1,
        borderColor: '#fff'}}
        onClick={() => this.onEvaluateFeatureClicked()}
      >EVALUATE</button>);
    }
    addNewFeatureDropdowns() {
      let i =0;
      let arr = [];
      for (i=0; i < this.state.numberOfDropdownFeatures; i++) {
        if (!this.state.removedIndexFeatures.includes(i)) {
          arr.push(<div>
          {this.getFeatureNamesSelector(i)}
          {this.getFeatureValuesSelector(i)}
          {this.featureAddButton(i)}
          {this.featureRemoveButton(i)}
          </div>
          );
        } else arr.push(null);
      }
      return (
        <div>
          {arr}
        </div>
      );
    }
    addNewPatternDropdowns() {
      let i =0;
      let arr = [];
      for (i=0; i < this.state.numberOfDropdownPatterns; i++) {
        if (!this.state.removedIndexPatterns.includes(i)) {
          arr.push(<div>
          {this.getPatternSelector(i)}
          {this.patternAddButton(i)}
          {this.patternRemoveButton(i)}
          </div>
          );
        } else arr.push(null);
      }
      return (
        <div>
          {arr}
        </div>
      );
    }
    onFeatureAddClicked() {
      this.setState({numberOfDropdownFeatures: this.state.numberOfDropdownFeatures+1});
      this.setState({featureNames: this.state.featureNames.concat(null)});
      this.setState({shownDropdownsFeatures: this.state.shownDropdownsFeatures+1});
    }
    onFeatureRemoveClicked(index) {
      this.setState({removedIndexFeatures: this.state.removedIndexFeatures.concat(index)});
      this.setState({shownDropdownsFeatures: this.state.shownDropdownsFeatures-1});
    }
    onPatternAddClicked() {
      this.setState({numberOfDropdownPatterns: this.state.numberOfDropdownPatterns+1});
      this.setState({patterns: this.state.patterns.concat(null)});
      this.setState({shownDropdownsPatterns: this.state.shownDropdownsPatterns+1});
    }
    onPatternRemoveClicked(index) {
      this.setState({removedIndexPatterns: this.state.removedIndexPatterns.concat(index)});
      this.setState({shownDropdownsPatterns: this.state.shownDropdownsPatterns-1});
    }
    onSubmitTopKClicked() {
      if (document.getElementById('topK') != null && (document.getElementById('topK')).value>0) {
        this.props.onSubmitTopK((document.getElementById('topK')).value);
      }
    }
    onEvaluateFeatureClicked() {
      let i = 0;
      let prefixs = [];
      let data = [];
      for (i = 0; i<this.state.numberOfDropdownFeatures; i++) {
        let feature = document.getElementById('features_'+i);
        if (!this.state.removedIndexFeatures.includes(i)
          && feature != null
          && feature.value != '' ) {
          let arr = this.props.featureValues['decodedResult'][feature.value];
          if (document.getElementById('value_'+i) !=null && (document.getElementById('value_'+i)).value != '') {
            const index = arr.indexOf((document.getElementById('value_'+i)).value);
            let result = [];
            result.push(feature.value);
            result.push(this.props.featureValues['encodedResult'][feature.value][index]);
            data.push([result]);
          }
        }
      }
      for (i = 0; i<this.state.numberOfDropdownPatterns; i++) {
        if (!this.state.removedIndexPatterns.includes(i)
          && document.getElementById('patterns_'+i) != null
          && document.getElementById('patterns_'+i).value !='') {
          prefixs.push((document.getElementById('patterns_'+i)).value);
        }
      }
      if (prefixs.length>0) {
        let mergedResult = getFeatureNamesAndValueFromSelectedPatterns(prefixs,
        this.props.featureNames, this.props.featureValues);
        mergedResult.forEach(element => {
          data.push(element);
        });
      }
      this.props.onSubmitFeatureNamesAndValues(data);
    }
    initialResult(result) {
      return (
        <h4 style={{color: 'indigo'}}>
            {result}
        </h4>
      );
    }
    retrainResult(result) {
      return (
        <h4 style={{color: 'green'}}>
            {result}
        </h4>
      );
    }
    onSelectedMatrixChange(matrix) {
      this.setState({selectedMatrix: matrix});
    }
    render() {
      if (this.state.shownDropdownsFeatures == 0) {
        this.onFeatureAddClicked();
      }
      if (this.state.shownDropdownsPatterns == 0) {
        this.onPatternAddClicked();
      }
        return (
               <Card className="md-block-centered">
                 <CardTitle title="Confusion matrix classes with characterizing patterns"></CardTitle>
                <CardText>
                  <div className="md-block-centered">
                    <Row style={{margin: '10px'}}>
                      {this.getInputText()}
                      {this.submitTopKButton()}
                    </Row>
                 </div>
                 {!this.props.isCfFeedbackValuesLoaded ? <CircularProgress id="query-indeterminate-progress"/> : null}
                 <CfFeedbackResultTable
                   cfFeedbackResult={this.props.cfFeedbackValue}
                   onSelectedMatrixChange={this.onSelectedMatrixChange.bind(this)}
                   selectedMatrix={this.state.selectedMatrix}
                   />
                 {this.drawLine()}
                 <h3>Features and Patterns to randomize</h3>
                 <h4>Randomizing patterns that affect wrong predictions the accuracy of
                    the classifier could improve</h4>
                 {this.addNewPatternDropdowns()}
                 {!this.props.isEncodedUniqueValuesLoaded ?
                    <CircularProgress id="query-indeterminate-progress"/> : null}
                  {this.addNewFeatureDropdowns()}
                  {!this.props.isRetrainValuesLoaded ?
                    <CircularProgress id="query-indeterminate-progress"/> : null}
                  <div className="md-cell md-cell--12">{JSON.stringify(this.props.retrainValue) !='{}' ?
                    <RetrainResultTable
                      initialResultValue={this.props.retrainValue['Initial result']}
                      retrainResultValue={this.props.retrainValue['Retrain result']}/> : null}</div>
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  {this.evaluateFeatureButton()}
                  </div>
                </CardText>
              </Card>
        );
    }
}
CfFeedback.propTypes = {
  jobId: PropTypes.any,
  cfFeedbackValue: PropTypes.any,
  isCfFeedbackValuesLoaded: PropTypes.bool,
  retrainValue: PropTypes.any,
  isRetrainValuesLoaded: PropTypes.bool,
  isEncodedUniqueValuesLoaded: PropTypes.bool,
  featureNames: PropTypes.any,
  patterns: PropTypes.any,
  featureValues: PropTypes.any,
  onSubmitTopK: PropTypes.func,
  onSubmitFeatureNamesAndValues: PropTypes.func,
};
export default CfFeedback;
