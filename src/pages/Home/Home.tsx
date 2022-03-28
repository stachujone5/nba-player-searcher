import { useState } from 'react'
import { Link } from 'react-router-dom'
import { specificPlayerInterface } from '../Player/Player'
import classes from './Home.module.scss'

export const Home = () => {
	const [players, setPlayers] = useState<specificPlayerInterface[]>()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value) {
			fetch(`https://www.balldontlie.io/api/v1/players?search=${e.target.value}`)
				.then(res => res.json())
				.then(data => setPlayers(data.data))
				.catch(err => console.log(err))
		} else {
			setPlayers([])
		}
	}

	return (
		<>
			<h1 className={classes.header}>NBA PLAYER SEARCHER</h1>
			<div className={classes.tracker}>
				<input type='text' placeholder='Enter players name...' onChange={handleChange} />
				{players?.map((player: specificPlayerInterface) => {
					return (
						<div key={player.id} className={classes.players}>
							<Link to={`/${player.id}`}>
								{player.first_name} {player.last_name}
							</Link>
						</div>
					)
				})}
			</div>
		</>
	)
}
