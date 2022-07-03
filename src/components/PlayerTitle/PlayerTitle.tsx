import classes from './PlayerTitle.module.scss'

import type { Player, Stats } from '../../types/types'

interface Props {
  readonly stats?: Stats
  readonly player: Player
}

export const PlayerTitle = ({ stats, player: { last_name, first_name, position } }: Props) => {
  return (
    <>
      <h1 className={classes.title}>
        {first_name} {last_name}
      </h1>
      {!position && <h2 className={classes.err}>Retired</h2>}
      {!stats && <h2 className={classes.err}>Not in NBA anymore</h2>}
    </>
  )
}
