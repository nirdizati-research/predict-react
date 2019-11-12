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
} else value = val[columnNamePosition];
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

  export const getRowValues = rows => {
    let x = 1;
    return rows.map(row => {
      while (row[row.length - x] == null) x = x + 1;
      return row[row.length - x];
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

  export const getRadarChartValues = (
    radarCharLabels,
    radarChartObjects,
    prefixLengthValue,
    columnNamePosition
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

    return radarChartDatas;
  };
