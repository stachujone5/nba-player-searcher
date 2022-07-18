import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { PlayerStats } from '../../components/PlayerStats/PlayerStats'
import { PlayerTeam } from '../../components/PlayerTeam/PlayerTeam'
import { PlayerTitle } from '../../components/PlayerTitle/PlayerTitle'
import { SpecificPlayer } from '../../components/SpecificPlayer/SpecificPlayer'
import { URL_PLAYER, URL_STATS } from '../../constants/urls'
import { f } from '../../helpers/fetch'

import classes from './Player.module.scss'

import type { Player, Stats } from '../../types/types'

const PlayerPage = () => {
  const r = useRouter()

  const id = typeof r.query.id !== 'object' && typeof r.query.id !== 'undefined' ? r.query.id : ''

  const { data: player, isLoading: isLoadingPlayer } = useQuery('player', () => f<Player>(`${URL_PLAYER}${id}`))
  const { data: stats, isLoading: isLoadingStats } = useQuery('stats', () => f<Stats>(`${URL_STATS}${id}`))

  if (!player) {
    return <h2 className={classes.loading}>Something went wrong...</h2>
  }

  if (isLoadingPlayer || isLoadingStats) {
    return <h1 className={classes.loading}>Loading...</h1>
  }

  return (
    <>
      <PlayerTitle stats={stats} player={player} />
      <main className={classes.main}>
        <PlayerTeam player={player} stats={stats} />
        <SpecificPlayer player={player} />
        <PlayerStats stats={stats} />
      </main>
    </>
  )
}

export default PlayerPage
