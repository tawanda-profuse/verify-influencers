import { Link } from 'react-router-dom'

interface Claim {
  category: string
  verificationStatus: string
  date: string
  title: string
  source: string
  trustScore: number
  aiAnalysis: string
  researchLink: string
}

interface Influencer {
  claims: Claim[]
}

const ClaimsAnalysis = ({ influencer }: { influencer: Influencer }) => {
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
          />
        </span>
        <label className='light-gray-text font-medium my-[1rem]'>
          Categories
        </label>
        <div className='flex flex-col md:flex-row gap-[1rem]'>
          <button className='text-sm cursor-pointer py-[0.5rem] px-[0.5rem] rounded-3xl bg-[#55b888] text-white font-medium'>
            All Categories
          </button>
          {[...new Set(influencer.claims?.map(claim => claim.category))]?.map(
            (category, index) => (
              <button
                key={index}
                className='text-sm cursor-pointer py-[0.5rem] px-[0.5rem] rounded-3xl bg-[#0E131E] text-white'
              >
                {category}
              </button>
            )
          )}
        </div>
        <div className='flex flex-col md:flex-row w-full items-center'>
          <div className='grid w-full'>
            <label className='light-gray-text font-medium my-[1rem]'>
              Verification Status
            </label>
            <div className='flex flex-col md:flex-row gap-[1rem]'>
              <button className='text-md cursor-pointer py-[0.5rem] px-[1rem] rounded-lg bg-[#55b888] text-white'>
                All Statuses
              </button>
              <button className='text-md cursor-pointer py-[0.5rem] px-[1rem] rounded-lg bg-[#0E131E] text-white'>
                Verified
              </button>
              <button className='text-md cursor-pointer py-[0.5rem] px-[1rem] rounded-lg bg-[#0E131E] text-white'>
                Questionable
              </button>
              <button className='text-md cursor-pointer py-[0.5rem] px-[1rem] rounded-lg bg-[#0E131E] text-white'>
                Debunked
              </button>
            </div>
          </div>
          <div className='grid w-full'>
            <label className='light-gray-text font-medium my-[1rem]'>
              Sort By
            </label>
            <div className='flex gap-[1rem]'>
              <input
                type='date'
                className='w-full px-[1rem] py-[0.5rem] placeholder-[#d7d7d7] light-gray-text border border-[#d7d7d7] rounded-md outline-none mb-[0.5rem] bg-[#0E131E] accent-white cursor-pointer'
                placeholder='Search claims...'
              />
              <button className='cursor-pointer bg-[#0E131E] px-[1rem] rounded-md flex flex-col items-center justify-center'>
                <i className='fas fa-arrow-down-wide-short light-gray-text'></i>
              </button>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-[0.5rem] text-[#d7d7d7] mt-[2rem]'>
          <i className='fas fa-filter'></i>
          <span>Active Filters:</span>
        </div>
      </div>
      <p className='text-[#d7d7d7]'>
        Showing {influencer?.claims?.length || 0} claims
      </p>
      <section className='flex flex-col my-[2rem]'>
        {influencer.claims?.map((claim, index) => (
          <article
            className='flex flex-col border-b border-white py-[1rem]'
            key={index}
          >
            <div className='flex justify-between w-full'>
              <div className='flex flex-col gap-[1rem]'>
                <div className='flex items-center gap-[1rem]'>
                  <span className='light-green-text bg-[#3E8563] rounded-lg px-[0.5rem]'>
                    {claim.verificationStatus}
                  </span>
                  <div className='flex justify-between items-center gray-text w-full'>
                    <div className='flex items-center gap-[0.5rem] gray-text'>
                      <i className='fas fa-calendar-week'></i>
                      <span>{claim.date}</span>
                    </div>
                  </div>
                </div>
                <p className='text-white font-medium'>{claim.title}</p>
                <Link
                  to={claim.source}
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
