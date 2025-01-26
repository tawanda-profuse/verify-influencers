import { Link } from 'react-router-dom'

const LeaderBoard = () => {
  return (
    <main className='p-[4rem]'>
      <h1 className='text-white text-3xl font-bold'>
        Influencer Trust Leaderboard
      </h1>
      <p className='text-[#878b92] w-[60%] my-[1rem]'>
        Real-time rankings of health influencers based on scientific accuracy,
        credibility, and transparency. Updated daily using AI-powered analysis.
      </p>
      <div className='flex flex-col md:flex-row gap-[1rem] my-[2rem]'>
        <div className='bg-[#19212E] w-full md:w-1/3 flex items-center gap-[1rem] border border-white rounded-md p-[1rem]'>
          <i className='fas fa-users light-green-text text-3xl'></i>
          <div className='flex flex-col light-gray-text'>
            <span className='text-white font-bold text-2xl'>1234</span>
            Active Influencers
          </div>
        </div>
        <div className='bg-[#19212E] w-full md:w-1/3 flex items-center gap-[1rem] border border-white rounded-md p-[1rem]'>
          <i className='fas fa-check-circle light-green-text text-3xl'></i>
          <div className='flex flex-col light-gray-text'>
            <span className='text-white font-bold text-2xl'>25431</span>
            Claims Verified
          </div>
        </div>
        <div className='bg-[#19212E] w-full md:w-1/3 flex items-center gap-[1rem] border border-white rounded-md p-[1rem]'>
          <i className='fas fa-bar-chart light-green-text text-3xl'></i>
          <div className='flex flex-col light-gray-text'>
            <span className='text-white font-bold text-2xl'>82.7%</span>
            Average Trust Score
          </div>
        </div>
      </div>
      <div className='w-full flex flex-col md:flex-row justify-between gap-[1rem]'>
        <div className='flex gap-[1rem]'>
          <button className='cursor-pointer px-[1rem] py-[0.1rem] text-white rounded-3xl green-background'>
            All
          </button>
          <button className='cursor-pointer px-[1rem] py-[0.1rem] rounded-3xl bg-[#323c4d] text-white'>
            Nutrition
          </button>
          <button className='cursor-pointer px-[1rem] py-[0.1rem] rounded-3xl bg-[#323c4d] text-white'>
            Fitness
          </button>
          <button className='cursor-pointer px-[1rem] py-[0.1rem] rounded-3xl bg-[#323c4d] text-white'>
            Medicine
          </button>
          <button className='cursor-pointer px-[1rem] py-[0.1rem] rounded-3xl bg-[#323c4d] text-white'>
            Mental Health
          </button>
        </div>
        <button className='cursor-pointer rounded-md px-[1rem] py-[0.5rem] bg-[#323c4d] text-white'>
          <i className='fas fa-arrow-up-long'></i>
          <i className='fas fa-arrow-down-long'></i> Highest First
        </button>
      </div>
      <div className='overflow-x-auto my-[2rem]'>
        <div className='border-1 border-[#aaa] rounded-lg'>
          <table className='bg-[#19212E] w-full rounded-lg'>
            <thead className='gray-text border-b'>
              <th className='p-[0.5rem]'>RANK</th>
              <th className='p-[0.5rem]'>INFLUENCER</th>
              <th className='p-[0.5rem]'>CATEGORY</th>
              <th className='p-[0.5rem]'>TRUST SCORE</th>
              <th className='p-[0.5rem]'>TREND</th>
              <th className='p-[0.5rem]'>FOLLOWERS</th>
              <th className='p-[0.5rem]'>VERIFIED CLAIMS</th>
            </thead>
            <tbody className='text-white'>
              <tr>
                <td className='text-center p-[0.5rem]'>#1</td>
                <td className='text-center p-[0.5rem] flex items-center justify-center gap-[1rem]'>
                  <img className='bg-[grey] rounded-full w-[2rem] h-[2rem]' />{' '}
                  <Link to='/influencer/123' className='hover:underline'>
                    Dr. Peter Attia
                  </Link>
                </td>
                <td className='text-center p-[0.5rem]'>Medicine</td>
                <td className='text-center p-[0.5rem]'>94%</td>
                <td className='text-center p-[0.5rem]'>
                  <i className='fas fa-arrow-trend-up'></i>
                </td>
                <td className='text-center p-[0.5rem]'>1.2M+</td>
                <td className='text-center p-[0.5rem]'>203</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default LeaderBoard
