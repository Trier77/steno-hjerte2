import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

export function useIdleTimeout(minutes = 3) {
  const navigate = useNavigate();
  const timer = useRef(null);

  useEffect(() => {
    const reset = () => {
      clearTimeout(timer.current);
      timer.current = setTimeout(
        () => {
          navigate("/");
        },
        minutes * 60 * 1000,
      );
    };

    const events = ["touchstart", "mousemove", "mousedown", "keydown"];
    events.forEach((e) => window.addEventListener(e, reset));
    reset();

    return () => {
      clearTimeout(timer.current);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, []);
}
