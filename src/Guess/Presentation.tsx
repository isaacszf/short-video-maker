import { AbsoluteFill, interpolate, staticFile, useCurrentFrame, Audio, Sequence } from "remotion"

import { Level } from "./types";

type Props = {
  title: string,
  level: Level,
}

const levelColor = (lvl: Level): string => {
  switch (lvl) {
    case Level.Green: return "lightgreen";
    case Level.Yellow: return "yellow";
    case Level.Red: return "red";
  }
}

const selectAudioByLevel = (lvl: Level): string => {
  switch (lvl) {
    case Level.Green: return "guess/easy.mp3";
    case Level.Yellow: return "guess/medium.mp3";
    case Level.Red: return "guess/hard.mp3";
  }
}

export const Presentation = ({ title, level }: Props) => {
  const frame = useCurrentFrame();

  const levelOpacity = interpolate(frame, [69, 70], [0, 1], { extrapolateRight: "clamp" });
  const difficultyOpacity = interpolate(frame, [83, 84], [0, 1]);

  return (
    <AbsoluteFill style={{
      position: "absolute",
      top: "23%",

      textAlign: "center",
      fontWeight: "bold",
      color: "white",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",

        justifyContent: "center",
        alignItems: "center"
      }}>
        <span style={{
          fontSize: 120,
          width: "70%"
        }}>{title}</span>

        <span style={{ fontSize: 75, opacity: levelOpacity }}>
          NÍVEL: <span style={{ color: levelColor(level), opacity: difficultyOpacity }}>{level}</span>
        </span>
      </div>

      <Audio src={staticFile("guess/title.mp3")} />
      <Sequence from={80}>
        <Audio src={staticFile(selectAudioByLevel(level))} />
      </Sequence>
    </AbsoluteFill>)
}
