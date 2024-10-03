import Stats from 'stats.js'

export const monitorPerformance = () => {
  const stats = new Stats()
  stats.showPanel(0)

  document.body.appendChild(stats.dom)

  stats.dom.style.transform = 'scale(1.5)'
  stats.dom.style.transformOrigin = 'top left'
  stats.dom.style.position = 'absolute'
  stats.dom.style.top = '0px'
  stats.dom.style.left = '0px'
  stats.dom.style.zIndex = '1000'

  let panel = 2
  const cyclePanels = () => {
    panel = panel === 0 ? 2 : 0
    stats.showPanel(panel)
    setTimeout(cyclePanels, 5000)
  }
  cyclePanels()

  const animate = () => {
    stats.begin()
    stats.end()
    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)

  return () => {
    document.body.removeChild(stats.dom)
  }
}
