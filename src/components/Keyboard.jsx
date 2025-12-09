//  clavier virtuel de A à Z
import React from "react";

function Keyboard({ onLetterClick }) {

	const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

	return (
		<div className="keyboard">
			{ALPHABET.map(letter => 
				(<button key={letter} onClick={() => onLetterClick(letter)}>{letter}</button>
			))}
		</div>
	);
}

export default Keyboard;