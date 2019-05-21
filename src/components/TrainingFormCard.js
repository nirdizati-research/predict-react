/**
 * Created by tonis.kasekamp on 9/26/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import SelectField from 'react-md/lib/SelectFields';
import {Checkbox, SelectionControlGroup} from 'react-md/lib/SelectionControls/index';
import {Button} from 'react-md/lib/Buttons/index';
import FetchState from './FetchState';
import {
    ADAPTIVE_TREE,
    CLASSIFICATION,
    classificationMethods,
    clusteringMethods,
    COMPLEX,
    DECISION_TREE,
    DURATION,
    encodingMethods,
    HOEFFDING_TREE,
    KMEANS,
    KNN,
    LABELLING,
    LASSO,
    LINEAR,
    MULTINOMIAL_NAIVE_BAYES,
    NN,
    ONLY_THIS,
    paddingControls,
    PERCEPTRON,
    predictionMethods,
    prefixTypeControls,
    RANDOM_FOREST,
    REGRESSION,
    regressionMethods,
    REMAINING_TIME,
    RNN,
    SGDCLASSIFIER,
    SIMPLE_INDEX,
    THRESHOLD_MEAN,
    TIME_SERIES_PREDICTION,
    timeSeriesPredictionMethods,
    XGBOOST,
    ZERO_PADDING,
} from '../reference';
import CheckboxGroup from './training/CheckboxGroup';
import {fetchStatePropType, modelPropType, selectLabelProptype, traceAttributeShape} from '../propTypes';
import PrefixSelector from './training/PrefixSelector';
import AdvancedConfiguration from './advanced/AdvancedConfiguration';
import {classificationMetrics, regressionMetrics, timeSeriesPredictionMetrics} from './advanced/advancedConfig';
import {advancedConfigChange} from '../util/advancedFormInput';

const defaultPrefix = 1;
const groupStyle = {height: 'auto'};

const initialState = (props) => {
    const splitId = props.splitLabels[0] ? props.splitLabels[0].value : 0;
    const predictionMethod = props.isLabelForm ? LABELLING : REGRESSION;
    const labelType = props.isLabelForm ? DURATION : REMAINING_TIME;
    return {
        split_id: splitId,
        encodings: [encodingMethods[0].value],
        clusterings: [clusteringMethods[0].value],
        classification: [classificationMethods[0].value],
        regression: [regressionMethods[0].value],
        timeSeriesPrediction: [timeSeriesPredictionMethods[0].value],
        encoding: {
            padding: paddingControls[0].value,
            generation_type: prefixTypeControls[0].value,
            prefix_length: defaultPrefix,
            features: []
        },
        labelling: {
            type: labelType,
            attribute_name: '',
            threshold_type: THRESHOLD_MEAN,
            threshold: 0,
            add_remaining_time: false,
            add_elapsed_time: false,
            add_executed_events: false,
            add_resources_used: false,
            add_new_traces: false,
        },
        incremental_train: {
            base_model: null
        },
        displayWarning: false,
        predictionMethod: predictionMethod,
        kmeans: {},
        hyperparameter_optimizer: {
            type: 'none',
            max_evaluations: 10,
            performance_metric: 'rmse'
        },
        create_models: false
    };
};

const initialAdvancedConfiguration = () => {
    return {
        [`${CLASSIFICATION}.${KNN}`]: {},
        [`${CLASSIFICATION}.${RANDOM_FOREST}`]: {},
        [`${CLASSIFICATION}.${DECISION_TREE}`]: {},
        [`${CLASSIFICATION}.${XGBOOST}`]: {},
        [`${CLASSIFICATION}.${MULTINOMIAL_NAIVE_BAYES}`]: {},
        [`${CLASSIFICATION}.${HOEFFDING_TREE}`]: {},
        [`${CLASSIFICATION}.${ADAPTIVE_TREE}`]: {},
        [`${CLASSIFICATION}.${SGDCLASSIFIER}`]: {},
        [`${CLASSIFICATION}.${PERCEPTRON}`]: {},
        [`${CLASSIFICATION}.${NN}`]: {},

        [`${REGRESSION}.${RANDOM_FOREST}`]: {},
        [`${REGRESSION}.${LASSO}`]: {},
        [`${REGRESSION}.${LINEAR}`]: {},
        [`${REGRESSION}.${XGBOOST}`]: {},
        [`${REGRESSION}.${NN}`]: {},

        [`${TIME_SERIES_PREDICTION}.${RNN}`]: {}
    };
};

class TrainingFormCard extends Component {
    constructor(props) {
        super(props);

        // TODO group to {} by prediction method
        this.state = {...initialState(this.props), ...initialAdvancedConfiguration()};
        this.props.onSplitChange(this.state.split_id);
    }

    static displayWarningCheck(prevState) {
        switch (prevState.predictionMethod) {
            case REGRESSION:
                return !(prevState.encodings.length !== 0
                    && prevState.clusterings.length !== 0
                    && prevState.regression.length !== 0);
            case CLASSIFICATION:
                return !(prevState.encodings.length !== 0
                    && prevState.clusterings.length !== 0
                    && prevState.classification.length !== 0);
            case TIME_SERIES_PREDICTION:
                return !(prevState.encodings.length !== 0
                    && prevState.clusterings.length !== 0
                    && prevState.timeSeriesPrediction.length !== 0);
            // no default
        }
    }

    componentDidUpdate(prevProps) {
        if (this.state.split_id === 0 && this.props.splitLabels.length > 0) {
            this.setState({split_id: this.props.splitLabels[0].value});
            this.props.onSplitChange(this.props.splitLabels[0].value);
        }
    }

    advanceConfigChange(config, value) {
        this.setState(advancedConfigChange(this.state, config, value));
    }

    addOrRemove(list, value) {
        const index = list.indexOf(value);
        if (index > -1) {
            return list.filter((val) => val !== value);
        } else {
            return [...list, value];
        }
    }

    // Change methods
    checkboxChange(_, event) {
        const value = event.target.value;
        switch (event.target.name) {
            case 'encodings[]':
                this.setState({encodings: this.addOrRemove(this.state.encodings, value)});
                break;
            case 'clusterings[]': {
                // reset kmeans
                const kmeans = value === KMEANS ? {} : this.state.kmeans;
                this.setState({kmeans, clusterings: this.addOrRemove(this.state.clusterings, value)});
                break;
            }
            case 'regression[]':
                if (this.state.regression.includes(NN)) {
                    const encoding = this.state.encoding;
                    encoding.padding = ZERO_PADDING;
                    encoding.generation_type = ONLY_THIS;
                    this.setState({encoding: encoding});
                }
                this.setState({regression: this.addOrRemove(this.state.regression, value)});
                break;
            case 'classification[]':
                if (this.state.classification.includes(NN)) {
                    const encoding = this.state.encoding;
                    encoding.padding = ZERO_PADDING;
                    encoding.generation_type = ONLY_THIS;
                    this.setState({encoding: encoding});
                }
                this.setState({classification: this.addOrRemove(this.state.classification, value)});
                break;
            case 'timeSeriesPrediction[]':
                this.setState({timeSeriesPrediction: this.addOrRemove(this.state.timeSeriesPrediction, value)});
                break;
            case 'rule':
                // not a list, but works
                this.setState({rule: value});
                break;
            case 'create_models':
                this.setState({create_models: event.target.checked});
                break;
            // no default
        }

        this.setState((prevState, ) => {
            return {displayWarning: TrainingFormCard.displayWarningCheck(prevState)};
        });
    }

    onPredictionMethodChange(value) {
        // Following is a terrible hack for an uncontrolled component
        /* eslint-disable camelcase */

        let performance_metric;
        let labelType;
        if (value === REGRESSION) {
            performance_metric = regressionMetrics[0].value;
            labelType = REMAINING_TIME;
        } else if (value === CLASSIFICATION) {
            performance_metric = classificationMetrics[0].value;
            labelType = DURATION;
        } else if (value === TIME_SERIES_PREDICTION) {
            performance_metric = timeSeriesPredictionMetrics[0].value;
            labelType = DURATION;

            const encodings = this.state.encodings.filter(obj =>
                [SIMPLE_INDEX, COMPLEX].includes(obj)
            );
            const encoding = this.state.encoding;
            encoding.padding = ZERO_PADDING;
            encoding.generation_type = ONLY_THIS;
            this.setState({encodings: encodings});
            this.setState({encoding: encoding});
        }
        this.setState({
            predictionMethod: value, labelling: {...this.state.labelling, type: labelType},
            hyperparameter_optimizer: {...this.state.hyperparameter_optimizer, performance_metric}, ...initialAdvancedConfiguration()
        });
        this.setState((prevState, ) => {
            return {displayWarning: TrainingFormCard.displayWarningCheck(prevState)};
        });
    }

    selectChange(value, ) {
        this.setState({split_id: value});
        this.props.onSplitChange(value);
    }

    // On submit
    onSubmit() {
        switch (this.state.predictionMethod) {
            case REGRESSION:
                this.props.onSubmit(this.getWithMethods(this.state.regression));
                break;
            case CLASSIFICATION:
                this.props.onSubmit(this.getWithMethods(this.state.classification));
                break;
            case TIME_SERIES_PREDICTION:
                this.props.onSubmit(this.getWithMethods(this.state.timeSeriesPrediction));
                break;
            case LABELLING:
                this.props.onSubmit(this.getLabellingPayload());
                break;
            // no default
        }
    }

    getLabellingPayload() {
        return {
            type: this.state.predictionMethod,
            split_id: this.state.split_id,
            config: {
                encoding: this.state.encoding,
                labelling: this.state.labelling,
            }
        };
    }

    getWithMethods(methods) {
        return {
            type: this.state.predictionMethod,
            split_id: this.state.split_id,
            config: {
                encoding: this.state.encoding,
                encodings: this.state.encodings,
                clusterings: this.state.clusterings,
                methods: methods,
                labelling: this.state.labelling,
                incremental_train: this.state.incremental_train,
                create_models: this.state.create_models,
                add_elapsed_time: this.state.add_elapsed_time,
                hyperparameter_optimizer: this.state.hyperparameter_optimizer,
                kmeans: this.state.kmeans,
                [`${CLASSIFICATION}.${KNN}`]: this.state[`${CLASSIFICATION}.${KNN}`],
                [`${CLASSIFICATION}.${RANDOM_FOREST}`]: this.state[`${CLASSIFICATION}.${RANDOM_FOREST}`],
                [`${CLASSIFICATION}.${DECISION_TREE}`]: this.state[`${CLASSIFICATION}.${DECISION_TREE}`],
                [`${CLASSIFICATION}.${XGBOOST}`]: this.state[`${CLASSIFICATION}.${XGBOOST}`],
                [`${CLASSIFICATION}.${MULTINOMIAL_NAIVE_BAYES}`]:
                    this.state[`${CLASSIFICATION}.${MULTINOMIAL_NAIVE_BAYES}`],
                [`${CLASSIFICATION}.${HOEFFDING_TREE}`]: this.state[`${CLASSIFICATION}.${HOEFFDING_TREE}`],
                [`${CLASSIFICATION}.${ADAPTIVE_TREE}`]: this.state[`${CLASSIFICATION}.${ADAPTIVE_TREE}`],
                [`${CLASSIFICATION}.${SGDCLASSIFIER}`]: this.state[`${CLASSIFICATION}.${SGDCLASSIFIER}`],
                [`${CLASSIFICATION}.${PERCEPTRON}`]: this.state[`${CLASSIFICATION}.${PERCEPTRON}`],
                [`${CLASSIFICATION}.${NN}`]: this.state[`${CLASSIFICATION}.${NN}`],

                [`${REGRESSION}.${RANDOM_FOREST}`]: this.state[`${REGRESSION}.${RANDOM_FOREST}`],
                [`${REGRESSION}.${LASSO}`]: this.state[`${REGRESSION}.${LASSO}`],
                [`${REGRESSION}.${LINEAR}`]: this.state[`${REGRESSION}.${LINEAR}`],
                [`${REGRESSION}.${XGBOOST}`]: this.state[`${REGRESSION}.${XGBOOST}`],
                [`${REGRESSION}.${NN}`]: this.state[`${REGRESSION}.${NN}`],

                [`${TIME_SERIES_PREDICTION}.${RNN}`]: this.state[`${TIME_SERIES_PREDICTION}.${RNN}`]
            }
        };
    }

    getMethodsFragment() {
        switch (this.state.predictionMethod) {
            case REGRESSION: {
                return <CheckboxGroup controls={regressionMethods} id="regression" label="Regression methods"
                                      onChange={this.checkboxChange.bind(this)}
                                      value={this.state.regression.join(',')}/>;
            }
            case CLASSIFICATION: {
                return <CheckboxGroup controls={classificationMethods} id="classification"
                                      label="Classification methods" onChange={this.checkboxChange.bind(this)}
                                      value={this.state.classification.join(',')}/>;
            }
            case TIME_SERIES_PREDICTION: {
                return <CheckboxGroup controls={timeSeriesPredictionMethods} id="timeSeriesPrediction"
                                      label="Time Series Prediction methods"
                                      onChange={this.checkboxChange.bind(this)}
                                      value={this.state.timeSeriesPrediction.join(',')}/>;
            }
        }
    }

    onReset() {
        this.setState({...initialState(this.props), ...initialAdvancedConfiguration()});
    }

    render() {
        let warning = null;
        if (this.state.displayWarning) {
            warning = <p className="md-text md-text--error">Select at least one from every option</p>;
        }

        const predictionControls =
            <SelectionControlGroup id="prediction" name="prediction" type="radio" label="Prediction method"
                                   value={this.state.predictionMethod} inline controls={predictionMethods}
                                   onChange={this.onPredictionMethodChange.bind(this)}/>;

        const createModels = !this.props.isLabelForm ?
            <Checkbox id="create_models" name="create_models"
                      label="Create and save models for runtime prediction"
                      checked={this.state.create_models} inline
                      onChange={this.checkboxChange.bind(this)}/> : null;

        const clusteringFragment =
            <SelectionControlGroup type="checkbox" label="Clustering methods" name="clusterings" id="clusterings"
                                   onChange={this.checkboxChange.bind(this)} controls={clusteringMethods}
                                   value={this.state.clusterings.join(',')} controlStyle={groupStyle}/>;

        const filteredEncodingMethods = encodingMethods.filter(obj =>
            ((this.state.predictionMethod === TIME_SERIES_PREDICTION && [COMPLEX, SIMPLE_INDEX].includes(obj.value)) ||
                (this.state.predictionMethod !== TIME_SERIES_PREDICTION))
        );

        const encodingFragment = !this.props.isLabelForm ?
            <SelectionControlGroup type="checkbox" label="Encoding methods" name="encodings"
                                   className="md-cell md-cell--4" id="encodings"
                                   onChange={this.checkboxChange.bind(this)} controls={filteredEncodingMethods}
                                   value={this.state.encodings.join(',')} controlStyle={groupStyle}/> : null;

        const prefixSelector = <PrefixSelector encoding={this.state.encoding}
                                               classification={this.state.classification}
                                               regression={this.state.regression}
                                               onChange={this.advanceConfigChange.bind(this)}
                                               maxEventsInLog={this.props.maxEventsInLog}
                                               isLabelForm={this.props.isLabelForm}
                                               predictionMethod={this.state.predictionMethod}/>;

        const advancedConfiguration =
            <AdvancedConfiguration classification={this.state.classification}
                                   regression={this.state.regression}
                                   timeSeriesPrediction={this.state.timeSeriesPrediction}
                                   onChange={this.advanceConfigChange.bind(this)}
                                   labelling={this.state.labelling}
                                   traceAttributes={this.props.traceAttributes}
                                   clusterings={this.state.clusterings}
                                   predictionMethod={this.state.predictionMethod}
                                   classificationModels={this.props.classificationModels}
                                   regressionModels={this.props.regressionModels}
                                   timeSeriesPredictionModels={this.props.timeSeriesPredictionModels}
                                   onModelChange={this.props.onModelChange}/>;

        const title = this.props.isLabelForm ? 'Labeling' : 'Training';

        const otherSelector = this.props.isLabelForm ? null :
            <div className="md-cell md-cell--4">
            {predictionControls}
            {this.getMethodsFragment()}
            {clusteringFragment}
            </div>;

        return (
            <Card className="md-block-centered">
                <CardTitle title={title}>
                    <SelectField
                        id="log-name-select"
                        placeholder="Split id will be here"
                        className="md-cell"
                        menuItems={this.props.splitLabels}
                        position={SelectField.Positions.BELOW}
                        onChange={this.selectChange.bind(this)}
                        value={this.state.split_id}
                    /></CardTitle>
                <CardText>
                    <div className="md-grid md-grid--no-spacing">
                        {otherSelector}
                        {encodingFragment}
                        {prefixSelector}
                    </div>
                </CardText>
                {advancedConfiguration}
                <CardText>
                    <div className="md-grid md-grid--no-spacing">
                        <div className="md-cell md-cell--12">
                            {createModels}
                        </div>
                        <div className="md-cell md-cell--12">
                            {warning}
                            <FetchState fetchState={this.props.fetchState}/>
                            <Button raised primary swapTheming onClick={this.onSubmit.bind(this)}
                                    disabled={this.state.displayWarning} className="buttons__group">Submit</Button>
                            <Button raised secondary swapTheming onClick={this.onReset.bind(this)}
                                    className="buttons__group">Reset</Button>
                        </div>
                    </div>
                </CardText>
            </Card>
        );
    }
}

TrainingFormCard.propTypes = {
    splitLabels: selectLabelProptype,
    fetchState: fetchStatePropType,
    onSubmit: PropTypes.func.isRequired,
    onSplitChange: PropTypes.func.isRequired,
    maxEventsInLog: PropTypes.number.isRequired,
    isLabelForm: PropTypes.bool,
    traceAttributes: PropTypes.arrayOf(PropTypes.shape(traceAttributeShape)).isRequired,
    classificationModels: PropTypes.arrayOf(modelPropType).isRequired,
    regressionModels: PropTypes.arrayOf(modelPropType).isRequired,
    timeSeriesPredictionModels: PropTypes.arrayOf(modelPropType).isRequired,
    onModelChange: PropTypes.func.isRequired
};

export default TrainingFormCard;
