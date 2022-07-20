export const feetToMeters = (ft: number, inch: number) => {
  const fullInch = ft * 12 + inch

  return (fullInch * 0.0254).toFixed(2) + 'm'
}

export const poundToKg = (lbs: number) => {
  return (0.45359237 * lbs).toFixed(0) + 'kg'
}
