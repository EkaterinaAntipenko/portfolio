import { useState } from 'react'
import { Header } from './components/blocks/B-header/B-header'
import { ProjectModal } from './components/blocks/B-project-modal/B-project-modal'
import { Text } from './components/atoms/A-text/A-text'
import { AppShell, Hero } from './App.styles'

function App() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <AppShell>
      <Header onDiscuss={() => setModalOpen(true)} />

      <Hero>
        <Text tag="h1" className="pageTitle">Екатерина Антипенко</Text>
        <Text className="mainText" color="#9a9aa2">Дизайнер · портфолио</Text>
      </Hero>

      <ProjectModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </AppShell>
  )
}

export default App
