import Skeleton from "react-loading-skeleton";

interface SkeletonLoadingProps {
  width?: number;
  height?: number;
  circle?: boolean;
}

export const SkeletonLoading = ({
  width,
  height,
  circle,
}: SkeletonLoadingProps) => {
  return (
    <Skeleton
      width={width}
      height={height}
      circle={circle}
      baseColor="#adaeb3"
    />
  );
};
