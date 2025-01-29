import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Pending from '../components/Pending'

const Research = () => {
  const apiUrl = window.location.origin.includes('localhost')
    ? 'http://localhost:5000'
    : 'https://verify-influencers-backend-six.vercel.app/'
  const [influencerName, setInfluencerName] = useState('')
  const [researchType, setResearchType] = useState('specific')
  const [numberOfClaims, setNumberOfClaims] = useState(50)
  const [journals, setJournals] = useState<string[]>([])
  const [products, setProducts] = useState(10)
  const [revenueAnalysis, setRevenueAnalysis] = useState(false)
  const [verifyWithScientificJournals, setVerifyWithScientificJournals] =
    useState(true)
  const [dateRange, setDateRange] = useState('All Time')
  const [notes, setNotes] = useState('')
  const [newJournal, setNewJournal] = useState(false)
  const [newJournalValue, setNewJournalValue] = useState('')
  const [isPending, setIsPending] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setIsPending(true)
    try {
      await axios.post(`${apiUrl}/discover`, {
        influencerName,
        researchType,
        dateRange,
        numberOfClaims,
        journals,
        products,
        revenueAnalysis,
        verifyWithScientificJournals,
        notes
      })
      navigate('/leaderboard')
    } catch (error) {
      console.error('Error: ', error)
      alert('Error while generating research')
    } finally {
      setIsPending(false)
    }
  }

  const [scientificJournals, setScientificJournals] = useState([
    'PubMed Central',
    'Nature',
    'Science',
    'Cell',
    'The Lancet',
    'New England Journal of Medicine',
    'JAMA Network'
  ])

  const updateJournalList = (journal: string) => {
    if (journals.includes(journal)) {
      setJournals(prev => prev.filter(item => item !== journal))
    } else {
      setJournals(prev => [...prev, journal])
    }
  }

  const activateButton = (): boolean => {
    if (researchType === 'specific' && !influencerName) {
      return false
    }
    if (verifyWithScientificJournals && journals.length <= 0) {
      return false
    }
    return true
  }

  const items = [
    'Discovering influencers',
    'Pulling recent health-related data',
    'Removing duplicate claims',
    'Categorising claims',
    'Cross-referencing with scientific journals',
    'Determining verification status'
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length)
    }, 4000)

    return () => clearInterval(interval) // Cleanup interval on unmount
  }, [])

  return (
    <>
      {isPending && (
        <>
          <Pending />
          <div className='fixed z-[1000] left-0 bottom-0 w-full h-[80vh] flex justify-center items-center'>
            <p className='text-white text-3xl'>{items[currentIndex]}...</p>
          </div>
        </>
      )}
      <main className='p-[4rem]'>
        <div className='flex gap-[1rem] items-center mb-[2rem]'>
          <Link to='/leaderboard' className='dark-green-text font-medium'>
            <i className='fas fa-arrow-left'></i> Back to Dashboard
          </Link>
          <h1 className='text-white text-3xl font-bold'>Research Tasks</h1>
        </div>
        <section className='border border-[#A2A4A8] p-[2rem] rounded-md bg-[#131A24]'>
          <h2 className='text-white font-bold text-xl'>
            <i className='fas fa-gear dark-green-text'></i> Research
            Configuration
          </h2>
          <div className='flex flex-col md:flex-row my-[2rem] gap-[1rem]'>
            <button
              className={`w-full md:w-2/4 grid p-[1rem] gray-text rounded-lg hover:underline decoration-[white] cursor-pointer border ${
                researchType === 'specific'
                  ? 'border-[#3E8563] opaque-green-bg'
                  : 'border-white'
              }`}
              onClick={() => setResearchType('specific')}
            >
              <span className='text-white'>Specific Influencer</span>
              Research a known influencer by name
            </button>
            <button
              className={`w-full md:w-2/4 grid p-[1rem] gray-text rounded-lg hover:underline decoration-[white] cursor-pointer border ${
                researchType === 'discover'
                  ? 'border-[#3E8563] opaque-green-bg'
                  : 'border-white'
              }`}
              onClick={() => setResearchType('discover')}
            >
              <span className='text-white'>Discover New</span>
              Find and analyze new health influencers
            </button>
          </div>
          <div className='flex flex-col md:flex-row gap-[1rem]'>
            <div className='flex flex-col w-full md:w-2/4'>
              <label className='light-gray-text font-medium'>Time Range</label>
              <div className='grid grid-cols-2 my-[0.5rem] gap-[0.5rem]'>
                {['All Time', 'Last Week', 'Last Month', 'Last Year'].map(
                  (item, index) => (
                    <button
                      className={`text-center p-[0.5rem] cursor-pointer rounded-md border ${
                        dateRange === item
                          ? 'light-green-text border-[#3E8563] opaque-green-bg'
                          : 'light-gray-text border-[#929499]'
                      }`}
                      key={index}
                      onClick={() => setDateRange(item)}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
              {researchType === 'specific' && (
                <>
                  {' '}
                  <label className='light-gray-text font-medium my-[1rem]'>
                    Influencer Name
                  </label>
                  <span className='relative'>
                    <i className='fas fa-search absolute light-gray-text top-2/4 -translate-y-2/4 left-4'></i>
                    <input
                      type='text'
                      className='w-full px-[3rem] py-[0.5rem] placeholder-[#d7d7d7] light-gray-text border border-[#d7d7d7] rounded-md outline-none mb-[0.5rem] bg-[#0E131E]'
                      placeholder='Enter influencer name'
                      onChange={e => setInfluencerName(e.target.value)}
                    />
                  </span>
                </>
              )}
              <span>
                <label className='light-gray-text font-medium my-[1rem]'>
                  Claims to Analyze Per Influencer
                </label>
                <input
                  type='number'
                  value={numberOfClaims}
                  className='w-full px-[1rem] py-[0.5rem] placeholder-[#d7d7d7] light-gray-text border border-[#d7d7d7] rounded-md outline-none mb-[0.5rem] mt-[1rem] bg-[#0E131E]'
                  placeholder='Enter influencer name'
                  onChange={e => setNumberOfClaims(Number(e.target.value))}
                />
                <p className='text-sm text-[#c0c0c0]'>
                  Recommended: 50-100 claims for comprehensive analysis
                </p>
              </span>
            </div>
            <div className='flex flex-col w-full md:w-2/4'>
              <span>
                <label className='light-gray-text font-medium my-[1rem]'>
                  Products to Find Per Influencer
                </label>
                <input
                  type='number'
                  className='w-full px-[1rem] py-[0.5rem] placeholder-[#d7d7d7] light-gray-text border border-[#d7d7d7] rounded-md outline-none mb-[0.5rem] mt-[1rem] bg-[#0E131E]'
                  value={10}
                  onChange={e => setProducts(Number(e.target.value))}
                />
                <p className='text-sm text-[#c0c0c0]'>
                  Set to 0 to skip product research
                </p>
              </span>
              <span className='flex mt-[1rem] items-start justify-between'>
                <span className='flex flex-col gap-[1rem] text-[#c3c3c3] font-medium my-[1rem]'>
                  <p className={`${revenueAnalysis && 'light-green-text'}`}>
                    Include Revenue Analysis
                  </p>
                  <p className='text-sm gray-text'>
                    Analyze monetization methods and estimate earnings
                  </p>
                </span>
                <label
                  htmlFor='revenue-analysis'
                  className='mt-[1rem] cursor-pointer'
                >
                  <i
                    className={`fas ${
                      revenueAnalysis ? 'fa-toggle-on' : 'fa-toggle-off'
                    } text-[#428D67] text-4xl`}
                  ></i>
                  <input
                    id='revenue-analysis'
                    type='checkbox'
                    className='hidden'
                    onChange={() => setRevenueAnalysis(prev => !prev)}
                  />
                </label>
              </span>
              <span className='flex items-start justify-between'>
                <span className='flex flex-col gap-[1rem] text-[#c3c3c3] font-medium my-[1rem]'>
                  <p
                    className={`${
                      verifyWithScientificJournals && 'light-green-text'
                    }`}
                  >
                    Verify with Scientific Journals
                  </p>
                  <p className='text-sm gray-text'>
                    Cross-reference claims with scientific literature
                  </p>
                </span>
                <label
                  className='mt-[1rem] cursor-pointer'
                  htmlFor='cross-reference'
                >
                  <i
                    className={`fas ${
                      verifyWithScientificJournals
                        ? 'fa-toggle-on'
                        : 'fa-toggle-off'
                    } text-[#428D67] text-4xl`}
                  ></i>
                  <input
                    id='cross-reference'
                    type='checkbox'
                    className='hidden'
                    onChange={() =>
                      setVerifyWithScientificJournals(prev => !prev)
                    }
                  />
                </label>
              </span>
            </div>
          </div>
          {verifyWithScientificJournals && (
            <div className='my-[1rem]'>
              <div className='flex justify-between'>
                <h3 className='light-gray-text font-medium my-[1rem]'>
                  Scientific Journals
                </h3>
                <span className='flex gap-[0.5rem]'>
                  <button
                    className='light-green-text cursor-pointer hover:underline'
                    onClick={() => setJournals(scientificJournals)}
                  >
                    Select All
                  </button>
                  <button className='text-[#b3b3b3]'>|</button>
                  <button
                    className='light-green-text cursor-pointer hover:underline'
                    onClick={() => setJournals([])}
                  >
                    Deselect All
                  </button>
                </span>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 w-full my-[1rem] gap-[1rem]'>
                {scientificJournals.length > 0 ? (
                  scientificJournals.map((journal, index) => (
                    <button
                      className={`w-full p-[1rem] text-white rounded-lg hover:underline decoration-[white] cursor-pointer border border-[#3E8563] ${
                        journals.includes(journal) && 'opaque-green-bg'
                      } flex justify-between items-center`}
                      key={index}
                      onClick={() => updateJournalList(journal)}
                    >
                      {journal}{' '}
                      {journals.includes(journal) && (
                        <i className='fas fa-circle dark-green-text'></i>
                      )}
                    </button>
                  ))
                ) : (
                  <p className='light-green-text font-bold'>
                    No journals available
                  </p>
                )}
              </div>
              <span className='flex flex-col items-start'>
                <button
                  className='light-green-text cursor-pointer hover:underline'
                  onClick={() => {
                    if (newJournal) {
                      setNewJournal(false)
                    } else {
                      setNewJournal(true)
                    }
                  }}
                >
                  {newJournal ? (
                    <>
                      <i className='fas fa-times'></i> Close
                    </>
                  ) : (
                    <>
                      <i className='fas fa-plus'></i> Add New Journal
                    </>
                  )}
                </button>
                {newJournal && (
                  <div className='flex items-center gap-[1rem] w-full'>
                    <input
                      type='text'
                      className='w-full px-[1rem] py-[0.5rem] placeholder-[#d7d7d7] light-gray-text border border-[#d7d7d7] rounded-md outline-none mb-[0.5rem] mt-[1rem] bg-[#0E131E]'
                      placeholder='New journal name'
                      onChange={e => setNewJournalValue(e.target.value)}
                    />
                    <button
                      className='green-background px-[0.5rem] py-[0.3rem] rounded-md cursor-pointer'
                      onClick={() =>
                        setScientificJournals(prev => [
                          ...prev,
                          newJournalValue
                        ])
                      }
                    >
                      <i className='fas fa-check-circle text-white text-3xl'></i>
                    </button>
                  </div>
                )}
              </span>
            </div>
          )}
          <div className='flex flex-col'>
            <label className='light-gray-text font-medium my-[1rem]'>
              Notes for Research Assistant
            </label>
            <textarea
              className='w-full px-[1rem] py-[0.5rem] placeholder-[#d7d7d7] light-gray-text border border-[#d7d7d7] rounded-md outline-none mb-[0.5rem] bg-[#0E131E]'
              placeholder='Add any specific instructions of focus areas...'
              onChange={e => setNotes(e.target.value)}
            />
            <button
              className={`mt-[2rem] self-end green-background outline-0 text-white py-[0.5rem] px-[1rem] rounded-md ${
                activateButton()
                  ? 'opacity-100 cursor-pointer'
                  : 'opacity-50 cursor-not-allowed'
              }`}
              onClick={handleSubmit}
              disabled={activateButton() ? false : true}
            >
              <i className='fas fa-plus'></i> Start Research
            </button>
          </div>
        </section>
      </main>
    </>
  )
}

export default Research
