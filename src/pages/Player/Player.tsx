import { useParams } from 'react-router-dom'

import { URL_PLAYER, URL_STATS } from '../../constants/urls'
import { useApi } from '../../hooks/useApi'

import classes from './Player.module.scss'

import type { Player, Stats } from '../../types/types'

export const PlayerView = () => {
  const { playerId } = useParams()

  const { data: player, error: errPlayer, isLoading: isLoadingPlayer } = useApi<Player>(`${URL_PLAYER}${playerId}`)
  const { data: stats, error: errStats, isLoading: isLoadingStats } = useApi<Stats>(`${URL_STATS}${playerId}`)

  if (errPlayer || errStats) {
    return <h2 className={classes.loading}>Something went wrong...</h2>
  }

  if (isLoadingPlayer || isLoadingStats) {
    return <h1 className={classes.loading}>Loading...</h1>
  }

  return (
    <>
      <PlayerTitle playerStats={stats} specificPlayer={player} />
      <main className={classes.main}>
        <PlayerTeam specificPlayer={player} playerStats={stats} />
        <SpecificPlayer specificPlayer={player} />
        <PlayerStats playerStats={stats} />
      </main>
    </>
  )
}
