import { Link } from 'react-router-dom'

const Research = () => {
  return (
    <main className='p-[4rem]'>
      <div className='flex gap-[1rem] items-center mb-[2rem]'>
        <Link to='/' className='dark-green-text font-medium'>
          <i className='fas fa-arrow-left'></i> Back to Dashboard
        </Link>
        <h1 className='text-white text-3xl font-bold'>Research Tasks</h1>
      </div>
      <section className='border border-[#A2A4A8] p-[2rem] rounded-md bg-[#131A24]'>
        <h2 className='text-white font-bold text-xl'>
          <i className='fas fa-gear dark-green-text'></i> Research Configuration
        </h2>
        <div className='flex flex-col md:flex-row my-[2rem] gap-[1rem]'>
          <button className='w-full md:w-2/4 grid p-[1rem] gray-text rounded-lg hover:underline decoration-[white] cursor-pointer border border-[#3E8563] opaque-green-bg'>
            <span className='text-white'>Specific Influencer</span>
            Research a known influencer by name
          </button>
          <button className='w-full md:w-2/4 grid p-[1rem] gray-text rounded-lg hover:underline decoration-[white] cursor-pointer border border-white'>
            <span className='text-white'>Discover New</span>
            Find and analyze new health influencers
          </button>
        </div>
        <div className='flex flex-col md:flex-row gap-[1rem]'>
          <div className='flex flex-col w-full md:w-2/4'>
            <label className='light-gray-text font-medium'>Time Range</label>
            <div className='grid grid-cols-2 my-[0.5rem] gap-[0.5rem]'>
              <button className='text-center p-[0.5rem] cursor-pointer rounded-md light-gray-text border border-[#929499]'>
                Last Week
              </button>
              <button className='text-center p-[0.5rem] cursor-pointer rounded-md light-green-text border border-[#3E8563] opaque-green-bg'>
                Last Month
              </button>
            </div>
            <div className='grid grid-cols-2 my-[0.5rem] gap-[0.5rem]'>
              <button className='text-center p-[0.5rem] cursor-pointer rounded-md light-gray-text border border-[#929499]'>
                Last Year
              </button>
              <button className='text-center p-[0.5rem] cursor-pointer rounded-md light-gray-text border border-[#929499]'>
                All Time
              </button>
            </div>
            <label className='light-gray-text font-medium my-[1rem]'>
              Influencer Name
            </label>
            <span className='relative'>
              <i className='fas fa-search absolute light-gray-text top-2/4 -translate-y-2/4 left-4'></i>
              <input
                type='text'
                className='w-full px-[3rem] py-[0.5rem] placeholder-[#d7d7d7] light-gray-text border border-[#d7d7d7] rounded-md outline-none mb-[0.5rem] bg-[#0E131E]'
                placeholder='Enter influencer name'
              />
            </span>
            <span>
              <label className='light-gray-text font-medium my-[1rem]'>
                Claims to Analyze Per Influencer
              </label>
              <input
                type='number'
                value={50}
                className='w-full px-[1rem] py-[0.5rem] placeholder-[#d7d7d7] light-gray-text border border-[#d7d7d7] rounded-md outline-none mb-[0.5rem] mt-[1rem] bg-[#0E131E]'
                placeholder='Enter influencer name'
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
              />
              <p className='text-sm text-[#c0c0c0]'>
                Set to 0 to skip product research
              </p>
            </span>
            <span className='flex mt-[1rem] items-start justify-between'>
              <span className='flex flex-col gap-[1rem] text-[#c3c3c3] font-medium my-[1rem]'>
                <p>Include Revenue Analysis</p>
                <p className='text-sm light-gray-text'>
                  Analyze monetization methods and estimate earnings
                </p>
              </span>
              <label
                htmlFor='revenue-analysis'
                className='mt-[1rem] cursor-pointer'
              >
                <i className='fas fa-toggle-on text-[#428D67] text-4xl'></i>
                <input id='revenue-analysis' type='checkbox' className='' />
              </label>
            </span>
            <span className='flex items-start justify-between'>
              <span className='flex flex-col gap-[1rem] text-[#c3c3c3] font-medium my-[1rem]'>
                <p>Verify with Scientific Journals</p>
                <p className='text-sm light-gray-text'>
                  Cross-reference claims with scientific literature
                </p>
              </span>
              <label
                className='mt-[1rem] cursor-pointer'
                htmlFor='cross-reference'
              >
                <i className='fas fa-toggle-off text-[#428D67] text-4xl'></i>
                <input id='cross-reference' type='checkbox' className='' />
              </label>
            </span>
          </div>
        </div>
        <div className='my-[1rem]'>
          <div className='flex justify-between'>
            <h3 className='light-gray-text font-medium my-[1rem]'>
              Scientific Journals
            </h3>
            <span className='flex gap-[0.5rem]'>
              <button className='light-green-text cursor-pointer hover:underline'>
                Select All
              </button>
              <button className='text-[#b3b3b3]'>|</button>
              <button className='light-green-text cursor-pointer hover:underline'>
                Deselect All
              </button>
            </span>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 w-full my-[1rem] gap-[1rem]'>
            <button className='w-full p-[1rem] text-white rounded-lg hover:underline decoration-[white] cursor-pointer border border-[#3E8563] opaque-green-bg flex justify-between items-center'>
              PubMed Central <i className='fas fa-circle dark-green-text'></i>
            </button>
            <button className='w-full p-[1rem] text-white rounded-lg hover:underline decoration-[white] cursor-pointer border border-[#3E8563] opaque-green-bg flex justify-between items-center'>
              Nature <i className='fas fa-circle dark-green-text'></i>
            </button>
            <button className='w-full p-[1rem] text-white rounded-lg hover:underline decoration-[white] cursor-pointer border border-[#3E8563] opaque-green-bg flex justify-between items-center'>
              Science <i className='fas fa-circle dark-green-text'></i>
            </button>
            <button className='w-full p-[1rem] text-white rounded-lg hover:underline decoration-[white] cursor-pointer border border-[#3E8563] opaque-green-bg flex justify-between items-center'>
              Cell <i className='fas fa-circle dark-green-text'></i>
            </button>
            <button className='w-full p-[1rem] text-white rounded-lg hover:underline decoration-[white] cursor-pointer border border-[#3E8563] opaque-green-bg flex justify-between items-center'>
              The Lancet <i className='fas fa-circle dark-green-text'></i>
            </button>
            <button className='w-full p-[1rem] text-white rounded-lg hover:underline decoration-[white] cursor-pointer border border-[#3E8563] opaque-green-bg flex justify-between items-center'>
              New England Journal of Medicine{' '}
              <i className='fas fa-circle dark-green-text'></i>
            </button>
            <button className='w-full p-[1rem] text-white rounded-lg hover:underline decoration-[white] cursor-pointer border border-[#3E8563] opaque-green-bg flex justify-between items-center'>
              JAMA Network <i className='fas fa-circle dark-green-text'></i>
            </button>
          </div>
          <button className='light-green-text cursor-pointer hover:underline'>
            <i className='fas fa-plus'></i> Add New Journal
          </button>
        </div>
        <div className='flex flex-col'>
          <label className='light-gray-text font-medium my-[1rem]'>
            Notes for Research Assistant
          </label>
          <textarea
            className='w-full px-[1rem] py-[0.5rem] placeholder-[#d7d7d7] light-gray-text border border-[#d7d7d7] rounded-md outline-none mb-[0.5rem] bg-[#0E131E]'
            placeholder='Add any specific instructions of focus areas...'
          />
          <button className='mt-[2rem] self-end green-background text-white py-[0.5rem] px-[1rem] rounded-md opacity-50'>
            <i className='fas fa-plus'></i> Start Research
          </button>
        </div>
      </section>
    </main>
  )
}

export default Research
