/**
 * Created by Tõnis Kasekamp on 18.12.2017.
 */
import {
  CLASSIFICATION,
  LABELLING,
  REGRESSION,
  TIME_SERIES_PREDICTION
} from '../reference';

export const modelsToString = models => {
  return models.map(model => {
    return {value: model.id, label: modelToString(model)};
  });
};

export const modelToString = model => {
  let label;
  label = `Model #${model.id},
    ${model.config.split.type},
    ${model.config.encoding.method}, 
    ${model.config.predictive_model['prediction_method']}`;
  return label;
};

export const jobToValidationTable = job => {
  if (
    job.type === LABELLING ||
    job.config.predictive_model.predictive_model === REGRESSION ||
    job.config.predictive_model.predictive_model === CLASSIFICATION ||
    job.config.predictive_model.predictive_model === TIME_SERIES_PREDICTION
  ) {
    return {
      id: job.id,
      type: job.type,
      encodingMethod: job.config.encoding.value_encoding,
      encoding: job.config.encoding,
      features: job.config.encoding.features,
      clustering:
        job.config.clustering !== null &&
        job.config.clustering.clustering_method,
      method:
        job.config.predictive_model !== null &&
        job.config.predictive_model.prediction_method,
      prefix_length: job.config.encoding.prefix_length,
      padding: job.config.encoding.padding,
      generationType: job.config.encoding.task_generation_type,
      hyperopt: job.config.hyperparameter_optimizer,
      labelling: job.config.labelling,
      clustering_hyperparameters: job.config.clustering,
      predictive_model_hyperparameters: job.config.predictive_model
    };
  } else {
    return {
      id: job.id,
      encoding: job.config.encoding,
      labelling: job.config.labelling,
      result: job.config.evaluation
    };
  }
};

export const toRun = job => {
  return (
    `${job.config.predictive_model.prediction_method}_` +
    `${job.config.encoding.value_encoding}_${job.config.clustering.clustering_method}`
  );
};

const toLineObject = (job, metricName) => {
  const metric = job.config.evaluation[metricName];
  return {
    run: toRun(job),
    prefix_length: job.config.encoding.prefix_length,
    metric
  };
};

const uniqEs6 = arrArg => {
  return arrArg.filter((elem, pos, arr) => {
    return arr.indexOf(elem) === pos;
  });
};

const uniqueJobRuns = lineObjects => {
  const runs = lineObjects.map(ob => ob.run);
  return uniqEs6(runs);
};

const uniquePrefixes = lineObjects => {
  const runs = lineObjects.map(ob => ob.prefix_length);
  return uniqEs6(runs);
};

const makeEmptyPrefixRows = (uniqPrefs, columnSize) => {
  return uniqPrefs.map(u => [
    u,
    ...Array.from({length: columnSize}, _ => null)
  ]);
};

const compareByPrefix = (a, b) => {
  if (a.prefix_length > b.prefix_length) {
    return -1;
  }
  if (a.prefix_length < b.prefix_length) {
    return 1;
  }
  return 0;
};

const getAverage = (radarChartObject, columnNamePosition) => {
    let sum = 0;
    radarChartObject.map(val => {
      if (
        val[columnNamePosition] === null ||
        typeof val[columnNamePosition] === 'undefined'
      ) {
        sum += 0;
        return 0;
      } else {
        sum += val[columnNamePosition];
        return val[columnNamePosition];
      }
    });
    return sum / (radarChartObject.length * 1.0);
  };

const getValueForColumnName = (radarChartObject, prefixLengthValue, columnNamePosition) => {
    let j = 0;
    let value = 0;
    for (j = 0; j < radarChartObject.length; j++) {
      const val = radarChartObject[j];
      if (val[0] == prefixLengthValue) {
        if (
          val[columnNamePosition] === null ||
          typeof val[columnNamePosition] === 'undefined'
        ) {
          value = 0;
          } else {
          value = val[columnNamePosition];
          }
        break;
      }
    }
    return value;
  };

