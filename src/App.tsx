import { useCallback, useEffect, useRef, useState } from "react";
import { wedding } from "./config/wedding";
import { ControlDock, MusicButton } from "./components/Controls";
import { Envelope } from "./components/Envelope";
import { Invitation } from "./components/Invitation";
import { useMusic } from "./hooks/useMusic";

type Phase = "sealed" | "opening" | "open";

export function App() {
  const [phase, setPhase] = useState<Phase>("sealed");
  const [entryKey, setEntryKey] = useState(0);
  const openingLock = useRef(false);
  const music = useMusic(wedding.musicSrc);

  useEffect(() => {
    document.title = `${wedding.partnerOne} & ${wedding.partnerTwo}`;
  }, []);

  useEffect(() => {
    document.body.style.overflow = phase === "open" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  const openInvitation = useCallback(() => {
    if (openingLock.current) return;
    openingLock.current = true;
    void music.play();
    setPhase("opening");
  }, [music]);

  const finishOpening = useCallback(() => {
    setPhase("open");
  }, []);

  const replay = useCallback(() => {
    openingLock.current = false;
    window.scrollTo({ top: 0, behavior: "auto" });
    setEntryKey((value) => value + 1);
    setPhase("sealed");
  }, []);

  useEffect(() => {
    if (phase !== "open") return;
    document.getElementById("couple-names")?.focus();
  }, [phase]);

  return (
    <div className={`app phase-${phase}`}>
      <a className="skip-link" href="#invitation">
        Skip to invitation
      </a>
      {phase !== "sealed" ? <Invitation onReplay={replay} /> : null}
      {phase !== "open" ? (
        <Envelope
          key={entryKey}
          phase={phase === "opening" ? "opening" : "sealed"}
          onOpen={openInvitation}
          onOpened={finishOpening}
          musicControl={
            <MusicButton
              playing={music.playing}
              available={music.available}
              onToggle={() => {
                void music.toggle();
              }}
            />
          }
        />
      ) : null}
      <ControlDock
        visible={phase === "open"}
        playing={music.playing}
        available={music.available}
        onToggleMusic={() => {
          void music.toggle();
        }}
      />
    </div>
  );
}
