import {getLogProperties} from '../../util/splitStuff';
import {logsById, splitsById} from '../../../stories/Split';


it('maps if all data present', () => {
  const data = getLogProperties(splitsById, logsById)(1);
  expect(data).toEqual({'maxEventsInLog': 1, 'traceAttributes': []});

  const data2 = getLogProperties(splitsById, logsById)(2);
  expect(data2).toEqual({'maxEventsInLog': 123, 'traceAttributes': []});
});

it('default if no splits', () => {
  const data = getLogProperties({}, logsById)(1);
  expect(data).toEqual({'maxEventsInLog': 0, 'traceAttributes': []});
});

it('default if no logs', () => {
  const data = getLogProperties(splitsById, {})(1);
  expect(data).toEqual({'maxEventsInLog': 0, 'traceAttributes': []});
});
