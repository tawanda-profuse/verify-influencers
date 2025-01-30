import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Pending from '../components/Pending'

interface Influencer {
  _id: string
  name: string
  profilePhoto: string
  claims: [{ category: string; trustScore: number }]
  // trend: number
  followers: number
}

const LeaderBoard = () => {
  const apiUrl: string = window.location.origin.includes('localhost')
    ? 'http://localhost:5000'
    : 'https://verify-influencers-backend-six.vercel.app'
  const [influencers, setInfluencers] = useState([])
  const [allInfluencers, setAllInfluencers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState(true)
  const [searchItem, setSearchItem] = useState('All')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/leaderboard`)
        setInfluencers(response.data.influencers)
        setAllInfluencers(response.data.influencers)
      } catch (error) {
        console.error(error)
        alert('An error has occurred while fetching the leaderboard')
        setInfluencers([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [apiUrl])

  const formatTrustScore = (trustScore: number) => {
    if (trustScore >= 90) {
      return 'light-green-text'
    } else if (trustScore <= 90 && trustScore >= 50) {
      return 'text-[orange]'
    } else if (trustScore < 50) {
      return 'text-[red]'
    }
  }

  return (
    <>
      {isLoading && <Pending />}
      <main className='p-[1rem] md:p-[4rem]'>
        <h1 className='text-white text-3xl font-bold'>
          Influencer Trust Leaderboard
        </h1>
        <p className='text-[#878b92] w-[60%] my-[1rem]'>
          Real-time rankings of health influencers based on scientific accuracy,
          credibility, and transparency. Updated daily using AI-powered
          analysis.
        </p>
        <div className='flex flex-col md:flex-row gap-[1rem] my-[2rem]'>
          <div className='bg-[#19212E] w-full md:w-1/3 flex items-center gap-[1rem] border border-white rounded-md p-[1rem]'>
            <i className='fas fa-users light-green-text text-3xl'></i>
            <div className='flex flex-col light-gray-text'>
              <span className='text-white font-bold text-2xl'>
                {allInfluencers.length}
              </span>
              Active Influencers
            </div>
          </div>
          <div className='bg-[#19212E] w-full md:w-1/3 flex items-center gap-[1rem] border border-white rounded-md p-[1rem]'>
            <i className='fas fa-check-circle light-green-text text-3xl'></i>
            <div className='flex flex-col light-gray-text'>
              <span className='text-white font-bold text-2xl'>
                {allInfluencers.reduce(
                  (prev, curr: Influencer) => prev + curr.claims.length,
                  0
                )}
              </span>
              Claims Verified
            </div>
          </div>
          <div className='bg-[#19212E] w-full md:w-1/3 flex items-center gap-[1rem] border border-white rounded-md p-[1rem]'>
            <i className='fas fa-bar-chart light-green-text text-3xl'></i>
            <div className='flex flex-col light-gray-text'>
              <span
                className="font-bold text-2xl text-white"
              >
                {allInfluencers.length > 0
                  ? (
                      allInfluencers
                        .map(
                          (person: Influencer) =>
                            person.claims.reduce(
                              (prev, curr) => prev + curr.trustScore,
                              0
                            ) / person.claims.length || 0
                        )
                        .reduce((prev, curr) => prev + curr, 0) /
                      allInfluencers.length
                    ).toFixed(2)
                  : 0}
                %
              </span>
              Average Trust Score
            </div>
          </div>
        </div>
        {!isLoading && <div className='w-full flex flex-col md:flex-row items-center justify-between gap-[1rem]'>
          <div className='flex w-full md:max-w-3/4 gap-[1rem] flex-wrap'>
            <button
              className={`cursor-pointer px-[1rem] py-[0.1rem] bg-[#323c4d] text-white rounded-3xl ${
                searchItem === 'All' && 'green-background'
              }`}
              onClick={() => {
                setSearchItem('All')
                setInfluencers(allInfluencers)
              }}
            >
              All
            </button>
            {Array.from(
              new Set(
                allInfluencers.flatMap((person: Influencer) =>
                  person.claims.map(item => item.category)
                )
              )
            ).map((category, index: number) => (
              <button
                className={`cursor-pointer px-[1rem] py-[0.1rem] rounded-3xl bg-[#323c4d] text-white ${
                  searchItem === category && 'green-background'
                }`}
                key={index}
                onClick={() => {
                  setSearchItem(category)
                  setInfluencers(
                    allInfluencers.filter((person: Influencer) =>
                      person.claims.some(item => item.category === searchItem)
                    )
                  )
                }}
              >
                {category}
              </button>
            ))}
          </div>
          <button
            className='w-full md:w-[10rem] cursor-pointer rounded-md px-[1rem] py-[0.5rem] bg-[#323c4d] text-white'
            onClick={() => setSortOrder(prev => !prev)}
          >
            <i
              className={`fas fa-arrow-up-long ${sortOrder && 'text-[orange]'}`}
            ></i>
            <i
              className={`fas fa-arrow-down-long ${
                !sortOrder && 'text-[orange]'
              }`}
            ></i>{' '}
            {sortOrder ? 'Lowest First' : 'Highest First'}
          </button>
        </div>}
        {influencers.length > 0 ? (
          <div className='overflow-x-auto my-[2rem]'>
            <div className='border-1 border-[#aaa] rounded-lg'>
              <table className='bg-[#19212E] w-screen md:w-full rounded-lg'>
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
                  {influencers
                    .sort((a: Influencer, b: Influencer) => {
                      if (sortOrder) {
                        return b.followers - a.followers
                      } else {
                        return a.followers - b.followers
                      }
                    })
                    .map((person: Influencer, index: number) => (
                      <tr key={index}>
                        <td className='text-center p-[0.5rem]'>{index + 1}</td>
                        <td className='text-center p-[0.5rem] flex flex-col md:flex-row items-center justify-start gap-[1rem]'>
                          <img
                            className={`rounded-full w-[2rem] h-[2rem]`}
                            src={
                              person.profilePhoto ||
                              'https://health-e.in/wp-content/uploads/2023/12/healthcare-concept-with-futuristic-design-graphics-medical-treatment-icons.webp'
                            }
                          />{' '}
                          <Link
                            to={`/influencer/${person._id}`}
                            className='hover:underline'
                          >
                            {person.name}
                          </Link>
                        </td>
                        <td className='text-center p-[0.5rem]'>
                          {person?.claims[0]?.category || '--'}
                        </td>
                        <td
                          className={`text-center p-[0.5rem] ${formatTrustScore(
                            person.claims.reduce(
                              (prev, curr) => prev + curr.trustScore,
                              0
                            ) / person.claims.length
                          )}`}
                        >
                          {person.claims.length > 0
                            ? `${Math.ceil(
                                person.claims.reduce(
                                  (prev, curr) => prev + curr.trustScore,
                                  0
                                ) / person.claims.length
                              )}%`
                            : '--'}
                        </td>
                        <td className='text-center p-[0.5rem]'>
                          <i
                            className={`fas ${
                              person.claims.reduce(
                                (prev, curr) => prev + curr.trustScore,
                                0
                              ) /
                                person.claims.length >
                              50
                                ? 'fa-arrow-trend-up text-green-300'
                                : 'fa-arrow-trend-down text-red-400'
                            }`}
                          ></i>
                        </td>
                        <td className='text-center p-[0.5rem]'>
                          {new Intl.NumberFormat('en-US').format(
                            person.followers
                          )}
                        </td>
                        <td className='text-center p-[0.5rem]'>
                          {person.claims.length}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className='text-center text-white my-[2rem]'>No data available</p>
        )}
      </main>
    </>
  )
}

export default LeaderBoard
