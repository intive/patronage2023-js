"use client";

import React, { useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { Button, Modal } from "ui";
import getCroppedImg from "./getCroppedImg";
import { CropperImage, CropperWrapper } from "./ImageCropper.styled";
import { useToast } from "ui";
import { useUploadThing } from "lib/hooks/useUploadthing";
interface CropperModalProps {
  closeModal: () => void;
  setCroppedImage: (crop: string) => void;
  imageSrc: string;
}

const ImageCropperModal = ({
  closeModal,
  imageSrc,
  setCroppedImage,
}: CropperModalProps) => {
  const showToast = useToast();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const { startUpload } = useUploadThing({
    endpoint: "imageUploader",
    onUploadError: (err) => console.error(err),
  });
  const handleSubmit = async () => {
    //setCroppedImage to component that renders cropped image
    const data = getCroppedImg(imageSrc, croppedAreaPixels);

    if (!data)
      return showToast({
        variant: "error",
        message: "Error cropping Image, try again.",
      });
    //create Blob and set it as file then pass to startUpload from uploadthing
    const Blob = await fetch(data)
      .then((r) => r.blob())
      .then(
        (blobFile) =>
          new File([blobFile], "SomeRandomURLGeneratorNeeded.jpg", {
            type: "image/jpg",
          })
      );
    startUpload([Blob]);
    setCroppedImage(data);
    closeModal();
  };

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );
  return (
    <Modal header="Crop your image before submitting." onClose={closeModal}>
      <CropperWrapper>
        <CropperImage>
          <Cropper
            image={imageSrc}
            objectFit="auto-cover"
            crop={crop}
            zoom={zoom}
            cropShape="round"
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </CropperImage>
        <Button onClick={handleSubmit}>Submit</Button>
      </CropperWrapper>
    </Modal>
  );
};

export default ImageCropperModal;
