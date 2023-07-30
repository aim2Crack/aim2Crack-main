// customUploadAdapter.js
class CustomUploadAdapter {
    constructor(loader, uploadUrl) {
      this.loader = loader;
      this.uploadUrl = uploadUrl;
    }
  
    upload() {
      return this.loader.file.then((file) => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append('file', file);
  
          fetch(this.uploadUrl, {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              resolve({
                default: data.path, // Adjust the response key based on your server's response
              });
            })
            .catch((error) => {
              reject(error);
            });
        });
      });
    }
  
    abort() {
      // Abort the upload process if needed
    }
  }
  
  export default CustomUploadAdapter;
  