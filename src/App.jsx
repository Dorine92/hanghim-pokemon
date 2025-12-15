import { useState } from "react";
import axios from "axios";
import GameScreen from "./components/GameScreen";
import StartScreen from "./components/StartScreen";
import AudioToggle from "./components/AudioToggle";
import Pokedex from "./components/Pokedex";

function App() {
	const API_URL = "https://pokebuildapi.fr/api/v1/pokemon/limit/1302";
	const [gameState, setGameState] = useState("start");
	const [pokedex, setPokedex] = useState([]);
	const [pokemonList, setPokemonList] = useState([]);

	function startGame() {
		if (pokemonList.length > 0) {
			setGameState("playing");
			return;
		}

		setGameState("loading");

		axios.get(API_URL).then(res => {
			setPokemonList(res.data);
			setGameState("playing");
		});
	}

	function handlePokemonFound(pokemon) {
		setPokedex(prev =>
			prev.some(p => p.pokedexId === pokemon.pokedexId)
			? prev
			: [...prev, pokemon]
		);

		setPokemonList(prev =>
			prev.filter(p => p.pokedexId !== pokemon.pokedexId)
		);
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
				<>
				<GameScreen
					pokemonList={pokemonList}
					onPokemonFound={handlePokemonFound}
				/>

				<button
					className="pokedex-button"
					onClick={() => setGameState("pokedex")}
				>
					Voir mon Pokedex
				</button>
				</>
			)}

			{gameState === "pokedex" && (
				<section className="pokedex-section">
					<Pokedex pokedex={pokedex} />

					<button
						className="pokedex-button"
						onClick={() => setGameState("playing")}
					>
						Retour au jeu
					</button>
				</section>
			)}
	</div>

	);
}

export default App;
