import React, {Component} from 'react';
import {connect} from 'react-redux';

class Dashboard extends Component {

  render() {
    return (
      <div className="md-grid">
        <div className="md-cell">
          <p>This is a paragraph!</p>
        </div>
        <div className="md-cell">
          <p>This is another paragraph!</p>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
