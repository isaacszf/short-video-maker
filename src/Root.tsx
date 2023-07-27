import { Composition } from 'remotion';
import React from 'react';

import { Video as GuessVideo } from './Guess/Video';
import { Video as ChoiceVideo } from './Choice/Video';

import guessJson from "../configs/guess.json";
import choiceJson from "../configs/choice.json";

import config from "../video-config.json";

import { stringToLevel } from './utils';

enum VideoType {
    Guess,
    Choice
}

const ChoiceComposition: React.FC = () => {
	const fps = 40;
	const seconds = 8;

	const choices = choiceJson;

	return (
		<>
			<Composition
				id="Choice"
				component={ChoiceVideo}
				durationInFrames={900}
				defaultProps={{ data: choices, seconds }}
				fps={40}
				width={1080}
				height={1920}
				calculateMetadata={({ props }) => {
					const len = props.data.length;
					const dur = (props.seconds * len) * fps;
					return {
						durationInFrames: dur,
					}
				}}
			/>
		</>
	);
}

const GuessComposition: React.FC = () => {
	const title = guessJson["title"];
	const level = stringToLevel(guessJson["level"]);
	const gifUrl = guessJson["gif"];
	const words = guessJson["words"];
	const images = guessJson["images"];

	const data = words.map((word, index) => [word, images[index]])
	const seconds = data.length + 1;
	const fps = 40;

	return (
		<>
			<Composition
				id="Guess"
				component={GuessVideo}
				durationInFrames={900}
				fps={fps}
				width={1080}
				height={1920}
				defaultProps={
					{ title, level, data, seconds, gifUrl }
				}
				calculateMetadata={async _ => {
					const dur = (((seconds + 0.4) * fps) * data.length) + 15;
					return {
						durationInFrames: dur,
					}
				}}
			/>
		</>
	);
}

const videoType = config["video_type"];

export const RemotionRoot: React.FC = () => {
    let composition;
    switch (videoType.toLowerCase()) {
        case "choice":
            composition = ChoiceComposition({});
            break;

        default:
            composition = GuessComposition({});
            break;
    }

	return composition;
};
