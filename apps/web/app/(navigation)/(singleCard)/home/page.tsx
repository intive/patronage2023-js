"use client";
import ImageCropperModal from "components/ImageCropperModal";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploaderAndCropper: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState("");
  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <>
      <div>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the image here...</p>
          ) : (
            <p>Drag and drop an image here, or click to select an image</p>
          )}
        </div>
      </div>

      {selectedImage && (
        <ImageCropperModal
          closeModal={() => setSelectedImage(null)}
          selectedImage={selectedImage}
          setCroppedImage={setCroppedImage}
        />
      )}
      {croppedImage && (
        <img
          src={croppedImage}
          alt="blob"
          style={{
            borderRadius: "100%",
            height: 64,
            width: 64,
          }}
        />
      )}
    </>
  );
};

export default ImageUploaderAndCropper;
