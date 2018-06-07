import React, {Component} from 'react';
import {connect} from 'react-redux';
import WalkThrough from '../components/WalkThrough';
import EncodingByLogCard from '../components/static/EncodingByLogCard';
import {ClassificationMethodsCard} from '../components/static/ClassificationMethodsCard';

class FrontPage extends Component {
  render() {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <WalkThrough/>
        </div>
        <div className="md-cell md-cell--12">
          <EncodingByLogCard/></div>
        <div className="md-cell md-cell--12">
          <ClassificationMethodsCard/></div>
      </div>
    );
  }
}

FrontPage.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage);
