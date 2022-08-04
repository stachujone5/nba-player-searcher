import { useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

import { URL_ALL_PLAYERS } from '../../../constants/urls'
import { f } from '../../../helpers/fetch'
import { Main } from '../../main/Main'
import { Message } from '../../message/Message'

import classes from './Home.module.scss'

import type { Player } from '../../../types/types'

interface AllPlayers {
  readonly data: readonly Player[]
}

export const HomePageComponent = () => {
  const [value, setValue] = useState('')

  const { data, isError } = useQuery<AllPlayers>([value], () => f<AllPlayers>(`${URL_ALL_PLAYERS}${value}`))

  if (isError) {
    return <Message>Something went wrong, please try again.</Message>
  }

  return (
    <Main>
      <Head>
        <title>NBA Players Searcher</title>
      </Head>
      <h1 className={classes.header}>NBA PLAYERS SEARCHER</h1>
      <input
        className={classes.input}
        type='text'
        placeholder='Enter players name...'
        onChange={e => setValue(e.target.value)}
      />
      {data?.data.map(({ first_name, id, last_name }) => {
        return (
          <div key={id} className={classes.players}>
            <Link href={`players/${id}`}>{`${first_name} ${last_name}`}</Link>
          </div>
        )
      })}
    </Main>
  )
}
