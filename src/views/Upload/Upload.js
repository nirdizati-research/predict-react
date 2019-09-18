import React, {Component} from 'react';
import {connect} from 'react-redux';
import UploadCard from '../../components/upload/UploadCard';
import UploadDoubleCard from '../../components/upload/UploadDoubleCard';
import ReactGA from 'react-ga';

class Upload extends Component {
    render() {
        return (
            <div className="md-grid">
                <div className="md-cell md-cell--12">
                    <UploadCard/>
                </div>
                <div className="md-cell md-cell--12">
                    <UploadDoubleCard/>
                </div>
            </div>
        );
    }
    componentDidMount() {
        ReactGA.initialize('UA-143444044-1');
        ReactGA.pageview('/upload');
    }
}

Upload.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
