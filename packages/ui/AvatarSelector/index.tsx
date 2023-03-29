import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import { Avatar } from "../Avatar";
export const AvatarSelector = () => {
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{
        margin: "auto",
        width: "fit-content",
        border: "2px solid black",
        borderRadius: "1rem",
      }}
    >
      <Grid
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        //implicitly set isDragging so IDE dont scream at me
        isDragging={isDragging}
      >
        <button onClick={() => console.log(`Avatar 1 selected`)}>
          <Avatar src="/avatars/1.svg" />
        </button>
        <button onClick={() => console.log(`Avatar 2 selected`)}>
          <Avatar src="/avatars/2.svg" />
        </button>
        <button onClick={() => console.log(`Avatar 3 selected`)}>
          <Avatar src="/avatars/3.svg" />
        </button>
        <button onClick={() => console.log(`Avatar 4 selected`)}>
          <Avatar src="/avatars/4.svg" />
        </button>
        <button onClick={() => console.log(`Avatar 5 selected`)}>
          <Avatar src="/avatars/5.svg" />
        </button>
        <button onClick={() => console.log(`Avatar 6 selected`)}>
          <Avatar src="/avatars/6.svg" />
        </button>
        <button onClick={() => console.log(`Avatar 7 selected`)}>
          <Avatar src="/avatars/7.svg" />
        </button>
        <button onClick={() => console.log(`Avatar 8 selected`)}>
          <Avatar src="/avatars/8.svg" />
        </button>
      </Grid>
    </div>
  );
};

interface GridProps {
  isDragging: boolean;
  onTouchStart: () => void;
  onTouchEnd: () => void;
}
const Grid = styled.div<GridProps>`
  overflow-x: auto;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  gap: 1rem;
  width: 460px;

  button {
    user-select: none;
    flex-shrink: 0;
    cursor: pointer;
    border: none;
    font-size: 88px;
    outline: 2px solid transparent;
  }
  button:hover {
    outline-color: black;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  @media (max-width: 768px) {
    flex-wrap: nowrap;
  }
`;
