import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const FileContainer = styled.div`
  width: 300px;
  height: 300px;
  border: 2px black dashed;
  border-radius: 8%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled(motion.div)<{ url: string }>`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-image: ${({ url }) => `url(${url})`};
  background-position: center center;
  background-size: cover;
  &:hover {
    box-shadow:
      inset 0px 30px rgb(0, 0, 0, 0.4),
      inset 0px -30px rgb(0, 0, 0, 0.4);
    transition: box-shadow 0.3s ease-in-out;
  }
`;

export default function MyDropzone() {
  const [file, setFile] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: () => {
      alert('Please upload pictures');
    },
    accept: {
      'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
    },
  });

  return file ? (
    <Image
      url={file}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: 'spring',
          damping: 5,
          stiffness: 100,
          restDelta: 0.001,
        },
      }}
    />
  ) : (
    <FileContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>{"Drag 'n' drop some files here, or click to select files"}</p>
      )}
    </FileContainer>
  );
}
