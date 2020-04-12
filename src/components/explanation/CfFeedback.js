import React, {PureComponent} from 'react';
import {Card, CardTitle, CardText} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import {TextField} from 'react-md';
import CfFeedbackResultTable from './CfFeedbackResultTable';
import SelectField from 'react-md/lib/SelectFields';
import {Row} from 'react-grid-system';
import RetrainResultTable from './RetrainResultTable';

class CfFeedback extends PureComponent {
    constructor(props) {
      super(props);
      let removedIndex = [];
      let numberOfDropdown = 0;
      let featureNames = [];
      this.state = {
        numberOfDropdown,
        removedIndex,
        featureNames
      };
    }
    onChangeFeatureName(value, index, event, data) {
      let i=0;
      let arr = this.state.featureNames;
      for (i=0; i < this.state.numberOfDropdown; i++) {
        if (data.id == 'features_'+i) {
          arr[i] = data.value;
        }
      }
      this.setState({featureNames: arr});
      this.setState({removedIndex: this.state.removedIndex.concat(-2)});
    }

    onChangeFeatureValue(id) {
    }

    getFeatureNamesSelector(id) {
        return (
          <SelectField
            id={'features_'+id}
            placeholder="Feature Name"
            className="md-cell"
            value={this.state.featureNames[id]}
            menuItems={this.props.featureNames}
            position={SelectField.Positions.BELOW}
            onChange={this.onChangeFeatureName.bind(this)}
          />
        );
      }
      getFeatureValuesSelector(id) {
        // let arr = {'Age': [1, 2, 2121],
        // 'CType': [11, 12, 34],
        // 'PClaims': ['Yes', 'No']};
        // console.log(this.state.featureNames[id]);
        return (
          <SelectField
            id={'value_'+id}
            placeholder="Feature values"
            className="md-cell"
            menuItems={this.props.featureValues['decodedResult'][(this.state.featureNames[id])]}
            position={SelectField.Positions.BELOW}
            onChange={() => this.onChangeFeatureValue(id)}
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
    plusButton(id) {
      return (
      <button
        style={{margin: '10px', padding: '10px 20px 10px 20px',
         color: 'black', borderRadius: 5, borderWidth: 1,
         borderColor: '#fff'}}
         onClick={() => this.onPlusClicked()}
         >Add</button>);
    }
    removeButton(id) {
      return (
      <button
      id={'remove_'+id}
      style={{margin: '10px', padding: '10px 20px 10px 20px',
        color: 'red', borderRadius: 5, borderWidth: 1,
        borderColor: '#fff'}}
        onClick={() => this.onRemoveClicked(id)}
      >Remove</button>);
    }
    submitTopKButton() {
      return (
      <button
      id={'submit_topk'}
      style={{margin: '10px', padding: '0px 50px 0px 50px',
        color: 'darkblue', borderRadius: 5, borderWidth: 1,
        borderColor: '#fff'}}
        onClick={() => this.onSubmitTopKClicked()}
      >Sumbit</button>);
    }
    evaluateFeatureButton() {
      return (
      <button
      id={'evaluate_feature'}
      style={{margin: '10px', padding: '10px 60px 10px 60px',
        color: 'darkblue', borderRadius: 5, borderWidth: 1,
        borderColor: '#fff'}}
        onClick={() => this.onEvaluateFeatureClicked()}
      >Evaluate</button>);
    }
    addNewDropdowns() {
      let i =0;
      let arr = [];
      for (i=0; i < this.state.numberOfDropdown; i++) {
        if (!this.state.removedIndex.includes(i)) {
          arr.push(<div>
          {this.getFeatureNamesSelector(i)}
          {this.getFeatureValuesSelector(i)}
          {this.plusButton(i)}
          {this.removeButton(i)}
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
    onPlusClicked() {
      this.setState({numberOfDropdown: this.state.numberOfDropdown+1});
      this.setState({featureNames: this.state.featureNames.concat(null)});
    }
    onRemoveClicked(index) {
      this.setState({removedIndex: this.state.removedIndex.concat(index)});
    }
    onSubmitTopKClicked() {
      if (document.getElementById('topK') != null && (document.getElementById('topK')).value>0) {
        this.props.onSubmitTopK((document.getElementById('topK')).value);
      }
    }
    onEvaluateFeatureClicked() {
      let i = 0;
      let featureNames = [];
      let featureValues = [];
      for (i = 0; i<this.state.numberOfDropdown; i++) {
        if (!this.state.removedIndex.includes(i) && document.getElementById('features_'+i) != null) {
          featureNames.push((document.getElementById('features_'+i)).value);
          let arr = this.props.featureValues['decodedResult'][(document.getElementById('features_'+i)).value];
          const index = arr.indexOf((document.getElementById('value_'+i)).value);
          featureValues.push(this.props.featureValues['encodedResult'][(document.getElementById('features_'+i))
            .value][index]);
        }
      }
      this.props.onSubmitFeatureNamesAndValues(featureNames, featureValues);
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
    render() {
      if (this.state.numberOfDropdown == 0) {
        this.setState({numberOfDropdown: this.state.numberOfDropdown+1});
        this.setState({featureNames: this.state.featureNames.concat(null)});
      }
        return (
               <Card className="md-block-centered">
                 <CardTitle title="CF Feedback result "></CardTitle>
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
                   />
                 {this.drawLine()}
                 <h3>Patterns to randomise</h3>
                 {!this.props.isEncodedUniqueValuesLoaded ?
                    <CircularProgress id="query-indeterminate-progress"/> : null}
                  {this.addNewDropdowns()}
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
  featureValues: PropTypes.any,
  onSubmitTopK: PropTypes.func,
  onSubmitFeatureNamesAndValues: PropTypes.func,
};
export default CfFeedback;
