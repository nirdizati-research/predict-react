/* eslint-disable max-len */
const helpReference = [
  {
    pathname: '/',
    texts: ['This is the front page of the application. It has the functionality overview and some charts.']
  },
  {
    pathname: '/upload',
    texts: ['The upload page is used for uploading a log file. The user has two options when uploading the log file: it can be either a single log file or it can be two log files, where one is a training and the other is a test set. When uploading a single log file the user must specify how the training and test set are generated. This is configured in the splitting phase. Uploading two log files allows the user to fine-tune the contents of the training and test set. When uploading two log files the user can proceed to the Labelling or Training pages without creating the split.',
      'The log files can be in plain and gzip compressed XES and MXML formats. During the upload process, a record of the log file is made in the database and the log file is processed to extract the data to create the charts on the Log details page.']
  },
  {
    pathname: '/logs',
    texts: ['This is the front page of the application. It has the functionality overview and some charts.']
  },
  {
    pathname: '/split',
    texts: ['This is the front page of the application. It has the functionality overview and some charts.']
  },
  {
    pathname: '/label',
    texts: ['This is the front page of the application. It has the functionality overview and some charts.']
  },
  {
    pathname: '/training',
    texts: ['This is the front page of the application. It has the functionality overview and some charts.']
  },
  {
    pathname: '/jobs',
    texts: ['This is the front page of the application. It has the functionality overview and some charts.']
  },
  {
    pathname: '/validation',
    texts: ['This is the front page of the application. It has the functionality overview and some charts.']
  }

];

export const getHelpText = (pathname) => {
  const help = helpReference.find(h => h.pathname === pathname);
  return help ? help.texts : ['No help here!'];
};
