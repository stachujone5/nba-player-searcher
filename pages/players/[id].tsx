import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { SpecificPlayer } from '../../components/SpecificPlayer/SpecificPlayer'
import { URL_PLAYER, URL_STATS } from '../../constants/urls'
import { f } from '../../helpers/fetch'

import classes from './Player.module.scss'

import type { Player, Stats } from '../../types/types'

const PlayerPage = () => {
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
  } = useQuery(['stats'], () => f<readonly [Stats]>(`${URL_STATS}${id}`))

  if (isErrorStats || isErrorPlayer) {
    return <h2 className={classes.loading}>Something went wrong...</h2>
  }

  if (isLoadingPlayer || isLoadingStats) {
    return <h1 className={classes.loading}>Loading...</h1>
  }

  return (
    <main className={classes.main}>
      <SpecificPlayer player={player} stats={stats[0]} />
    </main>
  )
}

export default PlayerPage
