import Die from './components/Die';
import './index.scss';
import React from 'react';
import { nanoid } from 'nanoid';

function App() {
	const [dice, setDice] = React.useState(allNewDice());

	// createDie factory function
	function createDie(value) {
		return {
			value: value,
			locked: false,
			id: nanoid(),
		};
	}

	function allNewDice() {
		const diceArray = [];
		for (let i = 0; i < 10; i++) {
			diceArray.push(createDie(Math.ceil(Math.random() * 6)));
		}
		return diceArray;
	}

	function rollDice() {
		setDice((prevDice) => {
			return prevDice.map((die) => {
				return die.locked
					? die
					: createDie(Math.ceil(Math.random() * 6));
			});
		});
	}

	const diceElements = dice.map((die, index) => {
		return (
			<Die
				value={die.value}
				key={die.id}
				locked={die.locked}
				handleClick={() => lockDie(die.id)}
			/>
		);
	});

	function lockDie(id) {
		setDice((prevDice) => {
			const newDice = prevDice.map((die) => {
				return die.id === id ? { ...die, locked: !die.locked } : die;
			});
			return newDice;
		});
	}

	return (
		<main>
			<h1 className='game--h1'>Tenzies game</h1>
			<p className='game--info'>Roll until all dice are the same. Click each die to lock it at its current value between rolls.</p>
			<div className="dice">{diceElements}</div>
			<button className="dice--button" onClick={rollDice}>
				Roll dice
			</button>
		</main>
	);
}
export default App;
