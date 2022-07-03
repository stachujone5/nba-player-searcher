import { teams } from '../../constants/teams'

import classes from './PlayerTeam.module.scss'

import type { playerStatsInterface, specificPlayerInterface } from '../../pages/Player/Player'
import type { Team } from '../../constants/teams'

interface PlayerTeamProps {
  readonly playerStats: playerStatsInterface | undefined
  readonly specificPlayer: specificPlayerInterface | undefined
}

export const PlayerTeam = ({ playerStats, specificPlayer }: PlayerTeamProps) => {
  const team = teams.find((team: Team) => team.full_name === specificPlayer?.team.full_name)

  return (
    <div className={classes.container}>
      <h3 className='stats'>{!playerStats ? 'Last Team:' : 'Current Team:'}</h3>
      <p className={classes.team}>{team?.full_name}</p>
      <img src={team?.img} alt='' />
    </div>
  )
}
