import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './ckeditor.css';
// import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import CustomUploadAdapter from './customUploadAdapter'; // Adjust the path to the customUploadAdapter.js if needed

function MyckEditor({ data, onChange, placeholder }) {
  const [editorData, setEditorData] = useState(data);

  useEffect(() => {
    setEditorData(data);
  }, [data]);

  const handleEditorChange = (event, editor) => {
    const content = editor.getData();
    setEditorData(content);
    onChange(content);
  };

  const editorConfig = {
    debug: true,
  
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      'numberedList',
      'bulletedList',
      '|',
      'outdent',
      'indent',
      '|',
      'link', // Include the unlink button to remove existing links
      '|',
      'blockQuote',
      'imageUpload',
      'mediaEmbed',
      '|',
      'undo',
      'redo',
    ],
  
    image: {
      toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight'],
      styles: ['full', 'alignLeft', 'alignRight'],
      resizeOptions: [],
      upload: {
        uploadUrl: 'http://127.0.0.1:7000/upload', // Replace with the correct upload URL
        adapter: CustomUploadAdapter,
      },
    },
  
    link: {
      addTargetToExternalLinks: true, // Open external links in a new tab by default
    },
      
    placeholder: placeholder,
  };
  
  return (
    <div style={{ width: '80%', maxWidth: '800px', margin: 'auto' }}>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        config={editorConfig}
        onChange={handleEditorChange}
      />
    </div>
  );
}

export default MyckEditor;
