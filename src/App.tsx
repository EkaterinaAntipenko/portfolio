import { useState } from 'react'
import { Header } from './components/blocks/B-header/B-header'
import { ProjectModal } from './components/blocks/B-project-modal/B-project-modal'
import { OrbitSystem } from './components/blocks/B-orbit-system/B-orbit-system'
import { CameraStage } from './components/blocks/B-camera-stage/B-camera-stage'
import { AppShell, Hero } from './App.styles'

// радиусы растут с увеличивающимся шагом: 90, 200(+110), 340(+140), 520(+180), 750(+230)
const orbitItems = [
  { id: 'design', src: 'https://picsum.photos/seed/design/100', alt: 'design', radius: 90, size: 56, duration: 9, startAngle: 40 },
  { id: 'frontend', src: 'https://picsum.photos/seed/frontend/100', alt: 'frontend', radius: 90, size: 56, duration: 9, startAngle: 220 },

  { id: 'email', src: 'https://picsum.photos/seed/email/120', alt: 'email', radius: 200, size: 76, duration: 20, startAngle: 100 },
  { id: 'course', src: 'https://picsum.photos/seed/course/120', alt: 'course', radius: 200, size: 76, duration: 20, startAngle: 280 },

  { id: 'poster', src: 'https://picsum.photos/seed/poster/140', alt: 'poster', radius: 340, size: 96, duration: 34, startAngle: 160 },
  { id: 'mobile', src: 'https://picsum.photos/seed/mobile/140', alt: 'mobile', radius: 340, size: 96, duration: 34, startAngle: 340 },

  { id: 'branding', src: 'https://picsum.photos/seed/branding/160', alt: 'branding', radius: 520, size: 116, duration: 52, startAngle: 60 },
  { id: 'social', src: 'https://picsum.photos/seed/social/160', alt: 'social', radius: 520, size: 116, duration: 52, startAngle: 240 },

  { id: 'ecommerce', src: 'https://picsum.photos/seed/ecommerce/180', alt: 'ecommerce', radius: 750, size: 140, duration: 75, startAngle: 0 },
  { id: 'illustration', src: 'https://picsum.photos/seed/illustration/180', alt: 'illustration', radius: 750, size: 140, duration: 75, startAngle: 180 },
]

function App() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <AppShell>
      <Header onDiscuss={() => setModalOpen(true)} />

      <Hero>
        <CameraStage>
          <OrbitSystem
            centerImage={{ src: 'https://picsum.photos/seed/avatar/200', alt: 'Екатерина Антипенко' }}
            items={orbitItems}
          />
        </CameraStage>
      </Hero>

      <ProjectModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </AppShell>
  )
}

export default App
