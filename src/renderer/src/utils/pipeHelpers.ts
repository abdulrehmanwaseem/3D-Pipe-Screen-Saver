import * as THREE from 'three'

export const getDistanceFromPointToLineSegment = (
  point: THREE.Vector3,
  lineStart: THREE.Vector3,
  lineEnd: THREE.Vector3
) => {
  const line = new THREE.Vector3().subVectors(lineEnd, lineStart) // Vector from start to end
  const lengthSquared = line.lengthSq()

  // Project the point onto the line and clamp the projection between 0 and 1
  let t = point.clone().sub(lineStart).dot(line) / lengthSquared
  t = Math.max(0, Math.min(1, t))

  // Calculate the projection point on the line
  const projection = new THREE.Vector3().copy(lineStart).add(line.multiplyScalar(t))

  // Return the distance from the point to the projection
  return projection.distanceTo(point)
}

export const generateRandomColor = () => {
  const colors = ['#0077ff', '#ff7700', '#ff0077', '#77ff00', '#00ff77', '#7700ff']
  return colors[Math.floor(Math.random() * colors.length)]
}

export const getRandomInitialPosition = () => {
  const x = Math.random() * 25 - 10 // Random X between -5 and 5
  const y = Math.random() * 25 - 10 // Random Y between -5 and 5
  const z = Math.random() * 5 - 2.5 // Random Z between -2.5 and 2.5
  return new THREE.Vector3(x, y, z)
}
