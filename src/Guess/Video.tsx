import { AbsoluteFill, Sequence, Img, staticFile } from "remotion"

import { Guess } from "./Guess"
import { Presentation } from "./Presentation"
import { Logo } from "./Logo"

import { VideoProps } from "./types"

import "./font.css";

export const Video = ({ title, level, data, seconds, gifUrl }: VideoProps) => {
  return (
    <AbsoluteFill style={{ fontFamily: "Montserrat" }}>
      <AbsoluteFill>
        <Img style={{ width: "100%", height: "100%" }} src={gifUrl.includes("https") ? gifUrl : staticFile(`guess/${gifUrl}`)}></Img>
      </AbsoluteFill>

      <Sequence durationInFrames={160}>
        <Presentation title={title} level={level} />
      </Sequence>
      <Sequence from={163}>
        <Guess data={data} seconds={seconds} />
      </Sequence>

      <Logo />
    </AbsoluteFill>
  )
}