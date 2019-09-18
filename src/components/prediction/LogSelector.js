import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import FetchState from '../FetchState';
import SelectField from 'react-md/lib/SelectFields/index';
import {fetchStatePropType, logsStore} from '../../propTypes';

class LogSelector extends Component {
    selectChange(value, _) {
        this.props.logChange(value);
    }

    render() {
        const logList = Object.values(this.props.logs.byId).map((log) => ({id: log.id, name: log.name}));
        const itemsWithLabel = logList.map(({id, name}) => ({value: id, label: name}));

        return (
            <Card className="md-block-centered">
                <CardTitle title="Select the Log"/>
                <CardText>
                    <SelectField
                        id="log-name-select"
                        className="md-cell"
                        placeholder="log.xes"
                        menuItems={itemsWithLabel}
                        position={SelectField.Positions.BELOW}
                        onChange={this.selectChange.bind(this)}
                        value={this.props.logId}
                    />
                    <div>Prefix length (maximum {this.props.maxPLength})</div>
                    <FetchState fetchState={this.props.fetchState}/>
                </CardText>
            </Card>);
    }
}

LogSelector.propTypes = {
    logs: logsStore,
    maxPLength: PropTypes.number.isRequired,
    fetchState: fetchStatePropType,
    logChange: PropTypes.func.isRequired,
    logId: PropTypes.number.isRequired
};

export default LogSelector;
