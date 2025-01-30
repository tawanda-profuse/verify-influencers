import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Pending from '../components/Pending'
import ClaimsAnalysis from '../components/ClaimsAnalysis'
import Products from '../components/Products'

interface Influencer {
  name: string
  twitterUserName: string
  followers: number
  profilePhoto: string
  website: string
  bio: string
  yearlyRevenue: number
  products: [string]
}

type Claim = {
  title: string
  verificationStatus: string
  date: string
  category: string
  source: string
  aiAnalysis: string
  trustScore: number
  researchLink: string
}

const InfluencerDetails = () => {
  const { id } = useParams()
  const apiUrl: string = window.location.origin.includes('localhost')
    ? 'http://localhost:5000'
    : 'https://verify-influencers-backend-six.vercel.app'
  const [influencer, setInfluencer] = useState<Influencer>({} as Influencer)
  const [claims, setClaims] = useState<Claim[]>([])
  const [allClaims, setAllClaims] = useState<Claim[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('Claims Analysis')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/influencers/${id}`)
        setInfluencer(response.data.influencer)
        setClaims(response.data.influencer.claims)
        setAllClaims(response.data.influencer.claims)
        setCategories(
          response.data.influencer.claims.map((item: Claim) => item.category)
        )
      } catch (error) {
        console.error('Error fetching influencer details', error)
        alert('An error has occurred while fetching the influencer details')
        setInfluencer({} as Influencer)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [apiUrl, id])

  const formatTrustScore = (trustScore: number) => {
    if (trustScore >= 90) {
      return 'light-green-text'
    } else if (trustScore <= 90 && trustScore >= 50) {
      return 'text-[orange]'
    } else if (trustScore < 50) {
      return 'text-[tomato]'
    }
  }

  return (
    <>
      {isLoading && <Pending />}
      <main className='p-[1rem] md:p-[4rem]'>
        <div className='flex flex-col md:flex-row gap-[2rem]'>
          <img
            className='w-[12rem] h-[12rem] mx-auto bg-[white] rounded-[50%]'
            src={
              influencer.profilePhoto ||
              'https://health-e.in/wp-content/uploads/2023/12/healthcare-concept-with-futuristic-design-graphics-medical-treatment-icons.webp'
            }
          />
          <div className='flex flex-col w-full md:w-[80%]'>
            <h1 className='text-white text-3xl font-bold'>
              {influencer.name || '--'}
            </h1>
            <div className='flex flex-col md:flex-row flex-wrap gap-[1rem] my-[1rem]'>
              {[...new Set(claims?.map(claim => claim.category))].map(
                (category, index) => (
                  <span
                    key={index}
                    className='text-sm py-[0.5rem] px-[0.5rem] rounded-3xl bg-[#323c4d] text-white text-center'
                  >
                    {category}
                  </span>
                )
              )}
            </div>
            <p className='gray-text w-[70%]'>{influencer.bio || '--'}</p>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 my-[2rem] w-full gap-[1rem]'>
          <div className='bg-[#19212E] w-full flex flex-col gap-[1rem] border border-white rounded-md p-[2rem] relative'>
            <i
              className={`fas ${
                claims.reduce((prev, curr) => prev + curr.trustScore, 0) /
                  claims.length >
                50
                  ? 'fa-arrow-trend-up text-green-300'
                  : 'fa-arrow-trend-down text-red-400'
              } absolute top-6 right-6 ${formatTrustScore(
                claims?.length
                  ? claims.reduce((prev, curr) => prev + curr.trustScore, 0) /
                      claims.length || 0
                  : 0
              )}`}
            ></i>
            <span className='text-white font-bold text-2xl'>Trust Score</span>
            <span
              className={`${formatTrustScore(
                claims?.length > 0
                  ? claims.reduce((prev, curr) => prev + curr.trustScore, 0) /
                      claims.length || 0
                  : 0
              )} text-3xl font-bold`}
            >
              {claims?.length
                ? (
                    claims.reduce((prev, curr) => prev + curr.trustScore, 0) /
                      claims.length || 0
                  ).toFixed(1) + '%'
                : 0}
            </span>
            <span className='gray-text'>Based on 127 verified claims</span>
          </div>
          <div className='bg-[#19212E] w-full flex flex-col gap-[1rem] border border-white rounded-md p-[2rem] relative'>
            <i className='fas fa-dollar-sign absolute top-6 right-6 light-green-text'></i>
            <span className='text-white font-bold text-2xl'>
              Yearly Revenue
            </span>
            <span className='light-green-text text-3xl font-bold'>
              {new Intl.NumberFormat('en-US', {
                currency: 'USD',
                style: 'currency'
              }).format(influencer.yearlyRevenue || 0)}
            </span>
            <span className='gray-text'>Estimated Earnings</span>
          </div>
          <div className='bg-[#19212E] w-full flex flex-col gap-[1rem] border border-white rounded-md p-[2rem] relative'>
            <i className='fas fa-shopping-bag absolute top-6 right-6 light-green-text'></i>
            <span className='text-white font-bold text-2xl'>Products</span>
            <span className='light-green-text text-3xl font-bold'>
              {(influencer?.products && influencer.products.length) || 0}
            </span>
            <span className='gray-text'>Recommended Products</span>
          </div>
          <div className='bg-[#19212E] w-full flex flex-col gap-[1rem] border border-white rounded-md p-[2rem] relative'>
            <Link
              to={`https://x.com/${influencer.twitterUserName}`}
              target='_blank'
              title='View followers'
            >
              <i className='fas fa-users absolute top-6 right-6 text-white hover:text-green-300 hover:underline'></i>
            </Link>
            <span className='text-white font-bold text-2xl'>Followers</span>
            <span className='text-white text-3xl font-bold'>
              {new Intl.NumberFormat('en-US').format(influencer.followers) || 0}
            </span>
            <span className='gray-text'>Total Following</span>
          </div>
        </div>
        <div className='flex gap-[2rem] border-b border-[#d7d7d7]'>
          {['Claims Analysis', 'Recommended Products', 'Monetization'].map(
            (tab, index) => (
              <button
                className={`pb-[0.5rem] light-green-text cursor-pointer ${
                  activeTab === tab
                    ? 'underline decoration-[#74d3a5] underline-offset-[12.5px] decoration-2'
                    : 'light-gray-text hover:underline decoration-[#d7d7d7]'
                }`}
                key={index}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            )
          )}
        </div>
        {activeTab === 'Claims Analysis' && claims && (
          <ClaimsAnalysis
            claims={claims}
            allClaims={allClaims}
            setClaims={setClaims}
            categories={[...new Set(categories)]}
          />
        )}
        {activeTab === 'Recommended Products' && (
          <Products products={influencer.products} />
        )}
      </main>
    </>
  )
}

export default InfluencerDetails
