import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [menuState, setMenuState] = useState(false)

  return (
    <div className='flex justify-between md:justify-around bg-[#0E131E] py-[0.5rem] px-[1rem] md:px-0 flex-wrap border-b-1 border-b-[#A2A4A8]'>
      <Link to="/" className='flex items-center gap-[0.5rem] text-[#3E8563] text-2xl font-bold textShadow'>
        <i className='fas fa-shield'></i>
        VerifyInfluencers
      </Link>
      <div
        className={`${
          menuState
            ? 'flex absolute z-[100] top-[4rem] left-0 bg-[#0E131E] w-full text-center py-[1rem]'
            : 'hidden'
        } md:flex flex-col md:flex-row text-[#A2A4A8] gap-[2rem]`}
      >
        <Link to='/leaderboard' className='hover:underline'>
          Leaderboard
        </Link>
        <Link to='/' className='hover:underline'>
          Products
        </Link>
        <Link to='/' className='hover:underline'>
          Monetization
        </Link>
        <Link to='/' className='hover:underline'>
          About
        </Link>
        <Link to='/' className='hover:underline'>
          Contact
        </Link>
        <Link to='/' className='hover:underline'>
          Admin
        </Link>
        <Link to='/' className='hover:underline'>
          <img />
          <i className='fas fa-arrow-right-from-bracket'></i> Sign Out
        </Link>
      </div>
      <button
        className='block md:hidden cursor-pointer'
        onClick={() => setMenuState(prev => !prev)}
      >
        <i className='fas fa-bars text-[#3E8563] text-3xl'></i>
      </button>
    </div>
  )
}

export default Navbar