export const makeTable = (jobs, metricName) => {
  const lineObjects = jobs.map(job => toLineObject(job, metricName));
  lineObjects.sort(compareByPrefix);
  const uniqueRuns = uniqueJobRuns(lineObjects);
  const header = ['Prefix length', ...uniqueRuns];
  const uniquePrefs = uniquePrefixes(lineObjects);
  const prefixRows = makeEmptyPrefixRows(uniquePrefs, uniqueRuns.length);
  // empty shell ready
  let dataTable = [header, ...prefixRows];

  for (let ob of lineObjects) {
    const column = dataTable[0].findIndex(el => el === ob.run);
    const row = uniquePrefs.findIndex(el => el === ob.prefix_length) + 1;
    dataTable[row][column] = ob.metric;
  }
  return dataTable;
};

export const makeLabels = jobs => {
  if (jobs.length === 0) {
    return [];
  }
  return Object.keys(jobs[0].config.evaluation).map(metric => {
    return {label: metric, value: metric};
  });
};

export const getPrefixLengthValues = rows => {
  return rows.map(row => {
    return row[0].toString();
  });
};

export const getColumnNames = data => {
  const columns = data[0].map(label => {
    return label;
  });
  return columns;
};

export const getAllPrefixValuesAllConfig = (jobs, metricNames) => {
  return metricNames.map(metricName => {
    const data = makeTable(jobs, metricName);
    const [, ...rows] = data;
    return rows;
  });
};

export const getRadarChartValuesForSingleColumn = (
  radarCharLabels,
  radarChartObjects,
  prefixLengthValue,
  columnNamePosition,
  columnName
) => {
  let i;
  let radarChartDatas = [];
  for (i = 0; i < radarCharLabels.length; i++) {
    const radarChartObject = radarChartObjects[i];
    if (isNaN(Number(prefixLengthValue))) {
      radarChartDatas.push(getAverage(radarChartObject, columnNamePosition));
    } else {
      radarChartDatas.push(
        getValueForColumnName(
          radarChartObject,
          prefixLengthValue,
          columnNamePosition
        )
      );
    }
  }

  return [{name: columnName, data: radarChartDatas}];
};

export const getRadarChartValuesForAllColumns = (
  radarCharLabels,
  radarChartObjects,
  prefixLengthValue,
  columnNames
) => {
  let i;
  let j;
  let allValues =[];
  for (j = 0; j < columnNames.length; j++) {
    if (columnNames[j] != 'All') {
      let radarChartDatas = [];
      for (i = 0; i < radarCharLabels.length; i++) {
        const radarChartObject = radarChartObjects[i];
        if (isNaN(Number(prefixLengthValue))) {
          radarChartDatas.push(getAverage(radarChartObject, j + 1));
        } else {
          radarChartDatas.push(
            getValueForColumnName(
              radarChartObject,
              prefixLengthValue,
              j + 1
            )
          );
        }
      }
      allValues.push({name: columnNames[j], data: radarChartDatas});
    }
}

  return allValues;
};


export const getTraceIdsFromLogs = (logs, trainLogId) => {
  let logKeys = Object.keys(logs);
  let traceIds = [];

  logKeys.forEach(function (logKey) {
    let log = logs[logKey];
    if (log.id == trainLogId) {
        traceIds = traceIds.concat(log.properties.trace_IDs);
    }
  });
  return traceIds;
};

export const parseLimeResult = (limeValueList, traceId, prefix) => {
  let labels = [];
  let values = [];

  if (limeValueList[traceId] != null && limeValueList[traceId] != undefined && prefix.length != 0) {
    limeValueList = limeValueList[traceId][prefix];

    Object.keys(limeValueList).forEach(function (k) {
          labels.push(k + '= '+ [limeValueList[k].value != '' ? limeValueList[k].value : 0]);
          values.push(limeValueList[k].importance);
    });
  }
  return ({labels: labels, values: values});
};

export const parseShapResult = (shapValueList, traceId) => {
  let labels = [];
  let values = [];

  if (shapValueList[traceId] != null && shapValueList[traceId] != undefined) {
    shapValueList = shapValueList[traceId];
    let keys = Object.keys(shapValueList);

    if (keys != null) {
      for (let j = 0; j < keys.length; j++) {
        if (shapValueList[keys[j]].length == 2) {
          labels.push(shapValueList[keys[j]][0]);
          values.push(shapValueList[keys[j]][1]);
        }
      }
    }
  }
  return ({labels: labels, values: values});
};

