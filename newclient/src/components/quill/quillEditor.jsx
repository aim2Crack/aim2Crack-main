import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef } from 'react';

// Custom image handler for Quill
function imageHandler(quillRef) {
  // const quillRef = useRef(null);

  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();
  input.onchange = async () => {
    const file = input.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://127.0.0.1:7000/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const responseData = await response.json();
      const serverUrl = 'http://127.0.0.1:7000/upload'; // Your server URL
      const imageUrl = new URL(responseData.path, serverUrl).href;
      console.log (imageUrl)
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection(true);
      editor.insertEmbed(range.index, 'image', imageUrl);
    } else {
      console.error('Image upload failed:', response.status);
    }
  }
}

const QuillEditor = ({ value, onChange }) => {
  const quillRef = useRef(null);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'], // Include the 'image' button in the toolbar
        ['clean'],
      ],
      // handlers: {
      //   image: () => imageHandler(quillRef),// Handle image uploads
      // },
    },
  };

  return (
    <ReactQuill
      ref={quillRef}
      value={value}
      onChange={onChange}
      modules={modules}
      theme="snow"
    />
  );
};

export default QuillEditor;
