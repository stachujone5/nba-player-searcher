import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { URL_ALL_PLAYERS } from '../constants/urls'
import { f } from '../helpers/fetch'

import classes from './Home.module.scss'

import type { Player } from '../types/types'

interface AllPlayers {
  readonly data: readonly Player[]
}

const HomePage = () => {
  const [players, setPlayers] = useState<readonly Player[]>([])
  const [value, setValue] = useState('')

  const { data, error, isLoading } = useQuery<AllPlayers, string>('players', () =>
    f<AllPlayers>(`${URL_ALL_PLAYERS}${value}`)
  )

  useEffect(() => {
    if (!data) return

    setPlayers(value ? data.data : [])
  }, [isLoading, data, error, value])

  if (error) {
    return <h1 className={classes.header}>There was an error: ${error}</h1>
  }

  if (isLoading) {
    return <h1 className={classes.header}>Loading...</h1>
  }
  return (
    <>
      <h1 className={classes.header}>NBA PLAYER SEARCHER</h1>
      <div className={classes.tracker}>
        <input type='text' placeholder='Enter players name...' onChange={e => setValue(e.target.value)} />
        {players.map(({ id, first_name, last_name }) => {
          return (
            <div key={id} className={classes.players}>
              <Link href={`players/${id}`}>{`${first_name} ${last_name}`}</Link>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default HomePage
