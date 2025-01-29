import './App.css'
import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Research from './pages/Research'
const LeaderBoard = lazy(() => import('./pages/LeaderBoard')); 
const InfluencerDetails = lazy (() => import('./pages/InfluencerDetails'));
import NotFound from './pages/NotFound'
import Pending from './components/Pending'
import About from './pages/About'

function App () {
  return (
    <>
      <Suspense fallback={<Pending />}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Research />}></Route>
          <Route path='/leaderboard' element={<LeaderBoard />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/influencer/:id' element={<InfluencerDetails />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
