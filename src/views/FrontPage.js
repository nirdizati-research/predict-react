import React, {Component} from 'react';
import {connect} from 'react-redux';
import WalkThrough from '../components/WalkThrough';

class FrontPage extends Component {
  render() {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--12">
          <WalkThrough/>
        </div>
      </div>
    );
  }
}

FrontPage.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FrontPage);
