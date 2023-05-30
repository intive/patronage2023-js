"use client";
import ImageCropperModal from "components/ImageCropperModal";
import React, { useCallback, useState } from "react";
import StyledDropzone from "components/Dropzone";

const ImageUploaderAndCropper: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState("");
  const [modal, setModal] = useState(false);
  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setModal(true);
      setImageSrc(reader.result as string);
    };

    reader.readAsDataURL(file);
  }, []);
  console.log(croppedImage);
  return (
    <>
      <StyledDropzone handleDrop={handleDrop} />
      {imageSrc && modal && (
        <ImageCropperModal
          closeModal={() => setModal(false)}
          imageSrc={imageSrc}
          setCroppedImage={setCroppedImage}
        />
      )}
      {croppedImage && (
        <img
          src={croppedImage}
          alt="blob"
          style={{
            borderRadius: "100%",
            height: 128,
            width: 128,
          }}
        />
      )}
    </>
  );
};

export default ImageUploaderAndCropper;
