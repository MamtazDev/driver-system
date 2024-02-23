import { useRef, useState, ChangeEvent } from "react";

type FileHookResult = {
  fileInputRef: React.RefObject<HTMLInputElement>;
  selectedFile: File | null;
  handleFileChange: () => void;
};

interface ImageHookResult {
  imageFileInputRef: React.RefObject<HTMLInputElement | null>;
  selectedImage: string | null;
  selectedFiles: File | null; // Add the selectedFiles property
  handleImageClick: () => void;
  handleImageFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const useFileUpload = (): FileHookResult => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = () => {
    const file: File | undefined = fileInputRef.current?.files?.[0];

    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please select a PDF file.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return { fileInputRef, selectedFile, handleFileChange };
};

const useImageUpload = (): ImageHookResult => {
  const imageFileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null); // Specify the type explicitly
  const handleImageClick = () => {
    imageFileInputRef.current?.click();
  };

 
  const handleImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setSelectedFiles(files);
      const selectedFile = files[0];
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
    }
  };

  return {
    imageFileInputRef,
    selectedImage,
    handleImageClick,
    handleImageFileChange,
    selectedFiles
  };
};

export { useFileUpload, useImageUpload };
