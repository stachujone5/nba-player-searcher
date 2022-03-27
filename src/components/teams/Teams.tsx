import { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './Teams.module.scss'

export const Teams = () => {
	const [players, setPlayers] = useState<any>([])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value) {
			fetch(`https://www.balldontlie.io/api/v1/players?search=${e.target.value}`)
				.then(res => res.json())
				.then(data => setPlayers(data.data))
		} else {
			setPlayers([])
		}
	}

	return (
		<div className={classes.header}>
			<input type='text' placeholder='Enter players name...' onChange={handleChange} />
			{players.map((player: any) => {
				return (
					<div key={player.id}>
						<Link to={`/${player.id}`}>
							{player.first_name} {player.last_name}
						</Link>
					</div>
				)
			})}
		</div>
	)
}
