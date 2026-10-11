import { useCallback, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { wedding } from "../config/wedding";
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
        <div className="hero-content-cluster">
          <div className="hero-copy-center">
            <motion.h1
              id="couple-names"
              className="hero-couple-stack"
              tabIndex={-1}
              variants={rise}
              aria-label={wedding.heroHeadline}
            >
              <span className="hero-name">{wedding.partnerTwo}</span>
              <span className="hero-weds-mid">Weds</span>
              <span className="hero-name">{wedding.partnerOne}</span>
            </motion.h1>
            <motion.p className="hero-hashtag" variants={rise}>
              {wedding.heroHashtag}
            </motion.p>
          </div>
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
        </div>
      </motion.div>

      <TornPaperEdge className="garden-tear" />
    </section>
  );
}
