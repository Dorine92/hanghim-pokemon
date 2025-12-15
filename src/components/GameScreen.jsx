import { useEffect, useState } from "react";
import Keyboard from "./Keyboard";

function GameScreen({ pokemonList, onPokemonFound }) {
	const [currentPokemon, setCurrentPokemon] = useState(null);
	const [foundLetters, setFoundLetters] = useState([]);
	const [lives, setLives] = useState(7);
	const [hasBeenAdded, setHasBeenAdded] = useState(false);

	function normalizeString(string) {
		return string
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.toUpperCase();
	}

	function pickRandomPokemon() {
		if (pokemonList.length === 0) return;

		const randomIndex = Math.floor(Math.random() * pokemonList.length);
		const pokemon = pokemonList[randomIndex];

		setCurrentPokemon({
			...pokemon,
			normalizedName: normalizeString(pokemon.name)
		});

		setFoundLetters([]);
		setLives(7);
		setHasBeenAdded(false); 
	}

	useEffect(() => {
		if (!currentPokemon && pokemonList.length > 0) {
			pickRandomPokemon();
		}
	}, [pokemonList]);

	const win =
		currentPokemon &&
		currentPokemon.normalizedName
			.split("")
			.every(letter => foundLetters.includes(letter));

	function getMaskedWord() {
		if (!currentPokemon) return "";

		return currentPokemon.normalizedName
			.split("")
			.map(letter => (foundLetters.includes(letter) ? letter : "_"))
			.join(" ");
	}

	function handleLetterClick(letter) {
		if (foundLetters.includes(letter) || lives <= 0 || win) return;

		setFoundLetters(prev => [...prev, letter]);

		if (!currentPokemon.normalizedName.includes(letter)) {
			setLives(prev => prev - 1);
		}
	}

	useEffect(() => {
		function handleKeyDown(e) {
			const key = e.key.toUpperCase();
			if (!/^[A-Z]$/.test(key)) return;
			handleLetterClick(key);
		}

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [foundLetters, lives, win]);

	useEffect(() => {
		if (win && currentPokemon && !hasBeenAdded) {
			onPokemonFound(currentPokemon);
			setHasBeenAdded(true);
		}
	}, [win, currentPokemon, hasBeenAdded]);

	if (!currentPokemon) return null;

	if (lives <= 0) {
		return (
			<section className="pokemon-framed">
				<p>
					Perdu… le Pokemon etait{" "}
					<u>{currentPokemon.normalizedName}</u>
				</p>
				<button className="framed-button" onClick={pickRandomPokemon}>
					Rejouer ?
				</button>
			</section>
		);
	}

	if (win) {
		return (
			<section className="pokemon-framed">
				<p>
					Bravo ! Tu as trouve{" "}
					<u>{currentPokemon.normalizedName}</u>
				</p>
				<button className="framed-button" onClick={()=> {pickRandomPokemon();}}>
					Continuer ?
				</button>
			</section>
		);
	}

	return (
		<section className="pokemon-framed">
			<div>
				{Array.from({ length: lives }).map((_, i) => (
					<img
						key={i}
						src="/img/pokeball.png"
						className="life-icon"
					/>
				))}
			</div>

			<div className="pokemon-image">
				<img
					src={currentPokemon.image}
					alt={currentPokemon.name}
				/>
			</div>

			<p className="masked-word">{getMaskedWord()}</p>

			<Keyboard
				onLetterClick={handleLetterClick}
				foundLetters={foundLetters}
			/>
		</section>
	);
}

export default GameScreen;
