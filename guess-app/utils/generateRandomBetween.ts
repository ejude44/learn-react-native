export function generateRandomBetween(
  min: number,
  max: number,
  exclude: number
) {
  const minNum = Math.ceil(min);
  const maxNum = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (maxNum - minNum)) + minNum;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}
