import React, {PureComponent} from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {jobPropType} from '../../propTypes';
import JsonHolder from '../validation/JsonHolder';

/* eslint-disable camelcase */
class RuntimeTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {slicedData: this.props.jobs.slice(0, 10)};
  }

  handlePagination(start, rowsPerPage) {
    this.setState({slicedData: this.props.jobs.slice(start, start + rowsPerPage)});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.jobs.length !== this.props.jobs.length) {
      let traces_list = this.createTableData();
      if (traces_list !== {}) {
          this.setState({slicedData: traces_list.slice(0, 10)});
      }
    }
  }

  getGraphicTraceData(case_id) {
      const higher_id = this.props.jobs[0].config.parent_job;
      let filtered_replay_job = this.props.jobs.filter((job) => case_id in job.case_id
                                                                  && job.config.parent_job === higher_id);
      let gold_value = 0;
      let list_values = [];
      filtered_replay_job.sort(function (a, b) {
         if (a.id < b.id) {
             return -1;
         } else {
             return 1;
         }
      });
      filtered_replay_job.map((job) => {
            if (case_id in job.results) {
                list_values.push(...job.results[case_id]);
            }
            if (case_id in job.gold_value) {
                gold_value = job.gold_value[case_id];
            }
         });
      return [list_values, gold_value];
  }

  createTableData() {
      try {
          const higher_id = this.props.jobs[0].config.parent_job;
          let filtered_jobs = this.props.jobs.filter((job) => (job.config.parent_job === higher_id));
          let trace_set = new Set();
          filtered_jobs.map((job) => {
              job.case_id.map((trace) => {
                  trace_set.add(trace);
              });
          });
          let trace_dict = {};
          trace_set.forEach((key) => (trace_dict[key] = {
              trace_id: key,
              events: 0,
              config: {},
              results: -1,
              gold_value: {},
              last_job: -1,
          }));
          filtered_jobs.map((job) => {
              job.case_id.map((trace_id) => {
                  if (job.event_number[trace_id] >= trace_dict[trace_id].events
                      || job.id > trace_dict[trace_id].last_job) {
                      if (trace_id in job.event_number) {
                          trace_dict[trace_id].events = job.event_number[trace_id];
                      }
                      if (trace_id in job.results) {
                          trace_dict[trace_id].results = job.results[trace_id];
                      }
                      if (trace_id in job.config) {
                          trace_dict[trace_id].config = job.config[trace_id];
                      }
                      if (trace_id in job.gold_value) {
                          trace_dict[trace_id].gold_value = job.gold_value[trace_id];
                      }
                  }
              });
          });
          return Object.values(trace_dict);
      } catch (err) {
          return 0;
      }
  }

  /*    showGraph(case_id) { Function to call in onClick on Tablerow
      let values = this.getGraphicTraceData(case_id);
      values[0] are the values given during the reproduction of the trace
      vales[1] gold_value
      Use this values as input of graph as in validation/ResultWrapper
      A possible way to implement charts can be that this function will create charts and put them as a props of this
      class and in render create a variable if the prop contains graphs and show them
      }
  }*/

  componentDidMount() {
    const intervalId = setInterval(() => {
      this.props.onRequestJobs();
      const traces_list = this.createTableData();
      if (traces_list !== 0) {
          this.setState({slicedData: traces_list.slice(0, 10)});
      }
    }, 20000);
    this.setState({intervalId: intervalId});
  }


  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  getHeaderColumns() {
    const headers =
      ['Trace_id', 'Events', 'Configuration', 'Prediction', 'Actual value'];

    return headers.map((header) => {
        let grow = false;
        if (header === 'Configuration') {
          grow = true;
        }
        return <TableColumn key={header} grow={grow}> {header}</TableColumn>;
      }
    );
  }

  render() {
    return (<DataTable baseId="simple-pagination" plain>
      <TableHeader>
        <TableRow selectable={false}>
          {this.getHeaderColumns()}
        </TableRow>
      </TableHeader>
      <TableBody>
        {this.state.slicedData.map(
          ({trace_id, events, config, results, gold_value}) => (
            <TableRow key={trace_id} selectable={false}>
              <TableColumn>{trace_id}</TableColumn>
              <TableColumn>{events}</TableColumn>
              <TableColumn grow><JsonHolder data={config}/></TableColumn>
              <TableColumn>{JSON.stringify(results)}</TableColumn>
              <TableColumn>{JSON.stringify(gold_value)}</TableColumn>
            </TableRow>
          ))}
      </TableBody>
      <TablePagination rows={this.props.jobs.length} rowsPerPageLabel={'Rows per page'}
                       onPagination={this.handlePagination.bind(this)}/>
    </DataTable>);
  }
}

RuntimeTable.propTypes = {
  jobs: PropTypes.arrayOf(jobPropType).isRequired,
  onRequestJobs: PropTypes.func.isRequired,
};

export default RuntimeTable;
