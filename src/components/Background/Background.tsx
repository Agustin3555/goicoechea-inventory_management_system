import { useDarkMode } from '@/hooks'
import { StylizedBackground, backgroundStyleAdapter } from './Background.styled'
import { useEffect, useRef, useState } from 'react'
import Particle from './components/Particle/Particle'
import { debounce } from '@/tools'

const GAP_BETWEEN_PARTICLES = 350

const Background = () => {
  const darkMode = useDarkMode()
  const [particles, setParticles] = useState<number[]>([])
  const divRef = useRef<HTMLDivElement>(null)

  const handleResize = () => {
    if (divRef.current) {
      const width = divRef.current.clientWidth

      const particles: number[] = []

      for (let i = 0; i < width; i += GAP_BETWEEN_PARTICLES) particles.push(i)

      setParticles(particles)
    }
  }

  useEffect(() => {
    const handleResizeDebounced = debounce(handleResize, 300, { leading: true })

    window.addEventListener('resize', handleResizeDebounced)

    return () => {
      window.removeEventListener('resize', handleResizeDebounced)
    }
  }, [])

  return (
    <StylizedBackground ref={divRef} p={backgroundStyleAdapter(darkMode)}>
      {particles.map(item => (
        <Particle style={{ xPosition: item }} key={item} />
      ))}
    </StylizedBackground>
  )
}

export default Background
