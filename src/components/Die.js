export default function Die(prop) {
	return (
		<div 
			onClick={prop.handleClick}
			className='die'
			style={{backgroundColor:  prop.locked ? '#59E391' : 'white'}}
		>
			<h3 className='die--value'>{prop.value}</h3>
		</div>
	)
}
