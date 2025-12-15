// la plateforme principale sur laquelle va se dérouler le jeu

import { useState, useEffect } from "react";
import Keyboard from "./Keyboard";

function GameScreen({ pokemonList }) {
	const [pokemonName, setPokemonName] = useState('');
	const [pokemonImage, setPokemonImage] = useState('');
	const [foundLetters, setFoundLetters] = useState([]);
	const [lives, setLives] = useState(7);
	const win = pokemonName.length > 0 && pokemonName.split("").every(letter => foundLetters.includes(letter));

	function normalizeString(string) {
	return string
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toUpperCase();
	}

	function fetchPokemon() {
		let randomPokemon = Math.floor(Math.random() * pokemonList.length);
		const pokemon = pokemonList[randomPokemon];
		setPokemonImage(pokemon.image);
		setPokemonName(normalizeString(pokemon.name.toUpperCase()));
	}

	useEffect(() => {
		if(pokemonList.length > 0) {
			fetchPokemon();
		}
	}, [pokemonList]);

	function getMaskedWord() {
		let masked = [];
		for (const letter of pokemonName) {
			if(foundLetters.includes(letter)) {
				masked.push(letter);
			} else {
				masked.push("_");
			}
		}
		return masked.join(" ");
	}

	function handleLetterClick(letter) {
		if(foundLetters.includes(letter)) {
			return;
		}

		setFoundLetters([...foundLetters, letter]);
		
		if(!pokemonName.includes(letter)) {
			setLives(lives => lives - 1);
		}
	}

	useEffect(() => {
		function handleKeyDown(event) {
			const key = event.key.toUpperCase();

			if (!/^[A-Z]$/.test(key)) return;

			if (foundLetters.includes(key)) return;

			if (lives <= 0 || win) return;

			handleLetterClick(key);
		}

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [foundLetters, pokemonName, lives, win]);


	function restartGame() {
		setFoundLetters([]);
  		setLives(7);
  		fetchPokemon();
	}

	if(lives <= 0) {
		return(
			<section className="pokemon-framed">
				<p>Perdu... le Pokemon etait : <u>{pokemonName}</u></p>
				<button className="framed-button" onClick={restartGame}>Rejouer ?</button>
			</section>
		);
	} else if (win) {
		return(
			<section className="pokemon-framed">
				<p>Bravo ! Tu as trouve <u>{pokemonName} !</u></p>
				<button className="framed-button" onClick={restartGame}>Rejouer ?</button>
			</section>
		);
	}

	return (
		<div>
			<section className="pokemon-framed">
				<div>
					{Array.from({ length: lives }).map((_, i) => (
					<img key={i} src="/img/pokeball.png" className="life-icon" />
				))}
				</div>
				<div className="pokemon-image">
					<img src={pokemonImage} alt={pokemonName} />
				</div>
				<p className="masked-word">{getMaskedWord()}</p>
				<Keyboard onLetterClick={handleLetterClick} foundLetters={foundLetters} />
			</section>
		</div>
	);
}

export default GameScreen;