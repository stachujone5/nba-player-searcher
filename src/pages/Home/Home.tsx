import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useApi } from '../../hooks/useApi'

import classes from './Home.module.scss'

import type { Player } from '../../types/types'
import type { ChangeEvent } from 'react'

export const Home = () => {
  const [players, setPlayers] = useState<readonly Player[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { data, error, isLoading } = useApi<{ readonly data: readonly Player[] }>(
      `https://www.balldontlie.io/api/v1/players?search=${e.target.value}`
    )
    if (!error && !isLoading) {
      setPlayers(data.data)
    }
  }

  if (!players.length) {
    return <h1 className={classes.header}>Couldnt't find any players...</h1>
  }

  return (
    <>
      <h1 className={classes.header}>NBA PLAYER SEARCHER</h1>
      <div className={classes.tracker}>
        <input type='text' placeholder='Enter players name...' onChange={handleChange} />
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
