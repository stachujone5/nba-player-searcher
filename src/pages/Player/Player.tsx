import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import classes from './Player.module.scss'

import type { Player } from '../../types/types'
import type { Stats } from 'fs'

export const PlayerView = () => {
  const [player, setPlayer] = useState<Player | null>(null)
  const [playerStats, setPlayerStats] = useState<Stats>()
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)

  const { playerId } = useParams()

  useEffect(() => {
    
  }, [playerId])

  if (isError) {
    return <h2 className={classes.loading}>Something went wrong...</h2>
  }

  if (loading) {
    return <h1 className={classes.loading}>Loading...</h1>
  }

  return (
    <>
      <PlayerTitle playerStats={playerStats} specificPlayer={player} />
      <main className={classes.main}>
        <PlayerTeam specificPlayer={player} playerStats={playerStats} />
        <SpecificPlayer specificPlayer={player} />
        <PlayerStats playerStats={playerStats} />
      </main>
    </>
  )
}
