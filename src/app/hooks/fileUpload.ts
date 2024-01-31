import { useRef, useState, ChangeEvent } from 'react';

type FileHookResult = {
  fileInputRef: React.RefObject<HTMLInputElement>;
  selectedFile: File | null;
  handleFileChange: () => void;
};

type ImageHookResult = {
  imageFileInputRef: React.RefObject<HTMLInputElement>;
  selectedImage: string | null;
  handleImageClick: () => void;
  handleImageFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const useFileUpload = (): FileHookResult => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = () => {
    const file: File | undefined = fileInputRef.current?.files?.[0];

    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please select a PDF file.');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return { fileInputRef, selectedFile, handleFileChange };
};

const useImageUpload = (): ImageHookResult => {
  const imageFileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = () => {
    imageFileInputRef.current?.click();
  };

  const handleImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
    }
  };

  return { imageFileInputRef, selectedImage, handleImageClick, handleImageFileChange };
};

export { useFileUpload, useImageUpload };
