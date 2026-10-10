import { useCallback, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { wedding } from "../config/wedding";
import { formatHeroDate } from "../lib/weddingUtils";
import { TornPaperEdge } from "./GardenScene";

const easeOut = [0.22, 1, 0.36, 1] as const;

type HeroProps = {
  onScrollDown: () => void;
  /** True after the guest opens the seal (user gesture unlocks playback). */
  videoActive: boolean;
  /** Bumps on seal tap so play() runs in the same user gesture. */
  playNonce: number;
};

export function Hero({ onScrollDown, videoActive, playNonce }: HeroProps) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroDate =
    wedding.heroDateDisplay ?? formatHeroDate(wedding.ceremonyAt, wedding.timeZone);

  const startVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video || reduced || !videoActive) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    const attempt = video.play();
    if (attempt !== undefined) {
      void attempt.catch(() => {
        /* retry when enough data is buffered */
      });
    }
  }, [reduced, videoActive]);

  useEffect(() => {
    if (!videoActive || reduced) {
      videoRef.current?.pause();
      return;
    }
    startVideo();
  }, [videoActive, reduced, startVideo, playNonce]);

  const container = {
    hidden: {},
    show: {
      transition: { delayChildren: reduced ? 0 : 0.35, staggerChildren: reduced ? 0 : 0.11 },
    },
  };

  const rise = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.2 : 0.9, ease: easeOut },
    },
  };

  return (
    <section className="garden-hero" id="invitation" aria-labelledby="couple-names">
      <video
        ref={videoRef}
        className="garden-hero-video"
        src={wedding.heroVideoSrc}
        poster={reduced ? wedding.heroVideoPoster : undefined}
        playsInline
        muted
        loop
        preload="auto"
        disablePictureInPicture
        onLoadedData={startVideo}
        onCanPlay={startVideo}
        aria-hidden="true"
      />

      <motion.div className="garden-hero-text" variants={container} initial="hidden" animate="show">
        <motion.div className="hero-head" variants={rise}>
          <p className="hero-eyebrow">{wedding.heroEyebrow}</p>
          {heroDate ? <p className="hero-date-gold">{heroDate}</p> : null}
        </motion.div>
        <motion.h1
          id="couple-names"
          className="hero-couple-stack"
          tabIndex={-1}
          variants={rise}
          aria-label={`${wedding.partnerOne} and ${wedding.partnerTwo}`}
        >
          <span className="hero-name">{wedding.partnerOne}</span>
          <span className="hero-amp" aria-hidden="true">&</span>
          <span className="hero-name">{wedding.partnerTwo}</span>
        </motion.h1>
        <motion.div className="hero-scroll-wrap" variants={rise}>
          <button type="button" className="scroll-cue-garden" onClick={onScrollDown}>
            <span className="gold-script scroll-label">Scroll down</span>
            <motion.span
              className="scroll-chevron-gold"
              aria-hidden="true"
              animate={reduced ? undefined : { y: [0, 4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              ⌄
            </motion.span>
          </button>
        </motion.div>
      </motion.div>

      <TornPaperEdge className="garden-tear" />
    </section>
  );
}
