import {connect} from 'react-redux';
import RunningTasksLabel from '../components/RunningTasksLabel';

const mapStateToProps = (state) => ({
    totalCount: state.training.totalCount,
    completedCount: state.training.totalCount - state.training.runningIds.length,
    haveRunning: state.training.haveRunning
});

export default connect(mapStateToProps)(RunningTasksLabel);
