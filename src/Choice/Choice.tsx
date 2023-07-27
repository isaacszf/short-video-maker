import { useEffect } from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, Audio, staticFile, Sequence } from "remotion";

type ChoiceCard = {
  choice: string,
  picture: string,
  percentage: number,
}

type Props = {
  data: ChoiceCard[][],
  seconds: number,
}

const choiceCard = (
  percentageDelay: number,
  transform: number,
  color: string,
  toTop: boolean,
  bgColor: string,
  card: ChoiceCard,
) => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: bgColor,
    height: "50%",
    width: "100%",

    color: "white",
  };

  const percentageElement =
    <span style={{
      fontSize: "120px",

      opacity: percentageDelay,
      textShadow: "0px 3px 6px rgba(0,0,0,0.6)",
      color,
    }}>{card.percentage + "%"}</span>;

  const choiceElement = <span style={{
    fontSize: "63px",
    textShadow: "0px 3px 6px rgba(0,0,0,0.6)",
  }}>{card.choice}</span>;

  return (
    <div style={containerStyle}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        transform: `scale(${transform})`,
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          padding: "0 60px",

          marginBottom: "10px",
        }}>
          {toTop && percentageElement}
          {toTop && choiceElement}

          <div style={{
            width: "600px",
            height: "400px",
            marginBottom: "10px"
          }}>
            <img src={card.picture} style={{
              width: "100%", height: "100%",
              objectFit: "cover", borderRadius: "15px",
            }} />
          </div>

          {!toTop && choiceElement}
          {!toTop && percentageElement}
        </div>
      </div>
    </div>
  )
}

let choiceAudioFrame = 0;
let dingAudioFrame = 0;

export const Choice = ({ data, seconds }: Props) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const interval = seconds * fps;
  const index = Math.floor(frame / interval) % data.length;

  const choice = data[index];
  const choiceAudio = `/choice/phrases/${choice[0].choice}.mp3`;

  // Percentage
  const higher = choice[0].percentage > choice[1].percentage;

  const percentageInterval = (seconds / 2) * fps;
  const percentage = Math.floor(frame / percentageInterval) % 2;

  // Transform
  const resetFrame = Math.floor(frame / interval) * interval
  const firstTransformDelay = spring({ fps: fps - 20, frame: (frame - resetFrame) - 15 });
  const secondTransformDelay = spring({ fps: fps - 20, frame: (frame - resetFrame) - 50 });

  // Effects
  useEffect(() => {
    if (index !== 0) {
      choiceAudioFrame += interval;
    }
  }, [index]);

  useEffect(() => {
    if (percentage === 1 && dingAudioFrame === 0) {
      dingAudioFrame += (interval / 2);
    } else if (percentage === 1) dingAudioFrame += interval;
  }, [percentage])

  // Cards
  const firstCard = choiceCard(
    percentage,
    firstTransformDelay,
    (higher ? "#5eff76" : "white"),
    false,
    "#E3242B",
    choice[0]
  );

  const secondCard = choiceCard(
    percentage,
    secondTransformDelay,
    (!higher ? "#5eff76" : "white"),
    true,
    "#2596be",
    choice[1]);

  return (
    <AbsoluteFill>
      <div style={{
        display: "flex",
        flexDirection: "column",

        justifyContent: "center",
        alignItems: "center",

        fontSize: "100px",
        textAlign: "center",
        fontWeight: "bold",

        height: "100%"
      }}>
        {firstCard}

        <div style={{
          position: "relative",

          backgroundColor: "black",
          color: "white",

          padding: "10px",

          width: "100%"
        }}>
          <span style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            fontSize: "45px",

            backgroundColor: "black",
            padding: "20px",

            borderRadius: "50%",
          }}>OU</span>
        </div>

        {secondCard}
      </div>

      <Audio src={staticFile("choice/music-bg.mp3")} />

      <Sequence from={choiceAudioFrame}>
        <Audio src={staticFile(choiceAudio)} />
      </Sequence>

      {percentage === 1 &&
        <Sequence from={dingAudioFrame}>
          <Audio src={staticFile("choice/ding.mp3")} />
        </Sequence>
      }
    </AbsoluteFill>
  );
};
