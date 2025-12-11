import { useState, useRef } from "react";

function AudioToggle() {
	const [isSoundOn, setIsSoundOn] = useState(false);
	const audioRef = useRef(null);

	function toggleSound() {
		if (!audioRef.current) return;

		if (isSoundOn) {
		audioRef.current.pause();
		} else {
		audioRef.current.play().catch(() => {});
		}

		setIsSoundOn(!isSoundOn);
	}

	return (
		<div className="sound-toggle" onClick={toggleSound}>
		<audio ref={audioRef} src="/audio/bike_theme.mp3" loop />

		<img
			src={isSoundOn ? "/img/sound-on.svg" : "/img/sound-off.svg"}
			alt="sound toggle"
			style={{ width: "60px" }}
		/>
		</div>
	);
}

export default AudioToggle;