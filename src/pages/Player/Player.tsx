import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PlayerStats } from '../../components/PlayerStats/PlayerStats'
import { PlayerTeam } from '../../components/PlayerTeam/PlayerTeam'
import { PlayerTitle } from '../../components/PlayerTitle/PlayerTitle'
import { SpecificPlayer } from '../../components/SpecificPlayer/SpecificPlayer'
import classes from './Player.module.scss'

export interface specificPlayerInterface {
	id: number
	first_name: string
	last_name: string
	position: string
	height_feet: number | null
	height_inches: number | null
	weight_pounds: number | null
	team: {
		id: number
		abbreviation: string
		city: string
		conference: string
		division: string
		full_name: string
		name: string
	}
}

export interface playerStatsInterface {
	games_played: number
	player_id: number
	season: number
	min: string
	fgm: number
	fga: number
	fg3m: number
	fg3a: number
	ftm: number
	fta: number
	oreb: number
	dreb: number
	reb: number
	ast: number
	stl: number
	blk: number
	turnover: number
	pf: number
	pts: number
	fg_pct: number
	fg3_pct: number
	ft_pct: number
}

export const Player = () => {
	const { playerId } = useParams()
	const [specificPlayer, setSpecificPlayer] = useState<specificPlayerInterface>()
	const [playerStats, setPlayerStats] = useState<playerStatsInterface>()
	const [isError, setIsError] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchPlayer = async () => {
			try {
				setLoading(true)
				const res = await fetch(`https://www.balldontlie.io/api/v1/players/${playerId}`)
				const data = await res.json()
				const res2 = await fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`)
				const data2 = await res2.json()
				setSpecificPlayer(data)
				const [stats] = data2.data
				setPlayerStats(stats)
				setLoading(false)
			} catch (err) {
				setIsError(true)
				setLoading(false)
				console.log(err)
			}
		}

		fetchPlayer().catch(err => {
			console.log(err)
			setIsError(true)
		})
	}, [playerId])

	if (isError) {
		return <h2 className={classes.title}>Something went wrong...</h2>
	}

	if (loading) {
		return <h1 className={classes.loading}>Loading...</h1>
	}

	return (
		<>
			<PlayerTitle playerStats={playerStats} specificPlayer={specificPlayer} />
			<main className={classes.main}>
				<PlayerTeam specificPlayer={specificPlayer} playerStats={playerStats} />
				<SpecificPlayer specificPlayer={specificPlayer} />
				<PlayerStats playerStats={playerStats} />
			</main>
		</>
	)
}
