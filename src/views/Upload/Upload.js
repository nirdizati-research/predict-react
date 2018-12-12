import React, {Component} from 'react';
import {connect} from 'react-redux';
import UploadCard from '../../components/upload/UploadCard';
import UploadDoubleCard from '../../components/upload/UploadDoubleCard';

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
}

Upload.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
