import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import Viz from 'viz.js';
import HTMLReactParser from 'react-html-parser';

const PetriNet = (props) => {
    return <Card className="md-block-centered">
        <CardTitle title="PetriNet created with Alpha-miner"/>
        {/* eslint-disable-next-line new-cap */}
        {HTMLReactParser(Viz(
            props.data.join(''),
            {format: 'svg', scale: 2}
        ))}
        <CardText>
            {props.data.length < 2 ? 'Net cannot be shown. Metrics not available.' : ''}
        </CardText>
    </Card>;
};

PetriNet.propTypes = {
    data: PropTypes.string.isRequired,
    cardTitle: PropTypes.string.isRequired,
    chartTitle: PropTypes.string.isRequired
};

export default PetriNet;
