"use client";

import { useRef, useEffect, useCallback } from "react";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const opacityRef = useRef(1);

  const tick = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const ct = v.currentTime;
    const dur = v.duration || 1;
    const fadeDuration = 0.5;

    if (ct < fadeDuration) {
      opacityRef.current = ct / fadeDuration;
    } else if (ct > dur - fadeDuration) {
      opacityRef.current = Math.max(0, (dur - ct) / fadeDuration);
    } else {
      opacityRef.current = 1;
    }
    v.style.opacity = String(opacityRef.current);

    if (ct >= dur - 0.05) {
      v.style.opacity = "0";
      setTimeout(() => {
        if (v) {
          v.currentTime = 0;
          v.play();
        }
      }, 100);
      return;
    }
    requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => requestAnimationFrame(tick);
    v.addEventListener("play", onPlay);
    return () => v.removeEventListener("play", onPlay);
  }, [tick]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      loop={false}
      preload="auto"
      className="absolute inset-0 h-full w-full object-cover"
      style={{ opacity: 0 }}
    >
      <source src={VIDEO_SRC} type="video/mp4" />
    </video>
  );
}
