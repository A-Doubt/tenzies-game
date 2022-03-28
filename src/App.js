import Die from "./components/Die";
import "./index.css"
import React from "react";

function App() {

	const [dice, setDice] = React.useState(allNewDice())

	function allNewDice() {
		const diceArray = []
		for (let i = 0; i < 10; i++) {
			diceArray.push(Math.ceil(Math.random() * 6));
		}
		return diceArray;
	};
	function rollDice() {
		setDice(allNewDice());
	}

	const diceElements = dice.map((die, index) => {
		return <Die value={die} />
	})

	return (
		<main>
			<h1 className='game--h1'>Tenzies game</h1>
			<div className='dice'>
				{diceElements}
			</div>
			<button 
				className='dice--button'
				onClick={rollDice}
			>
				Roll dice
			</button>
		</main>
	);
}
export default App;
	