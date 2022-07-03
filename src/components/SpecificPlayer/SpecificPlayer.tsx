import { feetToMeters, poundToKg } from '../../utils/calculations'

import type { Player } from '../../types/types'

interface Props {
  readonly currentPlayer: Player
}

export const SpecificPlayer = ({ currentPlayer }: Props) => {
  if (currentPlayer?.height_feet || currentPlayer?.weight_pounds) {
    return (
      <div>
        <h3 className='stats'>Player info:</h3>
        <p className='singlestat'>
          Height:
          <span>
            {currentPlayer?.height_feet}' {currentPlayer?.height_inches}" /{' '}
            {feetToMeters(currentPlayer?.height_feet, currentPlayer?.height_inches)}
          </span>
        </p>
        <p className='singlestat'>
          Weight:
          <span>
            {currentPlayer.weight_pounds}lbs / {poundToKg(currentPlayer.weight_pounds)}
          </span>
        </p>
      </div>
    )
  }
  return null
}
