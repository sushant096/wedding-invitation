import { useState } from "react";
import { wedding } from "../config/wedding";

type MusicButtonProps = {
  playing: boolean;
  available: boolean;
  onToggle: () => void;
};

export function MusicButton({ playing, available, onToggle }: MusicButtonProps) {
  const label = !available
    ? "Music file is not available"
    : playing
      ? "Pause music"
      : "Play music";
  return (
    <button
      type="button"
      className="round-btn music-btn"
      onClick={onToggle}
      aria-pressed={playing}
      aria-label={label}
      title={available ? label : "Add an MP3 at public/audio/invitation.mp3"}
      data-testid="music-toggle"
      disabled={!available}
    >
      {playing ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
}

type DockProps = {
  playing: boolean;
  available: boolean;
  onToggleMusic: () => void;
  visible: boolean;
};

export function ControlDock({ playing, available, onToggleMusic, visible }: DockProps) {
  const [notice, setNotice] = useState("");

  async function share() {
    const url = window.location.href;
    const payload = { title: document.title, text: wedding.shareText, url };
    if (typeof navigator.share === "function") {
      try {
        await navigator.share(payload);
        setNotice("Share sheet opened.");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setNotice("Invitation link copied.");
    } catch {
      setNotice(url);
    }
  }

  function shareWhatsApp() {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(`${wedding.shareText} ${window.location.href}`)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  }

  if (!visible) return null;

  return (
    <div className="control-dock">
      <button type="button" className="round-btn ghost-btn" onClick={share} aria-label="Share invitation" data-testid="share-button">
        <ShareIcon />
      </button>
      <button
        type="button"
        className="round-btn ghost-btn"
        onClick={shareWhatsApp}
        aria-label="Share invitation on WhatsApp"
        data-testid="whatsapp-share"
      >
        <ChatIcon />
      </button>
      <MusicButton playing={playing} available={available} onToggle={onToggleMusic} />
      <p className="visually-hidden" aria-live="polite" data-testid="share-notice">
        {notice}
      </p>
      {notice ? <p className="dock-notice">{notice}</p> : null}
    </div>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M7 5h3.2v14H7zm6.8 0H17v14h-3.2z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        d="M12 4v10M8 8l4-4 4 4M6 13v6h12v-6"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        d="M6 16.5 4 20l4.2-1.4A8 8 0 1 0 6 16.5z"
      />
    </svg>
  );
}
