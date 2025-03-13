import Skeleton from "react-loading-skeleton";

export default function SkeletonShow({
  skeletonLength = 1,
  width = "",
  height = "50px",
  baseColor = "",
  highlightColor = "",
  classes = "",
}) {
  const skeletonShow = Array.from({ length: skeletonLength }).map(
    (_, index) => (
      <div key={index} className={classes}>
        <div className="mx-1">
          <Skeleton
            width={width}
            height={height}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        </div>
      </div>
    )
  );
  return skeletonShow;
}
