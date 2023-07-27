import { AbsoluteFill } from "remotion";

import { Choice } from "./Choice";

type Props = {
  data: ChoiceCard[][],
  seconds: number,
}

export const Video = ({ data, seconds }: Props) => {
  return (
    <AbsoluteFill style={{
      fontFamily: "Poppins"
    }}>
      <Choice data={data} seconds={seconds} />
    </AbsoluteFill>
  );
}