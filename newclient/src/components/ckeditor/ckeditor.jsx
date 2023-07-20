import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'numberedList',
      'bulletedList',
      '|',
      'outdent',
      'indent',
      '|',
      'link',
      'unlink',
      '|',
      'blockQuote',
      'imageUpload',
      'mediaEmbed',
      '|',
      'undo',
      'redo',
    ],
    placeholder: placeholder, // Add the placeholder here
    height: '700px',
    image: {
      // Upload URL for image files (replace with your server endpoint)
      uploadUrl: '/api/upload-image',
  
      // Resize options for images
      resizeUnit: 'px',
      resizeOptions: [
        {
          name: 'imageResize:original',
          value: null,
          icon: 'original',
          title: 'Original Size',
        },
        {
          name: 'imageResize:50',
          value: '50',
          icon: 'medium',
          title: 'Medium (50%)',
        },
      ],
  
      // Resize type: maintain aspect ratio
      resizeType: 'imageResize:ratio',
  
      // Custom styles for images
      styles: [
        {
          name: 'alignLeft',
          icon: 'left',
          title: 'Align left',
          class: 'image-align-left',
        },
        {
          name: 'alignCenter',
          icon: 'center',
          title: 'Align center',
          class: 'image-align-center',
        },
      ],
    },
  };
  return (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        config={editorConfig} // Provide the editorConfig in the config prop
        onChange={handleEditorChange}
      />
    </div>
  );
}

export default MyckEditor;
