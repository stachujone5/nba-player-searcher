import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'

import { URL_ALL_PLAYERS } from '../constants/urls'
import { f } from '../helpers/fetch'

import classes from './Home.module.scss'

import type { Player } from '../types/types'

interface AllPlayers {
  readonly data: readonly Player[]
}

const HomePage = () => {
  const [value, setValue] = useState('')

  const { data, isError, isLoading, refetch } = useQuery<AllPlayers, string>(['players'], () =>
    f<AllPlayers>(`${URL_ALL_PLAYERS}${value}`)
  )

  if (isError) {
    return <h1 className={classes.header}>There was an error!</h1>
  }

  if (isLoading) {
    return <h1 className={classes.header}>Loading...</h1>
  }

  return (
    <>
      <h1 className={classes.header}>NBA PLAYER SEARCHER</h1>
      <div className={classes.tracker}>
        <input
          type='text'
          placeholder='Enter players name...'
          onChange={e => {
            setValue(e.target.value)
            void refetch()
          }}
        />
        {data.data.map(({ id, first_name, last_name }) => {
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
