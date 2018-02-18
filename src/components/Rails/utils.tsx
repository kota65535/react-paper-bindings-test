
// Point同士を比較し、一致したらtrueを返す
export const pointsEqual = (p1, p2) => {
  if (p1 && p2) {
    return (p1.x === p2.x && p1.y === p2.y)
  } else if (!p1 && !p2) {
    return true
  } else {
    return false
  }
}
