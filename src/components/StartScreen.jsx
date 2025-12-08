// affiche le bouton pour commencer une partie

function StartScreen({ onStart }) {
	return (
		<button onClick={onStart}>Commencer la partie</button>
	);

}

export default StartScreen;