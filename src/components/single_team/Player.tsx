import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const Player = () => {
	const { playerId } = useParams()
	const [player, setPlayer] = useState<any>({})

	useEffect(() => {
		const fetchPlayer = async () => {
			const res = await fetch(`https://www.balldontlie.io/api/v1/players/${playerId}`)
			const data = await res.json()
			setPlayer(data)
			console.log(data)
		}

		fetchPlayer()
	}, [playerId])
	return (
		<div>
			{player.first_name} {player.last_name}
		</div>
	)
}
