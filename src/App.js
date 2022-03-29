import Die from './components/Die';
import './index.scss';
import React from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import useWindowSize from './useWindowSize'

let numOfMoves = 0;

function App() {
	const [dice, setDice] = React.useState(allNewDice());

	const [tenzies, setTenzies] = React.useState(false);

	React.useEffect(() => {
		let value = dice[0].value;
		let isWin = dice.every((die) => {
			return die.locked && die.value === value;
		});
		if (isWin) setTenzies(true);
	}, [dice]);

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
		if (!tenzies) {
			numOfMoves++;
			setDice((prevDice) => {
				return prevDice.map((die) => {
					return die.locked
						? die
						: createDie(Math.ceil(Math.random() * 6));
				});
			});
		} else {
			setTenzies(false);
			setDice(allNewDice());
			numOfMoves = 0;
		}
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

	let gameInfo = tenzies
		? `YOU WON IN ${numOfMoves} ROLES!`
		: 'Roll until all dice are the same. Click each die to lock it at its current value between rolls.';

	function RenderConfetti() {
		const { width, height } = useWindowSize();
		return <Confetti width={width} height={height} />;
	}

	return (
		<main>
			{tenzies && <RenderConfetti width="800px" />}
			<h1 className="game--h1">Tenzies</h1>
			<p className="game--info">{gameInfo}</p>
			<div className="dice">{diceElements}</div>
			<button className="dice--button" onClick={rollDice}>
				{tenzies ? 'New game' : 'Roll dice'}
			</button>
		</main>
	);
}
export default App;
