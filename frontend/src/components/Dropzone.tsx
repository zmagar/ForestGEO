import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { parse, ParseConfig } from 'papaparse';
import Box from '@mui/material/Box';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Typography } from '@mui/material';
import { Stack } from '@mui/material';

export interface DropzonePureProps {
  isDragActive: boolean;
  getRootProps: any;
  getInputProps: any;
}

export function DropzonePure({
  getRootProps,
  getInputProps,
  isDragActive,
}: DropzonePureProps) {
  return (
    <Box
      component={Stack}
      direction="column"
      justifyContent="center"
      sx={{
        width: 700,
        height: 400,
        backgroundColor: '#E2EAE6',
        m: 'auto',
        mt: 8,
        border: '3px dashed',
        borderColor: 'primary.main',
      }}
      {...getRootProps()}
    >
      <Typography align="center">
        {' '}
        <FileUploadIcon color="primary" sx={{ fontSize: 80 }} />{' '}
      </Typography>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography color="primary" align="center">
          Drop file here...
        </Typography>
      ) : (
        <Typography color="primary" align="center">
          <b>Choose a CSV file</b> or drag it here.
        </Typography>
      )}
    </Box>
  );
}

export default function Dropzone() {
  // @ts-ignore
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      if (file.type !== 'text/csv') {
        // Not the right type of file, so we skip it for now.
        alert(
          'Only .csv files are supported. Uploaded file is called:' +
            file.name +
            ':'
        );
        // Skip this file
        return;
      }

      const reader = new FileReader();

      reader.onabort = () => alert('file reading was aborted');
      reader.onerror = () => alert('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result as string;
        console.log(binaryStr);
        console.log(parse(binaryStr));
        const config: ParseConfig = { delimiter: ',' };
        const results = parse(binaryStr, config);

        console.log(JSON.stringify(results.data));

        if (results.errors.length) {
          alert(
            `Error on row: ${results.errors[0].row}. ${results.errors[0].message}`
          );
          // Only print the first error for now to avoid dialog clog
        }
      };
      reader.readAsText(file);
    });
    // Do something with the files
    // console.log('acceptedFiles', acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <DropzonePure
      isDragActive={isDragActive}
      getRootProps={getRootProps}
      getInputProps={getInputProps}
    />
  );
}
