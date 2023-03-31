"use client";
import React from "react";
import { AvatarSelector } from "ui";
export default function AvatarSelectorDemo() {
  const [selectedAvatar, setSelectedAvatar] = React.useState<string>();

  return (
    <div
      style={{
        width: "480px",
      }}
    >
      <h3>Wybrany awatar: {selectedAvatar || "brak"}</h3>
      <AvatarSelector
        selectedAvatar={selectedAvatar}
        onSelect={(id) => {
          setSelectedAvatar(id);
        }}
        avatars={[
          {
            src: "/avatars/1.svg",
            id: "1",
          },
          {
            src: "/avatars/2.svg",
            id: "2",
          },
          {
            src: "/avatars/3.svg",
            id: "3",
          },
          {
            src: "/avatars/4.svg",
            id: "4",
          },
          {
            src: "/avatars/5.svg",
            id: "5",
          },
          {
            src: "/avatars/6.svg",
            id: "6",
          },
          {
            src: "/avatars/7.svg",
            id: "7",
          },
          {
            src: "/avatars/8.svg",
            id: "8",
          },
        ]}
      />
    </div>
  );
}
