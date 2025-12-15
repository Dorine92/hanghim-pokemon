import { useState } from "react";
import axios from "axios";
import GameScreen from "./components/GameScreen";
import StartScreen from "./components/StartScreen";
import AudioToggle from "./components/AudioToggle";

function App() {
	const API_URL = "https://pokebuildapi.fr/api/v1/pokemon/limit/1302";
	const [gameState, setGameState] = useState("start");
	const [pokemonList, setPokemonList] = useState([]);

	function startGame() {
		setGameState("loading");

		axios.get(API_URL).then(res => {
			setPokemonList(res.data);
			setGameState("playing");
		});
	}

	return (
		<div>
			<h1>Jeu du pendu Pokémon</h1>
			<AudioToggle />

			{gameState === "start" && (
				<StartScreen onStart={startGame} />
			)}

			{gameState === "loading" && (
				<section>
					<div className="isLoading">
						Un Pokemon sauvage apparait...
					</div>
				</section>
			)}

			{gameState === "playing" && (
				<GameScreen pokemonList={pokemonList} />
			)}
		</div>
	);
}

export default App;
