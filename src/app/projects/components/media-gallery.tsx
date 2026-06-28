"use client"
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import "./media-gallery.scss";

function isVideo(src: string) {
  return /\.(mp4|webm|ogg|mov)$/i.test(src);
}

export default function MediaGallery({ media }: { media: any[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % media.length)),
    [media.length]
  );
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + media.length) % media.length)),
    [media.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, next, prev]);

  const visible = media.slice(0, 4);
  const remaining = media.length - 4;
  const single = media.length === 1;

  return (
    <>
      <div className={`media-grid ${single ? "single" : ""}`}>
        {visible.map((item, i) => {
          const showOverlay = i === 3 && remaining > 0;
          return (
            <figure
              key={i}
              className="media-thumb"
              onClick={() => setIndex(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setIndex(i)}
            >
              {isVideo(item.src) ? (
                <div className="thumb-inner">
                  <video src={item.src} muted playsInline preload="metadata" />
                  <span className="play-badge" aria-hidden>▶</span>
                </div>
              ) : (
                <Image src={item.src} alt={item.description} width={400} height={400} />
              )}
              {showOverlay && <div className="more-overlay">+{remaining}</div>}
              <figcaption>{item.description}</figcaption>
            </figure>
          );
        })}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          >
            <button className="lightbox-btn close" onClick={close} aria-label="Close viewer">
              ×
            </button>

            {media.length > 1 && (
              <button
                className="lightbox-btn prev"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous"
              >
                ‹
              </button>
            )}

            <motion.div
              key={index}
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {isVideo(media[index!].src) ? (
                <video
                  src={media[index!].src}
                  controls
                  autoPlay
                  playsInline
                  className="lightbox-media"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={media[index!].src}
                  alt={media[index!].description}
                  className="lightbox-media"
                />
              )}
              <div className="lightbox-caption">
                <span>{media[index!].description}</span>
                <span className="lightbox-counter">{index! + 1} / {media.length}</span>
              </div>
            </motion.div>

            {media.length > 1 && (
              <button
                className="lightbox-btn next"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next"
              >
                ›
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