export const parseICEResult = (iceResult) => {
  let labels = [];
  let values = [];
  let count = [];
    for (let j = 0; j < iceResult.length; j++) {
        labels.push(iceResult[j].label);
        if (isNaN(parseFloat(iceResult[j].value))) values.push(iceResult[j].value);
        else values.push(iceResult[j].value).toFixed(2);

        count.push(iceResult[j].count | 0);
    }
  return ({labels: labels, values: values, count: count});
};

export const parseFairMLResult = (iceResult) => {
  let labels = [];
  let values = [];
  let count = [];
    for (let j = 0; j < iceResult.length; j++) {
        labels.push(iceResult[j].label);
        values.push(iceResult[j].value).toFixed(2);
        count.push(iceResult[j].count | 0);
    }
  return ({labels: labels, values: values, count: count});
};

export const parseTemporalStabilityLimeShapResultList = (predictionList, traceId) => {
  let data = [[]];
  let prefixs = [];

  if (predictionList[traceId] != null || predictionList[traceId] != undefined) {
    const traceAttr = predictionList[traceId];
    prefixs = Object.keys(traceAttr);
    data.pop();
    for (let j = 0; j < prefixs.length; j++) {
      const prefixValues = traceAttr[prefixs[j]];
      for (let k = 0; k <= Object.keys(prefixValues).length-1; k++) {
        const value = prefixValues[Object.keys(prefixValues)[k]];
      if (j == 0) data.push({name: (Object.keys(prefixValues)[k]), data: []});
      data[k]['data'].push(value['importance']);
      }
    }
  }
    return ({data: data, categories: prefixs});
  };

export const parseTemporalStabilityPredictionResultList = (predictionList, traceId) => {
  let predictions = [];
  let prefixs = [];
  if (predictionList[traceId] != null || predictionList[traceId] != undefined) {
    const traceAttr = predictionList[traceId];
    prefixs = Object.keys(traceAttr);
    for (let j = 0; j < prefixs.length; j++) {
      const prediction = traceAttr[prefixs[j]]['predicted'];
      if (prediction == 'true') {
        predictions.push(2);
      } else predictions.push(1);
    }
  }

  return predictions;
};

export const getTraceAttributes = (traceList, selectedTrace) =>{
  let i = 0;
  if (traceList === undefined) {
    traceList = [];
  }
  let traceAttributesHeader = getTraceAttributesHeader(traceList);
  let traceEventsHeaders = getTraceEventsHeader(traceList);
  let traceArr = {'attributes': [], 'events': []};
  for (i = 0; i < traceList.length; i++) {
    if (traceList[i]['attributes']['concept:name'] == selectedTrace) {
      let attrValues = [];
      let traceEvents = [];
      let events = [];
      traceAttributesHeader.map((key) => {
        attrValues.push(traceList[i]['attributes'][key]);
      });
      traceList[i]['events'].map((event) => {
        events = [];
        traceEventsHeaders.map((key) => {
          events.push(event[key]);
        });
        traceEvents.push(events);
      });
      traceArr = {'attributes': attrValues, 'events': traceEvents};
      break;
    }
  }

  return {traceArr: traceArr, traceAttributesHeader: traceAttributesHeader, traceEventsHeaders: traceEventsHeaders};
};

const getTraceAttributesHeader = (traceList) =>{
  let i = 0;
  let traceAttributesHeader = [];
  for (i = 0; i < traceList.length; i++) {
    traceAttributesHeader = Object.keys(traceList[0]['attributes']);
    break;
  }
  return traceAttributesHeader;
};


const getTraceEventsHeader = (traceList) =>{
  let i = 0;
  let traceEventsHeaders = [];
  for (i = 0; i < traceList.length; i++) {
    traceEventsHeaders = Object.keys(traceList[0]['events'][0]);
    break;
  }
  return traceEventsHeaders;
};


