"use client";

import { Play } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";

type HeroPromoVideoProps = {
  src?: string;
  className?: string;
  videoClassName?: string;
};

export function HeroPromoVideo({
  src = "/atrio/promo-video.mp4",
  className,
  videoClassName,
}: HeroPromoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onPlay = () => setHasStarted(true);
    el.addEventListener("play", onPlay);
    return () => {
      el.removeEventListener("play", onPlay);
    };
  }, []);

  const startWithSound = useCallback(async () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = false;
    try {
      await el.play();
    } catch {
      // Puede reintentar con los controles del reproductor
    }
  }, []);

  const onOverlayKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      void startWithSound();
    }
  };

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center",
        className,
      )}
    >
      <video
        ref={videoRef}
        loop
        playsInline
        preload="auto"
        controls
        controlsList="nodownload"
        className={cn("h-full w-full object-contain", videoClassName)}
        src={src}
        aria-label="Vista previa del producto Atrio en formato vertical"
        suppressHydrationWarning
      />
      {!hasStarted ? (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-foreground/10 backdrop-blur-[2px]"
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={() => void startWithSound()}
              onKeyDown={onOverlayKeyDown}
              className="pointer-events-auto flex flex-col items-center justify-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                <Play
                  className="size-8 translate-x-0.5"
                  fill="currentColor"
                  aria-hidden
                />
              </span>
              <span className="max-w-[14rem] px-4 text-center text-sm font-medium leading-snug text-foreground drop-shadow-sm">
                Reproducir con sonido
              </span>
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
