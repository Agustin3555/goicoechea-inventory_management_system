import { useDarkMode } from '@/hooks'
import { ParticleStyled } from './Particle.styled'

const Particle = ({ style }: { style: ParticleStyled.Props }) => {
  const darkMode = useDarkMode()

  return <ParticleStyled.Component p={ParticleStyled.adapter(style, darkMode)} />
}

export default Particle
