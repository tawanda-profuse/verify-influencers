import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

interface Claim {
  category: string
  verificationStatus: string
  date: string
  title: string
  trustScore: number
  aiAnalysis: string
  researchLink: string
}

interface ClaimsAnalysisProps {
  claims: Claim[]
  allClaims: Claim[]
  categories: string[]
  setClaims: React.Dispatch<React.SetStateAction<Claim[]>>
  username: string
}

const ClaimsAnalysis = ({
  claims,
  allClaims,
  setClaims,
  categories,
  username
}: ClaimsAnalysisProps) => {
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [verificationFilter, setVerificationFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('')
  const [textFilter, setTextFilter] = useState('')
  const textFilterRef = useRef<HTMLInputElement>(null)

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
      <div className='flex flex-col my-[2rem] p-[2rem] bg-[#323c4d] rounded-lg'>
        <span className='relative'>
          <i className='fas fa-search absolute light-gray-text top-2/4 -translate-y-2/4 left-4'></i>
          <input
            type='text'
            className='w-full px-[3rem] py-[0.5rem] placeholder-[#d7d7d7] light-gray-text border border-[#d7d7d7] rounded-md outline-none mb-[0.5rem] bg-[#0E131E]'
            placeholder='Search claims...'
            ref={textFilterRef}
            onChange={e => {
              const value = e.target.value.toLowerCase()
              if (value === '') {
                setClaims(allClaims)
              } else {
                setClaims(
                  allClaims.filter(claim =>
                    claim.title.toLowerCase().includes(value)
                  )
                )
              }
              setTextFilter(value)
              setCategoryFilter('All')
              setVerificationFilter('All')
              setDateFilter('')
            }}
          />
        </span>
        <label className='light-gray-text font-medium my-[1rem]'>
          Categories
        </label>
        <div className='flex flex-col md:flex-row flex-wrap gap-[1rem]'>
          <button
            className={`text-sm cursor-pointer py-[0.5rem] px-[0.5rem] rounded-3xl ${
              categoryFilter === 'All' ? 'bg-[#55b888]' : 'bg-[#0E131E]'
            } text-white font-medium`}
            onClick={() => {
              setCategoryFilter('All')
              setVerificationFilter('All')
              setDateFilter('')
              setClaims(allClaims)
              setTextFilter('')
              if (textFilterRef.current) {
                textFilterRef.current.value = ''
              }
            }}
          >
            All Categories
          </button>
          {categories?.map((category, index) => (
            <button
              key={index}
              className={`text-sm cursor-pointer py-[0.5rem] px-[0.5rem] rounded-3xl ${
                categoryFilter === category ? 'bg-[#55b888]' : 'bg-[#0E131E]'
              } text-white`}
              onClick={() => {
                setCategoryFilter(category)
                setVerificationFilter('All')
                setDateFilter('')
                setClaims(
                  allClaims.filter(claim => claim.category === category)
                )
                setTextFilter('')
                if (textFilterRef.current) {
                  textFilterRef.current.value = ''
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>
        <div className='flex flex-col md:flex-row w-full items-center'>
          <div className='grid w-full'>
            <label className='light-gray-text font-medium my-[1rem]'>
              Verification Status
            </label>
            <div className='flex flex-col md:flex-row flex-wrap gap-[1rem]'>
              <button
                className={`text-md cursor-pointer py-[0.5rem] px-[1rem] rounded-lg ${
                  verificationFilter === 'All' ? 'bg-[#55b888]' : 'bg-[#0E131E]'
                } text-white`}
                onClick={() => {
                  setVerificationFilter('All')
                  setCategoryFilter('All')
                  setDateFilter('')
                  setClaims(allClaims)
                  setTextFilter('')
                  if (textFilterRef.current) {
                    textFilterRef.current.value = ''
                  }
                }}
              >
                All Statuses
              </button>
              {['Verified', 'Questionable', 'Debunked'].map((item, index) => (
                <button
                  className={`text-md cursor-pointer py-[0.5rem] px-[1rem] rounded-lg ${
                    verificationFilter === item
                      ? 'bg-[#55b888]'
                      : 'bg-[#0E131E]'
                  } text-white`}
                  key={index}
                  onClick={() => {
                    setVerificationFilter(item)
                    setCategoryFilter('All')
                    setDateFilter('')
                    setClaims(
                      allClaims.filter(
                        claim => claim.verificationStatus === item
                      )
                    )
                    setTextFilter('')
                    if (textFilterRef.current) {
                      textFilterRef.current.value = ''
                    }
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className='grid w-full'>
            <label className='light-gray-text font-medium my-[1rem]'>
              Sort By
            </label>
            <input
              type='date'
              className='w-full px-[1rem] py-[0.5rem] placeholder-[#d7d7d7] light-gray-text border border-[#d7d7d7] rounded-md outline-none mb-[0.5rem] bg-[#0E131E] cursor-pointer'
              onChange={e => {
                setTextFilter('')
                setDateFilter(e.target.value)
                setCategoryFilter('All')
                setVerificationFilter('All')
                setClaims(
                  allClaims.filter(
                    item =>
                      new Date(item.date).toDateString() ===
                      new Date(e.target.value).toDateString()
                  )
                )
              }}
            />
          </div>
        </div>
        <div className='flex items-center gap-[0.5rem] text-[#d7d7d7] mt-[2rem]'>
          <i className='fas fa-filter'></i>
          <span>
            Active Filters:{' '}
            <span className='opaque-green-bg text-white py-[0.2rem] px-[0.5rem] rounded-lg'>
              {categoryFilter !== 'All' && categoryFilter}
              {verificationFilter !== 'All' && verificationFilter}
              {dateFilter &&
                new Date(dateFilter).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              {textFilter !== '' && textFilter !== null && textFilter}
            </span>
          </span>
        </div>
      </div>
      <p className='text-[#d7d7d7]'>Showing {claims?.length || 0} claims</p>
      <section className='flex flex-col my-[2rem]'>
        {claims?.map((claim, index) => (
          <article
            className='flex flex-col border-b border-white py-[1rem]'
            key={index}
          >
            <div className='flex justify-between w-full'>
              <div className='flex flex-col gap-[1rem]'>
                <div className='flex items-center gap-[1rem]'>
                  <span
                    className={`${
                      claim.verificationStatus === 'Verified'
                        ? 'bg-[#3E8563] text-white'
                        : claim.verificationStatus === 'Questionable'
                        ? 'bg-[orange] text-black'
                        : 'bg-[tomato] text-white'
                    } rounded-lg px-[0.5rem]`}
                  >
                    {claim.verificationStatus}
                  </span>
                  <div className='flex justify-between items-center gray-text w-full'>
                    <div className='flex items-center gap-[0.5rem] gray-text'>
                      <i className='fas fa-calendar-week'></i>
                      <span>
                        {new Date(claim.date).toLocaleDateString('en-US', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <p className='text-white font-medium'>{claim.title}</p>
                <Link
                  to={`https://x.com/${username}`}
                  target='_blank'
                  className='light-green-text hover:underline'
                >
                  View Source <i className='fas fa-external-link'></i>
                </Link>
              </div>
              <div className='flex flex-col light-gray-text text-sm gap-[1rem]'>
                <span
                  className={`${formatTrustScore(
                    claim.trustScore
                  )} text-xl font-bold`}
                >
                  {claim.trustScore}%
                </span>
                Trust Score
              </div>
            </div>
            <div className='p-[2rem] flex flex-col gap-[1rem]'>
              <div className='flex items-center gap-[0.5rem] text-white'>
                <i className='fas fa-brain light-green-text'></i>
                AI Analysis
              </div>
              <p className='light-gray-text'>{claim.aiAnalysis}</p>
              <Link
                to={claim.researchLink}
                target='_blank'
                className='light-green-text hover:underline'
              >
                View Research <i className='fas fa-external-link'></i>
              </Link>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

export default ClaimsAnalysis
