// customUploadAdapter.js

export default class CustomUploadAdapter {
  constructor(loader) {
    // CKEditor 5's FileLoader instance.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then((file) => new Promise((resolve, reject) => {
      this._initRequest();
      this._initListeners(resolve, reject, file);
      this._sendRequest(file);
    }));
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Initializes the XMLHttpRequest object to send the file.
  _initRequest() {
    const xhr = this.xhr = new XMLHttpRequest();

    // Set the URL to your server-side image upload endpoint.
    xhr.open('POST', 'http://18.232.60.24:7000/upload', true);

    // Set any necessary headers for your server (e.g., authorization headers).

    // Set the response type to JSON (optional, based on your server's response format).
    xhr.responseType = 'json';
  }

  // Initializes XMLHttpRequest event listeners.
  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = 'Couldn\'t upload file: ' + file.name + '.';

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;

      // Check for a successful response from your server.
      if (!response || response.error) {
        return reject(response && response.error ? response.error.message : genericErrorText);
      }

      // Resolves the uploaded file's URL.
      resolve({
        default: response.url // Replace 'url' with the key containing the file URL returned by your server.
      });
    });

    // Optional: Include any progress event listeners if you want to track the upload progress.
    // xhr.upload.addEventListener('progress', ...);
  }

  // Sends the request to the server with the file data.
  _sendRequest(file) {
    const data = new FormData();
    data.append('file', file);

    this.xhr.send(data);
  }
}
