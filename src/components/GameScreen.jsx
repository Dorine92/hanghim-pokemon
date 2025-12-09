// la plateforme principale sur laquelle va se dérouler le jeu

import { useState, useEffect } from "react";
import axios from "axios";
import Keyboard from "./Keyboard";

const API_URL = "https://pokebuildapi.fr/api/v1/pokemon/limit/1302";

function GameScreen() {
	const [pokemonName, setPokemonName] = useState('');
	const [pokemonImage, setPokemonImage] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [foundLetters, setFoundLetters] = useState([]);
	const [lives, setLives] = useState(7);

	function normalizeString(string) {
	return string
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toUpperCase();
	}

  async function fetchPokemon() {
	let response = await axios.get(API_URL);
	let listPokemon = await response.data;
	let randomPokemon = Math.floor(Math.random() * listPokemon.length);
	const pokemon = listPokemon[randomPokemon];
	setPokemonImage(pokemon.image);
	setPokemonName(normalizeString(pokemon.name.toUpperCase()));
	setIsLoading(false);
  }
	useEffect(() => {
		fetchPokemon();
	}, []);

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

	function restartGame() {
		window.location.reload();
	}

	if(lives <= 0) {
		return(
			<section className="pokemon-framed">
				<p>Perdu... le Pokemon etait : <u>{pokemonName}</u></p>
				<button className="framed-button" onClick={restartGame}>Rejouer ?</button>
			</section>
		);
	}

	return (
		<div>
			{isLoading ? (<div>Chargement...</div>) 
			: (<section className="pokemon-framed">
				<div>
					{Array.from({ length: lives }).map((_, i) => (
					<img key={i} src="/img/pokeball.png" className="life-icon" />
				))}
				</div>
				<div className="pokemon-image">
					<img src={pokemonImage} alt={pokemonName} />
				</div>
				<p className="masked-word">{getMaskedWord()}</p>
				<Keyboard onLetterClick={handleLetterClick} />
			</section>)}
		</div>
	);

}

export default GameScreen;