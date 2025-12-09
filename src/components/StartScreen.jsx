// affiche le bouton pour commencer une partie

function StartScreen({ onStart }) {
	return (
		<section className="start-game">
			<button className="framed-button" onClick={onStart}>Commencer la partie ?</button>
		</section>
	);

}

export default StartScreen;