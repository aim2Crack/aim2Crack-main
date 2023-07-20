import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './ckeditor.css';
// import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';

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

  // Add the alignment plugin to the build
  // ClassicEditor.builtinPlugins = [
  //   ...ClassicEditor.builtinPlugins,
  //   Alignment,
  // ];

  const editorConfig = {
   
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      'alignment:left', // Add alignment options (left, center, right)
      'alignment:center',
      'alignment:right', // Add the alignment option to the toolbar
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
    placeholder: placeholder,
    image: {
      uploadUrl: '/api/upload-image',
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
      resizeType: 'imageResize:ratio',
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
        {
          name: 'alignRight',
          icon: 'right',
          title: 'Align right',
          class: 'image-align-right',
        },
      ],
    },
  };

  return (
    <div style={{ width: '80%', maxWidth: '800px' }}>
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
