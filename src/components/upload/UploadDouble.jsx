/* ServerUpload.jsx */
import React, {PureComponent} from 'react';
import {Button, CardActions, FileUpload, LinearProgress, Snackbar, TextField} from 'react-md';
import {SERVER_URL} from '../../constants';

const UPLOAD_ENDPOINT = '/splits/multiple';

export default class UploadDouble extends PureComponent {
  state = {
    sending: false,
    toasts: [],
    fileNameTest: '',
    fileNameTraining: '',
    progressTest: null,
    progressTraining: null,
    uploadProgress: undefined,
    fileSizeTest: 0,
    fileSizeTraining: 0,
  };

  componentWillUnmount() {
    if (this.progressTimeout) {
      clearTimeout(this.progressTimeout);
    }

    if (this.uploadProgressTimeout) {
      clearTimeout(this.uploadProgressTimeout);
    }
  }

  progressTimeout = null;
  uploadProgressTimeout = null;

  handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const testFile = data.get('testSet');
    const trainingFile = data.get('trainingSet');
    if (!testFile || !testFile.name) {
      this.addToast('A test file is required.');
      return;
    } else if (!trainingFile || !trainingFile.name) {
      this.addToast('A training file is required.');
      return;
    }

    fetch(`${SERVER_URL}${UPLOAD_ENDPOINT}`, {
      method: 'POST',
      body: data,
    }).then((response) => {
      this.setState({sending: false, uploadProgress: 0});
      if (!response.ok) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }

      return this.handleServerProgress(response.body.getReader());
    }).catch((error) => {
      this.addToast(error.message);
    });

    this.setState({sending: true});
  };

  /*
   * There is no native support for watching progress with fetch, so you can do it by getting the
   * reader from the response and looping over the results.
   */
  handleServerProgress = async (reader) => {
    const result = await reader.read();
    const chunk = result.value;

    if (result.done) {
      this.addToast(`"${this.state.fileNameTest}" and "${this.state.fileNameTraining}" successfully uploaded!`);
      this.setState({uploadProgress: 100});
      this.uploadProgressTimeout = setTimeout(() => {
        this.uploadProgressTimeout = null;
        this.setState({uploadProgress: undefined});
      }, 500);
      return null;
    }

    const bytes = chunk.byteLength;
    this.setState(({uploadProgress, fileSize}) => ({
      uploadProgress: uploadProgress + ((bytes / fileSize) * bytes),
    }));

    return this.handleServerProgress(reader);
  };


  handleTestProgress = (file, progress) => {
    this.setState({progressTest: progress});
  };

  handleTrainingProgress = (file, progress) => {
    this.setState({progressTraining: progress});
  };

  handleTrainingLoad = ({name, size}) => {
    this.progressTimeout = setTimeout(() => {
      this.progressTimeout = null;
      this.setState({progressTraining: null});
    }, 500);
    this.setState({fileNameTraining: name, fileSizeTraining: size});
  };

  handleTestLoad = ({name, size}) => {
    this.progressTimeout = setTimeout(() => {
      this.progressTimeout = null;
      this.setState({progressTest: null});
    }, 500);
    this.setState({fileNameTest: name, fileSizeTest: size});
  };

  handleTestLoadStart = () => {
    this.setState({progressTest: 0});
  };

  handleTrainingLoadStart = () => {
    this.setState({progressTraining: 0});
  };

  addToast = (text) => {
    const toasts = [{text, action: 'Ok'}];
    this.setState({toasts});
  };

  dismiss = () => {
    const [, ...toasts] = [this.state];
    this.setState({toasts});
  };

  handleReset = () => {
    this.setState({fileNameTest: '', fileNameTraining: ''});
  };

  render() {
    const {
      toasts,
      fileNameTest,
      fileNameTraining,
      progressTest,
      progressTraining,
      sending,
      uploadProgress,
    } = this.state;

    let progressBar;
    let progressTestBar;
    let progressTrainingBar;
    if (typeof progressTest === 'number') {
      progressTestBar = (
        <span className="file-inputs__upload-form__progress">
          <LinearProgress id="file-upload-status-test" value={progressTest}/>
        </span>
      );
    } else if (sending || typeof uploadProgress === 'number') {
      progressBar = (
        <span className="file-inputs__upload-form__progress">
          <LinearProgress id="file-upload-server-status" query value={uploadProgress}/>
        </span>
      );
    }
    if (typeof progressTraining === 'number') {
      progressTrainingBar = (
        <span className="file-inputs__upload-form__progress">
          <LinearProgress id="file-upload-status-training" value={progressTraining}/>
        </span>
      );
    }

    return (
      <form
        id="server-upload-form"
        ref={this.setForm}
        onSubmit={this.handleSubmit}
        onReset={this.handleReset}
        name="server-upload-form"
        className="file-inputs__upload-form"
      >
        {progressBar}
        <CardActions className="md-full-width">
          {progressTrainingBar}
          <FileUpload
            id="server-upload-training"
            label="Choose training set"
            required
            accept=".xes, .xes.gz"
            onLoad={this.handleTrainingLoad}
            onLoadStart={this.handleTrainingLoadStart}
            onProgress={this.handleTrainingProgress}
            name="trainingSet"
            className="file-inputs__upload-form__file-upload"
            primary
            iconBefore
          />
          <TextField
            id="server-upload-file-field-training"
            placeholder="No file chosen"
            value={fileNameTraining}
            className="file-inputs__upload-form__file-field"
            readOnly
            fullWidth={false}
          />
        </CardActions>
        <CardActions className="md-full-width">
          {progressTestBar}
          <FileUpload
            id="server-upload-test"
            label="Choose test set"
            required
            accept=".xes, .xes.gz"
            onLoad={this.handleTestLoad}
            onLoadStart={this.handleTestLoadStart}
            onProgress={this.handleTestProgress}
            name="testSet"
            className="file-inputs__upload-form__file-upload"
            primary
            iconBefore
          />
          <TextField
            id="server-upload-file-field-test"
            placeholder="No file chosen"
            value={fileNameTest}
            className="file-inputs__upload-form__file-field"
            readOnly
            fullWidth={false}
          />
        </CardActions>
        <CardActions className="md-full-width">
          <Button type="reset" flat className="md-cell--right">Reset</Button>
          <Button type="submit" flat primary disabled={!(fileNameTest && fileNameTraining) || sending}>Submit</Button>
        </CardActions>
        <Snackbar id="file-upload-errors" toasts={toasts} onDismiss={this.dismiss}/>
      </form>
    );
  }
}
