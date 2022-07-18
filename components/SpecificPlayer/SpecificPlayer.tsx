import { feetToMeters, poundToKg } from '../../helpers/calculations'
import { Stat } from '../Stat/Stat'

import type { Player, Stats } from '../../types/types'

interface Props {
  readonly player: Player
  readonly stats?: Stats
}

export const SpecificPlayer = ({ player: { height_feet, height_inches, weight_pounds }, stats }: Props) => {
  return (
    <div>
      <h3 className='stats'>Player info:</h3>
      {height_feet && height_inches && (
        <Stat
          title='Height: '
          text={`${height_feet}' ${height_inches}" / ${feetToMeters(height_feet, height_inches)}`}
        />
      )}
      {weight_pounds && <Stat title='Weight:' text={`${weight_pounds}lbs / ${poundToKg(weight_pounds)}`} />}
      {!height_feet && !height_inches && !weight_pounds && <Stat title='No info' text='' />}
      <h3 className='stats'>Season's stats:</h3>

      {stats ? (
        <>
          <Stat title='Games played: ' text={`${stats.games_played}`} />
          <Stat title='Shots per match: ' text={`${stats.pts}`} />
          <Stat title='Rebounds: ' text={`${stats.reb}`} />
          <Stat title='Assists: ' text={`${stats.ast}`} />
        </>
      ) : (
        <Stat title='No info' text='' />
      )}
    </div>
  )
}
