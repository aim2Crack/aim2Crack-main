import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef } from 'react';

// Custom image handler for Quill
const QuillEditor = ({ value, onChange }) => {
  const quillRef = useRef(null);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['font', 'size'],
        ['bold', 'italic'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'], // Include the 'image' button in the toolbar
        ['clean'],
      ],
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
