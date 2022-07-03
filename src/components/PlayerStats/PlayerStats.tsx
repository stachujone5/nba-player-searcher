import type { playerStatsInterface } from '../../pages/Player/Player'

interface PlayerStatsProps {
  readonly playerStats: playerStatsInterface | undefined
}

export const PlayerStats = ({ playerStats }: PlayerStatsProps) => {
  if (playerStats) {
    return (
      <div>
        <h3 className='stats'>Season's stats:</h3>
        <p className='singlestat'>
          Games played: <span>{playerStats?.games_played}</span>
        </p>
        <p className='singlestat'>
          Shots per match: <span>{playerStats?.pts}</span>
        </p>
        <p className='singlestat'>
          Rebounds: <span>{playerStats?.reb}</span>
        </p>
        <p className='singlestat'>
          Assists: <span>{playerStats?.ast}</span>
        </p>
      </div>
    )
  }
  return null
}
