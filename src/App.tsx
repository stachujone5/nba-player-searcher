import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { SingleTeam } from './components/single_team/SingleTeam'
import { Teams } from './components/teams/Teams'

export interface Team {
	id: number
	abbreviation: string
	city: string
	conference: string
	division: string
	full_name: string
	name: string
}

export const App = () => {
	const [teams, setTeams] = useState<Team[] | []>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchTeams = async () => {
			setLoading(true)
			const res = await fetch('https://www.balldontlie.io/api/v1/teams')
			const data = await res.json()
			setTeams(data.data)
			setLoading(false)
		}
		fetchTeams()
	}, [])

	return (
		<Routes>
			<Route path='/' element={<Teams teams={teams} loading={loading} />}></Route>
			<Route path=':teamId' element={<SingleTeam teams={teams} />}></Route>
		</Routes>
	)
}
