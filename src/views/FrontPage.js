import React, {Component} from 'react';
import {connect} from 'react-redux';
import WalkThrough from '../components/WalkThrough';
import EncodingByLogCard from '../components/static/EncodingByLogCard';
import {ClassificationMethodsCard} from '../components/static/ClassificationMethodsCard';
import {RegressionMethodsCard} from '../components/static/RegressionMethodsCard';
import {HyperOptCard} from '../components/static/HyperOptCard';
import {DemoVideoCard} from '../components/static/DemoVideoCard';

class FrontPage extends Component {
    render() {
        return (
            <div className="md-grid">
                <WalkThrough/>
                <DemoVideoCard/>
                <HyperOptCard/>
                <EncodingByLogCard/>
                <ClassificationMethodsCard/>
                <RegressionMethodsCard/>
            </div>
        );
    }
}

FrontPage.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage);
