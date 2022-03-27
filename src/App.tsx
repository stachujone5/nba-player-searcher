import { Routes, Route } from 'react-router-dom'
import { Player } from './pages/Player/Player'
import { Home } from './pages/Home/Home'

export const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />}></Route>
			<Route path=':playerId' element={<Player />}></Route>
		</Routes>
	)
}
