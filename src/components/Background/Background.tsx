import { useDarkMode } from '@/hooks'
import { useEffect, useRef, useState } from 'react'
import Particle from './components/Particle/Particle'
import { debounce } from '@/tools'
import { BackgroundStyled } from './Background.styled'

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
    handleResize()

    const handleResizeDebounced = debounce(handleResize, 500)

    window.addEventListener('resize', handleResizeDebounced)

    return () => {
      window.removeEventListener('resize', handleResizeDebounced)
    }
  }, [])

  return (
    <BackgroundStyled.Component ref={divRef} p={BackgroundStyled.adapter(darkMode)}>
      {particles.map(item => (
        <Particle style={{ xPosition: item }} key={item} />
      ))}
    </BackgroundStyled.Component>
  )
}

export default Background
