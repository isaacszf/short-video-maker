import { useEffect } from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig, Sequence } from "remotion";

type Props = { data: string[][], seconds: number }

let frameNameAudio = 20;
let frameTickTockAudio = 0;

export const Guess = ({ data, seconds }: Props) => {
	const { fps } = useVideoConfig();
	const frame = useCurrentFrame();

	const interval = seconds * fps;
	const index = Math.floor(frame / interval) % data.length;

	const name = data[index][0];
	const link = data[index][1];

	const shouldShowText = frame % interval >= 120;
	const delay = (data.length * 48);

	// React
	useEffect(() => {
		if (shouldShowText) {
			if (index === 0) frameNameAudio += 100;
			if (index !== 0) frameNameAudio += delay;
		}

		if (!shouldShowText) {
			if (index !== 0) {
				frameTickTockAudio += delay;
			}
		}
	}, [shouldShowText])

	return (
		<AbsoluteFill>
			<div style={
				{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					color: "white",

					position: "absolute",
					left: 0,
					right: 0,
					top: "30%"
				}
			}>
				<img src={link} style={{ width: "600px" }} />

				{shouldShowText ?
					<div>
						<span style={{ fontSize: "100px", fontWeight: "bold" }}>{name}</span>
						<Sequence from={frameNameAudio}>
							<Audio src={staticFile(`guess/words/${name}.mp3`)} />
						</Sequence>
					</div>
					:
					<Sequence from={frameTickTockAudio}>
						<Audio src={staticFile("guess/tick-tock.mp3")} />
					</Sequence>
				}
			</div>
		</AbsoluteFill>
	);
};