export const getIceResultListTable = (iceResultList) =>{
  let i = 0;
  let result = [];
  for (i = 0; i < iceResultList.length; i++) {
    let arr = [];
    arr.push(iceResultList[i]['label']);
    arr.push(iceResultList[i]['value']);
    arr.push(iceResultList[i]['count']);
    result.push(arr);
  }

  return result;
};

export const getDecodedDFTable = (dfResult) =>{
  let i = 0;
  let j = 0;
  let result = [];
  let keys = Object.keys(dfResult);
  if (keys.length > 0) {
    for (j = 0; j < dfResult[keys[0]].length; j++) {
      let arr = [];
      arr.push(j+1);

      for (i = 0; i < keys.length; i++) {
          arr.push(dfResult[keys[i]][j]);
        }
        result.push(arr);
    }
    keys = ['id'].concat(keys);
}
  return {data: result, headers: keys};
};

export const getFeatureNames = (dfResult) =>{
  let keys = Object.keys(dfResult);
  return keys;
};

export const getUniqueFeatureValues = (dfResult) =>{
  let i = 0;
  let j = 0;
  let encodedResult = {};
  let decodedResult = {};
  let keys = Object.keys(dfResult);
  if (keys.length>0) {
    for (i = 0; i < keys.length; i++) {
      let arr = [];
      let key = keys[i];
      let decodedKeys = Object.keys(dfResult[key]);
      for (j = 0; j < decodedKeys.length; j++) {
        arr.push(dfResult[key][decodedKeys[j]]);
    }
    encodedResult[key] = arr;
    decodedResult[key] = decodedKeys;
    }
  }

  return {'encodedResult': encodedResult, 'decodedResult': decodedResult};
};

export const parseCfFeedbackResult = (result) =>{
  if (JSON.stringify(result) != '{}') {
    let keys = Object.keys(result['freq_seqs_after_filter']);
    if (keys.length>0) {
      return {'tp': result['freq_seqs_after_filter']['tp'], 'tn': result['freq_seqs_after_filter']['tn'],
        'fp': result['freq_seqs_after_filter']['fp'], 'fn': result['freq_seqs_after_filter']['fn']};
    }
  }
  return {'tp': '', 'tn': '', 'fp': '', 'fn': ''};
};

export const getUniquePatterns = (result) =>{
  let resultArray = new Set();
  let i = 0;
  let j = 0;
  let k = 0;
  if (result == null) return [];
  else {
    let keys = Object.keys(result['freq_seqs_after_filter']);
    for (i = 0; i < keys.length; i++) {
      if (result['freq_seqs_after_filter'][keys[i]].length > 0 ) {
        for (j = 0; j < result['freq_seqs_after_filter'][keys[i]].length; j++) {
          let patterns = '';
          for (k = 0; k < result['freq_seqs_after_filter'][keys[i]][j][0].length; k++) {
            if (k < result['freq_seqs_after_filter'][keys[i]][j][0].length-1) {
              patterns += result['freq_seqs_after_filter'][keys[i]][j][0][k] + '; ';
            } else {
              patterns += result['freq_seqs_after_filter'][keys[i]][j][0][k];
            }
          }
          resultArray = resultArray.add(patterns);
        }
      }
    }
  }
  return Array.from(resultArray);
};

