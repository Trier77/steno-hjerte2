import { useState, useCallback } from "react";
import { useNavigate } from "react-router";

export function useFadeNavigate() {
  const navigate = useNavigate();
  const [fading, setFading] = useState(false);

  const fadeNavigate = useCallback(
    (destination) => {
      if (fading) return;
      setFading(true);
      setTimeout(() => navigate(destination), 800);
    },
    [fading, navigate],
  );

  return { fadeNavigate, fading };
}
