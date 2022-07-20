import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useState } from 'react'

import { Main } from '../components/main/Main'
import { Message } from '../components/message/Message'
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
    return <Message>Something went wrong, please try again.</Message>
  }

  if (isLoading) {
    return <Message>Loading...</Message>
  }

  const players = value ? data.data : []

  return (
    <Main>
      <h1 className={classes.header}>NBA PLAYER SEARCHER</h1>
      <input
        className={classes.input}
        type='text'
        placeholder='Enter players name...'
        onChange={e => {
          setValue(e.target.value)
          void refetch()
        }}
      />
      {players.map(({ id, first_name, last_name }) => {
        return (
          <div key={id} className={classes.players}>
            <Link href={`players/${id}`}>{`${first_name} ${last_name}`}</Link>
          </div>
        )
      })}
    </Main>
  )
}

export default HomePage
