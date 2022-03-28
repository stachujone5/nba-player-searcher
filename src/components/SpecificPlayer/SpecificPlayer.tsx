import { specificPlayerInterface } from '../../pages/Player/Player'

interface SpecificPlayerProps {
	specificPlayer: specificPlayerInterface | undefined
}

export const SpecificPlayer = ({ specificPlayer }: SpecificPlayerProps) => {
	const feetToMeters = (ft: number, inch: number) => {
		const fullInch = ft * 12 + inch
		return (fullInch * 0.0254).toFixed(2) + 'm'
	}

	const poundToKg = (lbs: number) => {
		return (0.45359237 * lbs).toFixed(0) + 'kg'
	}

	if (specificPlayer?.height_feet || specificPlayer?.weight_pounds) {
		return (
			<div>
				<h3 className='stats'>Player info:</h3>
				<p className='singlestat'>
					Height:{' '}
					<span>
						{specificPlayer?.height_feet}' {specificPlayer?.height_inches}" /{' '}
						{feetToMeters(specificPlayer?.height_feet!, specificPlayer?.height_inches!)}
					</span>
				</p>
				<p className='singlestat'>
					Weight:{' '}
					<span>
						{specificPlayer.weight_pounds}lbs / {poundToKg(specificPlayer.weight_pounds!)}
					</span>
				</p>
			</div>
		)
	}
	return null
}
