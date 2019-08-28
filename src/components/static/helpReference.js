/* eslint-disable max-len */
const helpReference = [
  {
    pathname: '/',
    texts: ['This is the front page of the application. It has the functionality overview and some charts.']
  },
  {
    pathname: '/upload',
    texts: ['The upload page is used for uploading a log file. The user has two options when uploading the log file: it can be either a single log file or it can be two log files, where one is a training and the other is a validation set. When uploading a single log file the user must specify how the training and validation set are generated. This is configured in the splitting phase. Uploading two log files allows the user to fine-tune the contents of the training and validation set. When uploading two log files the user can proceed to the Labelling or Training pages without creating the split.',
      'The log files can be in plain and gzip compressed XES formats. During the upload process, a record of the log file is made in the database and the log file is processed to extract the data to create the charts on the Log details page.']
  },
  {
    pathname: '/logs',
    texts: ['The page features graphs that describe a log file, i.e, the number of events executed per day, the number of resources employed per day and the number of new traces started per day.']
  },
  {
    pathname: '/split',
    texts: ['The splitting page is used to split an uploaded log file into a training and a validation set. A split is a single log file with a configuration for separating it into a training and validation set. A split can also represent a training log and validation log file, which are uploaded separately. This allows the user to reuse the same split configuration with multiple labelling and training tasks.',
      'To create a split, the user must select a log file, a split type and the training/validation set percentage. The application supports four split types: sequential order, temporal order, random order and strict temporal order.',
      'After the splits have been created, the configuration can be verified in the split page tables.'
    ]
  },
  {
    pathname: '/label',
    texts: ['Nirdizati Research uses classification methods on an event log to predict the value of a given label. Due to the amount of configuration options, the application provides a page to try out different configurations for labelling types, prefix lengths and log padding types. This allows the user to see the distribution of labels in an encoded log file before applying data mining methods.',
      'After selecting the labelling configuration and submitting the labelling task, the user is directed to the Tasks page. When the labelling task has been completed, the results can be viewed on the Labelling page.',
      'The labelling task results can be filtered by the Split, the label type, the threshold type, the attribute name and prefix lengths. All available custom thresholds are available in a dropdown menu, so the user does not have to remember the exact threshold value.',
      'Below the filtering options there is a line chart that provides a high level overview of the count of labels.',
      'Next to the line chart is a bar chart that provides a more detailed overview of the label count distribution. The "END" label in this case means the trace ends at this point, so there is no next activity.'
    ]
  },
  {
    pathname: '/training',
    texts: ['The training page is where the user creates tasks to apply machine learning methods on an event log. First the user must choose the Split that contains the training and validation set. The next choice, depending on the prediction task type, is whether to use regression to predict numeric values or classification to predict categorical values. The application also offers a choice for encoding options, clustering methods, learning methods and labelling.',
      'The application uses default parameters for each machine mining method. However, users can change the selection of these parameters or find the best configuration using hyperparameter optimization. Additional temporal and inter-case features can be added to the encoded log file.',
      'After choosing the all the required inputs, the prediction task will be visible on the Task status page.',
      'Multiple prediction tasks can be generated all together. A task will be created for each selected learning method, clustering method, encoding method and prefix length. By choosing all available options with hyperparameter optimization, the user can create all possible prediction tasks with the most suitable configuration by clicking the "Submit" button only once.'
    ]
  },
  {
    pathname: '/jobs',
    texts: ['The Task status page provides an overview of all labelling, classification and regression tasks in the server. By default, this page automatically fetches tasks from the server every 10 seconds, but automatic fetching can be turned off. All tasks can be deleted. The full configuration of each task can be seen by clicking on the task table row.']
  },
  {
    pathname: '/validation',
    texts: ['The results of the completed classification and regression tasks are visible on the Validation page. Results can be filtered by the prediction, clustering, encoding, learning algorithm, padding and labelling configurations.',
      'The page also features a table with the full configuration of each prediction task. The results are visualized in a data table, a line chart and four bubble charts.',
      'Classification task are presented with the F1 score, accuracy, AUC, precision and recall. For binary classification tasks, the true positive, true negative, false positive and false negative metrics are also presented in the table.',
      'Regression task results are presented with the MAE, RMSE and rscore metrics.'
    ]
  }

];

export const getHelpText = (pathname) => {
  const help = helpReference.find(h => h.pathname === pathname);
  return help ? help.texts : ['No help here!'];
};
