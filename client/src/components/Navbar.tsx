import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [menuState, setMenuState] = useState(false)

  return (
    <div className='flex justify-between md:justify-around bg-[#0E131E] py-[0.5rem] px-[1rem] md:px-0 flex-wrap border-b-1 border-b-[#A2A4A8]'>
      <Link to="/" className='flex items-center gap-[0.5rem] gradient-text text-2xl font-bold textShadow' onClick={() => setMenuState(false)}>
        <i className='fas fa-shield'></i>
        VerifyInfluencers
      </Link>
      <div
        className={`${
          menuState
            ? 'flex absolute z-[100] top-[4rem] left-0 bg-[#0E131E] w-full text-center py-[1rem] border-b-2 border-white'
            : 'hidden'
        } md:flex flex-col md:flex-row text-[#A2A4A8] gap-[2rem]`}
      >
        <Link to='/leaderboard' className='hover:underline' onClick={() => setMenuState(false)}>
          Leaderboard
        </Link>
        <Link to='/products' className='hover:underline' onClick={() => setMenuState(false)}>
          Products
        </Link>
        <Link to='/monetization' className='hover:underline' onClick={() => setMenuState(false)}>
          Monetization
        </Link>
        <Link to='/about' className='hover:underline' onClick={() => setMenuState(false)}>
          About
        </Link>
        <Link to='/contact' className='hover:underline' onClick={() => setMenuState(false)}>
          Contact
        </Link>
        <Link to='/admin' className='hover:underline' onClick={() => setMenuState(false)}>
          Admin
        </Link>
        <Link to='/sign-out' className='hover:underline' onClick={() => setMenuState(false)}>
          <img />
          <i className='fas fa-arrow-right-from-bracket'></i> Sign Out
        </Link>
      </div>
      <button
        className='block md:hidden cursor-pointer'
        onClick={() => setMenuState(prev => !prev)}
      >
        <i className={`fas ${menuState ? "fa-times" : "fa-bars"} text-[#3E8563] text-3xl`}></i>
      </button>
    </div>
  )
}

export default Navbar
