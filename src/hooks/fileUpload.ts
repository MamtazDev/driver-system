import { RefObject, useRef, ChangeEvent } from 'react';

interface ImageHookResult {
  imageFileInputRef: RefObject<HTMLInputElement>;
  selectedImage: string | null;
  selectedFiles: FileList | null;
  handleImageClick: () => void;
  handleImageFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const useImageUpload = (): ImageHookResult => {
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

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
    selectedFiles,
  };
};

export { useImageUpload };
  function useState<T>(arg0: null): [any, any] {
    throw new Error('Function not implemented.');
  }

