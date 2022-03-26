import { useEffect, useState } from 'react'

interface Team {
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

	if (loading) {
		return <p>Loading...</p>
	}

	const fetchSpecificTeam = async (id: number) => {
		setLoading(true)
		const res = await fetch(`https://www.balldontlie.io/api/v1/teams/${id}`)
		const data = await res.json()
		setLoading(false)
		console.log(data)
	}

	return (
		<div>
			{teams.map(team => (
				<p onClick={() => fetchSpecificTeam(team.id)} key={team.id}>
					{team.full_name}
				</p>
			))}
		</div>
	)
}
