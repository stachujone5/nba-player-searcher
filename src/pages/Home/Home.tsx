import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useApi } from '../../hooks/useApi'

import classes from './Home.module.scss'

import type { Player } from '../../types/types'

export const Home = () => {
  const [players, setPlayers] = useState<readonly Player[]>([])
  const [value, setValue] = useState('')

  const { data, error, isLoading } = useApi<{ readonly data: readonly Player[] }>(
    `https://www.balldontlie.io/api/v1/players?search=${value}`
  )

  useEffect(() => {
    if (isLoading || error) return

    setPlayers(value ? data.data : [])
  }, [isLoading, data, error, value])

  if (error) {
    return <h1 className={classes.header}>Something went wrong...</h1>
  }

  return (
    <>
      <h1 className={classes.header}>NBA PLAYER SEARCHER</h1>
      <div className={classes.tracker}>
        <div />
        <input type='text' placeholder='Enter players name...' onChange={e => setValue(e.target.value)} />
        {players.map(({ id, first_name, last_name }) => {
          return (
            <div key={id} className={classes.players}>
              <Link to={`/${id}`}>
                {first_name} {last_name}
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}