export const getPatternsForMatrix = (result, matrixName) =>{
  let resultArray = [];
  let i = 0;
  let j = 0;
  let k = 0;
  if (JSON.stringify(result) != '{}' && result != null) {
    const uniquePatterns = encodePatternsForDropdown(result);
    if (matrixName == 'All') {
      let keys = Object.keys(result['freq_seqs_after_filter']);
      for (i = 0; i < keys.length; i++) {
        if (result['freq_seqs_after_filter'][keys[i]].length>0 ) {
          for (j = 0; j < result['freq_seqs_after_filter'][keys[i]].length; j++) {
            let arr = [];
            let patterns = '';
            arr.push(getConfusionMatrixName(keys[i]));
            for (k = 0; k < result['freq_seqs_after_filter'][keys[i]][j][0].length; k++) {
              if (k < result['freq_seqs_after_filter'][keys[i]][j][0].length-1) {
                patterns += result['freq_seqs_after_filter'][keys[i]][j][0][k] + '; ';
              } else {
                patterns += result['freq_seqs_after_filter'][keys[i]][j][0][k];
                }
             }
             uniquePatterns.forEach(element => {
              let split = element.split(':');
               if (element.split(split[0]+':')[1]==patterns) {
                  arr.push(element);
                }
             });
              arr.push(result['freq_seqs_after_filter'][keys[i]][j][1]);
              resultArray.push(arr);
            }
          }
      }
    } else {
      matrixName = getAbrebiationConfusionMatrixName(matrixName);
      if (result['freq_seqs_after_filter'][matrixName].length > 0 ) {
        for (j = 0; j < result['freq_seqs_after_filter'][matrixName].length; j++) {
          let arr = [];
          arr.push(getConfusionMatrixName(matrixName));
          let patterns = '';
          for (k = 0; k < result['freq_seqs_after_filter'][matrixName][j][0].length; k++) {
             if (k < result['freq_seqs_after_filter'][matrixName][j][0].length-1) {
              patterns += result['freq_seqs_after_filter'][matrixName][j][0][k] + '; ';
            } else {
              patterns += result['freq_seqs_after_filter'][matrixName][j][0][k];
            }
          }
          uniquePatterns.forEach(element => {
            if (element==patterns) {
               arr.push(patterns);
             }
          });
          arr.push(result['freq_seqs_after_filter'][matrixName][j][1]);
          resultArray.push(arr);
        }
      }
    }
  }
  return resultArray;
};

const getConfusionMatrixName = (key) => {
  if (key == 'tp') return 'True Positive';
  if (key == 'tn') return 'True Negative';
  if (key == 'fp') return 'False Positive';
  if (key == 'fn') return 'False Negative';
  return null;
};

const getAbrebiationConfusionMatrixName = (key) => {
  if (key == 'True Positive') return 'tp';
  if (key == 'True Negative') return 'tn';
  if (key == 'False Positive') return 'fp';
  if (key == 'False Negative') return 'fn';
  if (key == 'All') return 'All';
  return null;
};

export const encodePatternsForDropdown = (result) =>{
  let resultArray = [];
  if (JSON.stringify(result) != '{}') {
    const uniquePatterns = getUniquePatterns(result);
    let i = 0;
    for (i = 0; i < uniquePatterns.length; i++) {
      resultArray.push('Pattern_'+i+':'+uniquePatterns[i]);
    }
  }
  return resultArray;
};

export const getConfusionMatrixLabels = (result) =>{
  if (JSON.stringify(result) != '{}' && result != null) {
    let labels = [];
    let keys = Object.keys(result['freq_seqs_after_filter']);
    keys.forEach(element => {
      labels.push(getConfusionMatrixName(element));
    });
    if (labels.length>0) return ['All'].concat(labels);
  }
  return [];
};

export const decodePatterns = (length, encodedPatternList) =>{
  let i = 0;
  let resultArray = [];
  for (i = 0; i<encodedPatternList.length; i ++) {
    const lst = encodedPatternList[i].split(':');
    if (lst.length >= 2) {
      resultArray.push(encodedPatternList[i].split(lst[0])[1]);
    }
  }
  return resultArray;
};

export const getFeatureNamesAndValueFromSelectedPatterns = (decodedSelectedPatterns, featureNames, featureValues) =>{
  let i = 0;
  let j = 0;
  let k = 0;
  let resultArray = [];
  for (i = 0; i < decodedSelectedPatterns.length; i++) {
    let targets = [];
    let splits = decodedSelectedPatterns[i].split('; ');
    splits.forEach(element => {
      A: {
      for (j = 0; j < featureNames.length; j++) {
          if (element.includes(featureNames[j])) {
            for (k = 0; k < featureValues['decodedResult'][featureNames[j]].length; k++) {
              if (element.includes(featureValues['decodedResult'][featureNames[j]][k])) {
                let arr = [];
                arr.push(featureNames[j]);
                arr.push(featureValues['encodedResult'][featureNames[j]][k]);
                targets.push(arr);
                break A;
              }
            }
          }
        }
      }
    });
   resultArray.push(targets);
  }
  return resultArray;
};
