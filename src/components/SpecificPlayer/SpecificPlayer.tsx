import { feetToMeters, poundToKg } from '../../utils/calculations'

import type { Player } from '../../types/types'

interface Props {
  readonly player: Player
}

export const SpecificPlayer = ({ player: { height_feet, height_inches, weight_pounds } }: Props) => {
  if (height_feet && weight_pounds && height_inches) {
    return (
      <div>
        <h3 className='stats'>Player info:</h3>
        <p className='singlestat'>
          Height:
          <span>
            {height_feet}' {height_inches}" / {feetToMeters(height_feet, height_inches)}
          </span>
        </p>
        <p className='singlestat'>
          Weight:
          <span>
            {weight_pounds}lbs / {poundToKg(weight_pounds)}
          </span>
        </p>
      </div>
    )
  }
  return null
}
