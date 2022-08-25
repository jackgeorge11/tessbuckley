import React, { memo } from "react";

const Palette = ({ vertical }) => {
  const randomColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16) + "55";

  return (
    <div className={vertical ? "palette vertical" : "palette"}>
      <div className="circle" style={{ backgroundColor: randomColor() }} />
      <div className="circle" style={{ backgroundColor: randomColor() }} />
      <div className="circle" style={{ backgroundColor: randomColor() }} />
    </div>
  );
};

export const MemoizedPalette = memo(Palette);
