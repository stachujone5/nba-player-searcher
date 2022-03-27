import { Routes, Route } from 'react-router-dom'
import { Player } from './components/single_team/Player'
import { Teams } from './components/teams/Teams'

export const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Teams />}></Route>
			<Route path=':playerId' element={<Player />}></Route>
		</Routes>
	)
}
