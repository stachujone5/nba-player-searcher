import { TEAMS } from '../../constants/teams'

import classes from './PlayerTeam.module.scss'

import type { Player, Stats } from '../../types/types'

interface Props {
  readonly player: Player
  readonly stats?: Stats
}

//stats miało klase 'stats'

export const PlayerTeam = ({ stats, player }: Props) => {
  const team = TEAMS.find(team => team.full_name === player.team.full_name)

  return (
    <div className={classes.container}>
      <h3 className={classes.stats}>{!stats ? 'Last Team:' : 'Current Team:'}</h3>
      <p className={classes.team}>{team?.full_name ? team.full_name : 'Team not found'}</p>
      {team?.img && <img src={team.img} alt={`${team.full_name} logo`} />}
    </div>
  )
}
