//  clavier virtuel de A à Z

function Keyboard({ onLetterClick, foundLetters }) {

	const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

	return (
		<div className="keyboard">
			{ALPHABET.map(letter => {

				const isUsed = foundLetters.includes(letter);

				return (
					<button
						key={letter}
						onClick={() => onLetterClick(letter)}
						disabled={isUsed}
						className={isUsed ? "used" : ""}
					>
						{letter}
					</button>
				);
			})}
		</div>
	);
}

export default Keyboard;