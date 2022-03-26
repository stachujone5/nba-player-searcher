import { useParams } from 'react-router-dom'
import { Team } from '../../App'

interface SingleTeamProps {
	teams: Team[]
}

export const SingleTeam = ({ teams }: SingleTeamProps) => {
	let { teamId } = useParams()

	const singleTeam = teams.find(team => team.id.toString() === teamId)

	return <div>{singleTeam?.name}</div>
}
