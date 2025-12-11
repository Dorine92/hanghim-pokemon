import { useState } from "react";
import GameScreen from "./components/GameScreen";
import StartScreen from "./components/StartScreen";
import AudioToggle from "./components/AudioToggle";

function App() {
	const [isStarted, setIsStarted] = useState(false);

	function startGame() {
		setIsStarted(true);
	}
	return (
		<div>
			<h1>Jeu du pendu Pokémon</h1>
			<AudioToggle />
			{isStarted ? <GameScreen /> : <StartScreen onStart={startGame} />}
		</div>
	);
}

export default App;
