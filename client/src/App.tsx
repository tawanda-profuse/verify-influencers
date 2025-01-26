import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Research from './pages/Research'
import LeaderBoard from './pages/LeaderBoard'
import InfluencerDetails from './pages/InfluencerDetails'

function App () {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={null}></Route>
        <Route path='/research' element={<Research />}></Route>
        <Route path='/leaderboard' element={<LeaderBoard />}></Route>
        <Route path='/influencer/:id' element={<InfluencerDetails />}></Route>
      </Routes>
    </>
  )
}

export default App
