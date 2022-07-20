import Image from 'next/image'

import { TEAMS } from '../../constants/teams'
import { feetToMeters, poundToKg } from '../../helpers/calculations'
import { Stat } from '../Stat/Stat'

import classes from './SpecificPlayer.module.scss'

import type { Player, Stats } from '../../types/types'

interface Props {
  readonly player: Player
  readonly stats?: Stats
}

export const SpecificPlayer = ({
  player: { height_feet, height_inches, weight_pounds, last_name, first_name, position, team },
  stats
}: Props) => {
  const t = TEAMS.find(t => t.full_name === team.full_name)

  return (
    <div>
      <div className={classes.container}>
        <h3 className={classes.stats}>{stats ? 'Current team:' : 'Last team:'}</h3>
        <p className={classes.team}>{t?.full_name ? t.full_name : 'Team not found'}</p>
        {t?.img && <Image src={t.img} alt={`${t.full_name} logo`} layout='fill' />}
      </div>
      <h1 className={classes.title}>
        {first_name} {last_name}
      </h1>
      {!position && <h2 className={classes.err}>Retired</h2>}
      {!stats && <h2 className={classes.err}>Not in NBA anymore</h2>}
      <h3 className={classes.stats}>Player info:</h3>
      {height_feet && height_inches && (
        <Stat
          title='Height: '
          text={`${height_feet}' ${height_inches}" / ${feetToMeters(height_feet, height_inches)}`}
        />
      )}
      {weight_pounds && <Stat title='Weight:' text={`${weight_pounds}lbs / ${poundToKg(weight_pounds)}`} />}
      {!height_feet && !height_inches && !weight_pounds && <Stat title='No info' text='' />}
      <h3 className={classes.stats}>Season's stats:</h3>
      {stats ? (
        <>
          <Stat title='Games played: ' text={`${stats.games_played}`} />
          <Stat title='Shots per match: ' text={`${stats.pts}`} />
          <Stat title='Rebounds: ' text={`${stats.reb}`} />
          <Stat title='Assists: ' text={`${stats.ast}`} />
        </>
      ) : (
        <Stat title='No info' text='' />
      )}
    </div>
  )
}
