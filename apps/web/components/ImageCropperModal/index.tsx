"use client";

import React, { useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { Button, Modal } from "ui";
import getCroppedImg from "./getCroppedImg";
import { CropperImage, CropperWrapper } from "./ImageCropper.styled";
import { useToast } from "ui";
interface CropperModalProps {
  closeModal: () => void;
  setCroppedImage: (crop: string) => void;
  selectedImage: string;
}

const ImageCropperModal = ({
  closeModal,
  selectedImage,
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

  const handleSubmit = async () => {
    //setCroppedImage to component that renders cropped image
    const data = await getCroppedImg(selectedImage, croppedAreaPixels);

    //maybe toast
    if (!data)
      return showToast({
        variant: "confirm",
        message: "Error cropping Image, try again.",
      });
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
            image={selectedImage}
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
