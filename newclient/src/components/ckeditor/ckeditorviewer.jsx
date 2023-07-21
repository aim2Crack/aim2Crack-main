import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function CKEditorViewer({ editorData }) {
  const editorConfig = {
    toolbar: false, // Hide the toolbar
  };

  return (
    <div>
      <CKEditor editor={ClassicEditor} data={editorData} config={editorConfig} disabled />
    </div>
  );
}

export default CKEditorViewer;
