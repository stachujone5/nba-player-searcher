import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Team, teams } from '../../teams'
import classes from './Player.module.scss'

interface SpecificPlayer {
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

interface playerStats {
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
	const [specificPlayer, setSpecificPlayer] = useState<SpecificPlayer>()
	const [playerStats, setPlayerStats] = useState<playerStats>()
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		const fetchPlayer = async () => {
			try {
				const res = await fetch(`https://www.balldontlie.io/api/v1/players/${playerId}`)
				const data = await res.json()
				const res2 = await fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`)
				const data2 = await res2.json()
				setSpecificPlayer(data)
				const [stats] = data2.data
				setPlayerStats(stats)
			} catch (err) {
				setIsError(true)
				console.log(err)
			}
		}

		fetchPlayer().catch(err => setIsError(true))
	}, [playerId])

	const feetToMeters = (ft: number, inch: number) => {
		const fullInch = ft * 12 + inch
		return (fullInch * 0.0254).toFixed(2) + 'm'
	}

	const poundToKg = (lbs: number) => {
		return (0.45359237 * lbs).toFixed(0) + 'kg'
	}

	const img = teams.find((team: Team) => {
		return (team.full_name = specificPlayer?.team.full_name!)
	})?.img

	if (isError) {
		return <h2 className={classes.title}>Something went wrong...</h2>
	}

	return (
		<>
			<h1 className={classes.title}>
				{specificPlayer?.first_name} {specificPlayer?.last_name}
			</h1>
			{!specificPlayer?.position && <h2 className={`${classes.title} ${classes.err}`}>Retired</h2>}

			{!playerStats && <h2 className={`${classes.title} ${classes.err}`}>Not in NBA anymore</h2>}

			<main className={classes.main}>
				<div>
					<h3 className={classes.title}>Current Team</h3>
					<img src={img} alt='' />
				</div>

				{(specificPlayer?.height_feet || specificPlayer?.weight_pounds) && (
					<div>
						<h3 className={classes.stats}>Player info:</h3>
						<p className={classes.singlestat}>
							Height:{' '}
							<span>
								{specificPlayer?.height_feet}' {specificPlayer?.height_inches}" /
								{feetToMeters(specificPlayer?.height_feet!, specificPlayer?.height_inches!)}
							</span>
						</p>
						<p className={classes.singlestat}>
							Weight:{' '}
							<span>
								{specificPlayer.weight_pounds}lbs / {poundToKg(specificPlayer.weight_pounds!)}
							</span>
						</p>
					</div>
				)}

				{playerStats && (
					<div>
						<h3 className={classes.stats}>Season's stats:</h3>
						<p className={classes.singlestat}>
							Games played: <span>{playerStats?.games_played}</span>
						</p>
						<p className={classes.singlestat}>
							Shots per match: <span>{playerStats?.pts}</span>
						</p>
						<p className={classes.singlestat}>
							Rebounds: <span>{playerStats?.reb}</span>
						</p>
						<p className={classes.singlestat}>
							Assists: <span>{playerStats?.ast}</span>
						</p>
					</div>
				)}
			</main>
		</>
	)
}
