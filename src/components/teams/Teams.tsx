import { Link } from 'react-router-dom'
import { Team } from '../../App'

interface TeamsProps {
	teams: Team[]
	loading: boolean
}

export const Teams = ({ teams, loading }: TeamsProps) => {
    
	if (loading) {
		return <p>Loading...</p>
	}

	return (
		<div>
			{teams.map(team => (
				<div key={team.id}>
					<Link to={`/${team.id}`}>{team.full_name}</Link>
				</div>
			))}
		</div>
	)
}
