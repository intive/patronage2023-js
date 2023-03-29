import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
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
          <Image src="/avatars/1.svg" alt="avatar" fill sizes="100%" />
        </button>
        <button onClick={() => console.log(`Avatar 2 selected`)}>
          <Image src="/avatars/2.svg" alt="avatar" fill sizes="100%" />
        </button>
        <button onClick={() => console.log(`Avatar 3 selected`)}>
          <Image src="/avatars/3.svg" alt="avatar" fill sizes="100%" />
        </button>
        <button onClick={() => console.log(`Avatar 4 selected`)}>
          <Image src="/avatars/4.svg" alt="avatar" fill sizes="100%" />
        </button>
        <button onClick={() => console.log(`Avatar 5 selected`)}>
          <Image src="/avatars/5.svg" alt="avatar" fill sizes="100%" />
        </button>
        <button onClick={() => console.log(`Avatar 6 selected`)}>
          <Image src="/avatars/6.svg" alt="avatar" fill sizes="100%" />
        </button>
        <button onClick={() => console.log(`Avatar 7 selected`)}>
          <Image src="/avatars/7.svg" alt="avatar" fill sizes="100%" />
        </button>
        <button onClick={() => console.log(`Avatar 8 selected`)}>
          <Image src="/avatars/8.svg" alt="avatar" fill sizes="100%" />
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
  @media (max-width: 768px) {
    align-items: center;
    grid-template-rows: repeat(1, 1fr);
    grid-template-columns: repeat(8, 1fr);
    grid-auto-flow: row;
    grid-auto-flow: column;
  }
  width: 400px;
  overflow-x: auto;
  display: grid;
  padding: 1rem;
  gap: 1rem;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(4, 1fr);

  button {
    user-select: none;
    position: relative;
    cursor: pointer;
    border-radius: 50%;
    border: none;
    height: 88px;
    width: 88px;
  }
  button:hover {
    outline: 2px solid black;
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
`;
