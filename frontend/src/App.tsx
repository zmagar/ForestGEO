import React from 'react';
import Dropzone from './components/Dropzone';
import Navbar from './components/Navbar';
import FileList from './components/FileList';
import { FileWithPath } from 'react-dropzone';

function App() {
  const [acceptedFiles, setAcceptedFiles] = React.useState<FileWithPath[]>([]);

  return (
    <>
      <Navbar />
      <Dropzone onChange={setAcceptedFiles} />
      <FileList acceptedFiles={acceptedFiles} />
    </>
  );
}

export default App;
