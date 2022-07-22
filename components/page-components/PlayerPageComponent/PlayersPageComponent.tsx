import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { TEAMS } from '../../../constants/teams'
import { URL_PLAYER, URL_STATS } from '../../../constants/urls'
import { f } from '../../../helpers/fetch'
import { Main } from '../../main/Main'
import { Message } from '../../message/Message'
import { Stat } from '../../stat/Stat'

import classes from './Player.module.scss'
import { feetToMeters, poundToKg } from './calculate'

import type { Player, Stats } from '../../../types/types'

interface StatsData {
  readonly data: readonly [Stats]
}

export const PlayerPageComponent = () => {
  const r = useRouter()

  const id = typeof r.query.id !== 'object' && typeof r.query.id !== 'undefined' ? r.query.id : ''

  const {
    data: player,
    isError: isErrorPlayer,
    isLoading: isLoadingPlayer
  } = useQuery(['player'], () => f<Player>(`${URL_PLAYER}${id}`))
  const {
    data: stats,
    isError: isErrorStats,
    isLoading: isLoadingStats
  } = useQuery(['stats'], () => f<StatsData>(`${URL_STATS}${id}`))

  if (isErrorStats || isErrorPlayer) {
    return <Message>Something went wrong, please try again.</Message>
  }

  if (isLoadingPlayer || isLoadingStats) {
    return <Message>Loading...</Message>
  }

  const { height_feet, height_inches, weight_pounds, last_name, first_name, position, team } = player

  const t = TEAMS.find(t => t.full_name === team.full_name)

  return (
    <Main>
      <h1 className={classes.title}>
        {first_name} {last_name}
      </h1>

      {!position && <h2 className={classes.err}>Retired</h2>}

      <h3 className={classes.stats}>{stats.data[0] ? 'Current team:' : 'Last team:'}</h3>

      <p className={classes.team}>{t?.full_name ? t.full_name : 'Team not found'}</p>

      {t?.img && <Image className={classes.img} src={t.img} alt={`${t.full_name} logo`} width={300} height={300} />}

      <h3 className={classes.stats}>Player info:</h3>
      {height_feet !== null && height_inches !== null && (
        <Stat
          title='Height: '
          text={`${height_feet}' ${height_inches}" / ${feetToMeters(height_feet, height_inches)}`}
        />
      )}

      {weight_pounds && <Stat title='Weight: ' text={`${weight_pounds}lbs / ${poundToKg(weight_pounds)}`} />}

      {height_feet === null && height_inches === null && weight_pounds === null && <Stat title='No info' />}
      <h3 className={classes.stats}>Season's stats:</h3>

      {stats.data[0] ? (
        <>
          <Stat title='Games played: ' text={`${stats.data[0].games_played}`} />
          <Stat title='Shots per match: ' text={`${stats.data[0].pts}`} />
          <Stat title='Rebounds: ' text={`${stats.data[0].reb}`} />
          <Stat title='Assists: ' text={`${stats.data[0].ast}`} />
        </>
      ) : (
        <Stat title='No info' />
      )}
    </Main>
  )
}
