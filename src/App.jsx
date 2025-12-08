import { useEffect, useState } from "react";
import GameScreen from "./components/GameScreen";
import StartScreen from "./components/StartScreen";

const MAX_ERRORS = 8;

function App() {
	const [isStarted, setIsStarted] = useState(false);
	function startGame() {
		setIsStarted(true);
	}
	return (
		<div>
			{isStarted ? <GameScreen /> : <StartScreen onStart={startGame} />}
		</div>
	);
}

export default App;
