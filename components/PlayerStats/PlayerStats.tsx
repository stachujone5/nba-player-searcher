import type { Stats } from '../../types/types'

interface Props {
  readonly stats?: Stats
}

export const PlayerStats = ({ stats }: Props) => {
  if (!stats) return null

  return (
    <div>
      <h3 className='stats'>Season's stats:</h3>
      <p className='singlestat'>
        Games played: <span>{stats.games_played}</span>
      </p>
      <p className='singlestat'>
        Shots per match: <span>{stats.pts}</span>
      </p>
      <p className='singlestat'>
        Rebounds: <span>{stats.reb}</span>
      </p>
      <p className='singlestat'>
        Assists: <span>{stats.ast}</span>
      </p>
    </div>
  )
}
