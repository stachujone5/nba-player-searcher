import { Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home/Home'
import { PlayerView } from './pages/Player/PlayerView'

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path=':playerId' element={<PlayerView />} />
    </Routes>
  )
}
