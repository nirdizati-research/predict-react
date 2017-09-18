export default (url, method, data, onSuccess, onFailure) => {
  const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      let response;
      try {
        response = JSON.parse(request.responseText);
      } catch (error) {
        response = {error: 'Unknown error'};
      }

      if (request.status >= 200 && request.status < 300) {
        onSuccess(response);
      } else {
        onFailure(response);
      }
    }
  };
  request.open(method, url, true);
  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  request.send(JSON.stringify(data));
};
