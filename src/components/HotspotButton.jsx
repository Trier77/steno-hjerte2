import { forwardRef } from "react";

const HotspotButton = forwardRef(function HotspotButton(
  { onClick, className = "", style },
  ref,
) {
  return (
    <button
      ref={ref}
      onClick={onClick}
      style={style}
      className={`absolute flex items-center justify-center w-14 h-14 cursor-pointer bg-transparent border-none -translate-x-1/2 -translate-y-1/2 ${className}`}
    >
      <span className="absolute inline-flex w-full h-full rounded-full bg-primary opacity-40 animate-ping" />
      <span className="relative w-10 h-10 rounded-full bg-primary block" />
    </button>
  );
});

export default HotspotButton;
