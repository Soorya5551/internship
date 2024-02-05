import React, { useState, useEffect } from 'react';

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;

    // Map selected files to include a preview URL
    const updatedFiles = Array.from(selectedFiles).map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    // Update state with the new files
    setFiles(updatedFiles);
  };

  useEffect(() => {
    // Cleanup function to revoke preview URLs when component unmounts
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <div style={previewContainerStyle}>
        {files.map((file) => (
          <div key={file.name} style={filePreviewStyle}>
            <img src={file.preview} alt={file.name} style={imageStyle} />
            <p>{file.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const previewContainerStyle = {
  display: 'flex',
  marginTop: '20px',
};

const filePreviewStyle = {
  marginRight: '10px',
};

const imageStyle = {
  maxWidth: '100%',
  maxHeight: '100%',
  borderRadius: '4px',
};

export default FileUpload;