import classes from './PlayerTitle.module.scss'

import type { playerStatsInterface, specificPlayerInterface } from '../../pages/Player/Player'

interface PlayerTitleProps {
  readonly playerStats: playerStatsInterface | undefined
  readonly specificPlayer: specificPlayerInterface | undefined
}

export const PlayerTitle = ({ playerStats, specificPlayer }: PlayerTitleProps) => {
  if (!specificPlayer?.position) {
    return (
      <>
        <h1 className={classes.title}>
          {specificPlayer?.first_name} {specificPlayer?.last_name}
        </h1>
        {!specificPlayer?.position && <h2 className={classes.err}>Retired</h2>}
      </>
    )
  }
  return (
    <>
      <h1 className={classes.title}>
        {specificPlayer?.first_name} {specificPlayer?.last_name}
      </h1>
      {!playerStats && <h2 className={classes.err}>Not in NBA anymore</h2>}
    </>
  )
}
