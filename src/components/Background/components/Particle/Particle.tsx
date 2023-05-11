import { useDarkMode } from '@/hooks'
import { ParticleStyleProps, StylizedParticle, particleStyleAdapter } from './Particle.styled'

const Particle = ({ style }: { style: ParticleStyleProps }) => {
  const darkMode = useDarkMode()

  return <StylizedParticle p={particleStyleAdapter(style, darkMode)} />
}

export default Particle
