import { useEffect, useRef, useState } from "react";

// Swap this path out for the real video once received from the museum
const VIDEO_SRC = "https://www.w3schools.com/html/mov_bbb.mp4";

function VideoOverlay({ onClose, visible }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [dragging, setDragging] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoaded = () => setDuration(video.duration);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoaded);
    video.play().catch(() => {});

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const formatTime = (t) => {
    if (isNaN(t)) return "0:00";
    const mins = Math.floor(t / 60);
    const secs = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const getProgressFromEvent = (e) => {
    const bar = progressRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    videoRef.current.currentTime = ratio * duration;
    setCurrentTime(ratio * duration);
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    setDragging(true);
    getProgressFromEvent(e);
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    getProgressFromEvent(e);
  };

  const handlePointerUp = () => setDragging(false);

  const progress = duration ? currentTime / duration : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: `rgba(0,0,0,${visible ? 0.4 : 0})`,
        transition: "background-color 0.4s ease",
      }}
      onClick={onClose}
    >
      <div
        className="relative bg-ui-box rounded-3xl w-10/12 flex flex-col"
        style={{
          height: "70vh",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.95)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 z-10 w-20 h-20 flex items-center justify-center rounded-full bg-ui-box text-primary shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-11 h-11"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Video wrapper with rounded corners */}
        <div className="flex-1 m-5 rounded-2xl overflow-hidden">
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            className="w-full h-full object-cover cursor-pointer"
            onClick={togglePlay}
            playsInline
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 px-8 py-6">
          {/* Play/Pause button */}
          <button
            onClick={togglePlay}
            className="shrink-0 w-16 h-16 flex items-center justify-center"
          >
            {playing ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-14 h-14 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-14 h-14 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Progress bar */}
          <div
            ref={progressRef}
            className="relative flex-1 h-2 bg-primary/20 rounded-full cursor-pointer"
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
          >
            <div
              className="absolute left-0 top-0 h-full bg-primary rounded-full"
              style={{ width: `${progress * 100}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary shadow"
              style={{ left: `calc(${progress * 100}% - 12px)` }}
            />
          </div>

          {/* Time remaining */}
          <span className="font-display text-primary text-3xl shrink-0">
            -{formatTime(duration - currentTime)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default VideoOverlay;
