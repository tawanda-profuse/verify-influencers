import { Link } from 'react-router-dom'

const InfluencerDetails = () => {
  return (
    <main className='p-[4rem]'>
      <div className='flex flex-col md:flex-row gap-[2rem]'>
        <img className='w-[18rem] h-[12rem] md:h-[6rem] mx-auto bg-[white] rounded-[50%]' />
        <div className='flex flex-col'>
          <h1 className='text-white text-3xl font-bold'>Andrew Huberman</h1>
          <div className='flex flex-col md:flex-row gap-[1rem] my-[1rem]'>
            <span className='text-sm cursor-pointer py-[0.5rem] px-[0.5rem] rounded-3xl bg-[#323c4d] text-white'>
              Neuroscience
            </span>
            <span className='text-sm cursor-pointer py-[0.5rem] px-[0.5rem] rounded-3xl bg-[#323c4d] text-white'>
              Sleep
            </span>
            <span className='text-sm cursor-pointer py-[0.5rem] px-[0.5rem] rounded-3xl bg-[#323c4d] text-white'>
              Performance
            </span>
            <span className='text-sm cursor-pointer py-[0.5rem] px-[0.5rem] rounded-3xl bg-[#323c4d] text-white'>
              Hormones
            </span>
            <span className='text-sm cursor-pointer py-[0.5rem] px-[0.5rem] rounded-3xl bg-[#323c4d] text-white'>
              Stress Management
            </span>
            <span className='text-sm cursor-pointer py-[0.5rem] px-[0.5rem] rounded-3xl bg-[#323c4d] text-white'>
              Exercise Science
            </span>
            <span className='text-sm cursor-pointer py-[0.5rem] px-[0.5rem] rounded-3xl bg-[#323c4d] text-white'>
              Light Exposure
            </span>
            <span className='text-sm cursor-pointer py-[0.5rem] px-[0.5rem] rounded-3xl bg-[#323c4d] text-white'>
              Circadian Biology
            </span>
          </div>
          <p className='gray-text w-[70%]'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Repellendus explicabo ad laboriosam accusamus delectus beatae dolore
            voluptate, voluptas officiis, corrupti aperiam fuga nesciunt
            provident eius ea mollitia enim praesentium possimus unde maxime
            doloremque veniam! Aliquid autem saepe sit necessitatibus totam
            ullam recusandae nisi, dolorem aperiam reiciendis repellat corrupti,
            minus velit?
          </p>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 my-[2rem] w-full gap-[1rem]'>
        <div className='bg-[#19212E] w-full flex flex-col gap-[1rem] border border-white rounded-md p-[2rem] relative'>
          <i className='fas fa-arrow-trend-up absolute top-6 right-6 light-green-text'></i>
          <span className='text-white font-bold text-2xl'>Trust Score</span>
          <span className='light-green-text text-3xl font-bold'>89%</span>
          <span className='gray-text'>Based on 127 verified claims</span>
        </div>
        <div className='bg-[#19212E] w-full flex flex-col gap-[1rem] border border-white rounded-md p-[2rem] relative'>
          <i className='fas fa-dollar-sign absolute top-6 right-6 light-green-text'></i>
          <span className='text-white font-bold text-2xl'>Yearly Revenue</span>
          <span className='light-green-text text-3xl font-bold'>$5.0M</span>
          <span className='gray-text'>Estimated Earnings</span>
        </div>
        <div className='bg-[#19212E] w-full flex flex-col gap-[1rem] border border-white rounded-md p-[2rem] relative'>
          <i className='fas fa-shopping-bag absolute top-6 right-6 light-green-text'></i>
          <span className='text-white font-bold text-2xl'>Products</span>
          <span className='light-green-text text-3xl font-bold'>1</span>
          <span className='gray-text'>Recommended Products</span>
        </div>
        <div className='bg-[#19212E] w-full flex flex-col gap-[1rem] border border-white rounded-md p-[2rem] relative'>
          <i className='fas fa-arrow-trend-up absolute top-6 right-6 light-green-text'></i>
          <span className='text-white font-bold text-2xl'>Followers</span>
          <span className='light-green-text text-3xl font-bold'>4.2M+</span>
          <span className='gray-text'>Total Following</span>
        </div>
      </div>
      <div className='flex gap-[2rem] border-b border-[#d7d7d7]'>
        <span className='pb-[0.5rem] light-green-text cursor-pointer underline decoration-[#74d3a5] underline-offset-[12.5px] decoration-2'>
          Claims Analysis
        </span>
        <span className='pb-[0.5rem] light-gray-text cursor-pointer hover:underline decoration-[#d7d7d7] underline-offset-[12.5px] decoration-2'>
          Recommended Products
        </span>
        <span className='pb-[0.5rem] light-gray-text cursor-pointer hover:underline decoration-[#d7d7d7] underline-offset-[12.5px] decoration-2'>
          Monetization
        </span>
      </div>
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
          <span className='text-sm cursor-pointer py-[0.5rem] px-[0.5rem] rounded-3xl bg-[#55b888] text-white font-medium'>
            All Categories
          </span>
          <span className='text-sm cursor-pointer py-[0.5rem] px-[0.5rem] rounded-3xl bg-[#0E131E] text-white'>
            Sleep
          </span>
          <span className='text-sm cursor-pointer py-[0.5rem] px-[0.5rem] rounded-3xl bg-[#0E131E] text-white'>
            Performance
          </span>
          <span className='text-sm cursor-pointer py-[0.5rem] px-[0.5rem] rounded-3xl bg-[#0E131E] text-white'>
            Hormones
          </span>
          <span className='text-sm cursor-pointer py-[0.5rem] px-[0.5rem] rounded-3xl bg-[#0E131E] text-white'>
            Stress Management
          </span>
          <span className='text-sm cursor-pointer py-[0.5rem] px-[0.5rem] rounded-3xl bg-[#0E131E] text-white'>
            Exercise Science
          </span>
          <span className='text-sm cursor-pointer py-[0.5rem] px-[0.5rem] rounded-3xl bg-[#0E131E] text-white'>
            Light Exposure
          </span>
          <span className='text-sm cursor-pointer py-[0.5rem] px-[0.5rem] rounded-3xl bg-[#0E131E] text-white'>
            Circadian Biology
          </span>
        </div>
        <div className='flex flex-col md:flex-row w-full items-center'>
          <div className='grid w-full'>
            <label className='light-gray-text font-medium my-[1rem]'>
              Verification Status
            </label>
            <div className='flex flex-col md:flex-row gap-[1rem]'>
              <button className='text-md cursor-pointer py-[0.5rem] px-[1rem] rounded-lg bg-[#55b888] text-white'>
                Neuroscience
              </button>
              <button className='text-md cursor-pointer py-[0.5rem] px-[1rem] rounded-lg bg-[#0E131E] text-white'>
                Sleep
              </button>
              <button className='text-md cursor-pointer py-[0.5rem] px-[1rem] rounded-lg bg-[#0E131E] text-white'>
                Performance
              </button>
              <button className='text-md cursor-pointer py-[0.5rem] px-[1rem] rounded-lg bg-[#0E131E] text-white'>
                Hormones
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
      <p className='text-[#d7d7d7]'>Showing 10 claims</p>
      <section className='flex flex-col my-[2rem]'>
        <article className='flex flex-col border-b border-white py-[1rem]'>
          <div className='flex justify-between w-full'>
            <div className='flex flex-col gap-[1rem]'>
              <div className='flex items-center gap-[1rem]'>
                <span className='light-green-text bg-[#3E8563] rounded-lg px-[0.5rem]'>
                  Verified
                </span>
                <div className='flex justify-between items-center gray-text w-full'>
                  <div className='flex items-center gap-[0.5rem] gray-text'>
                    <i className='fas fa-calendar-week'></i>
                    <span>14/01/2024</span>
                  </div>
                </div>
              </div>
              <p className='text-white font-medium'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint,
                sit.
              </p>
              <Link to='/' className='light-green-text hover:underline'>
                View Source <i className='fas fa-external-link'></i>
              </Link>
            </div>
            <div className='flex flex-col light-gray-text text-sm gap-[1rem]'>
              <span className='light-green-text text-xl font-bold'>92%</span>
              Trust Score
            </div>
          </div>
          <div className='p-[2rem] flex flex-col gap-[1rem]'>
            <div className='flex items-center gap-[0.5rem] text-white'>
              <i className='fas fa-brain light-green-text'></i>
              AI Analysis
            </div>
            <p className='light-gray-text'>
              Multiple studies confirm light exposure affects cortisol rhythms.
              Timing window supported by research.
            </p>
            <Link to='/' className='light-green-text hover:underline'>
              View Research <i className='fas fa-external-link'></i>
            </Link>
          </div>
        </article>
        <article className='flex flex-col border-b border-white py-[1rem]'>
          <div className='flex justify-between w-full'>
            <div className='flex flex-col gap-[1rem]'>
              <div className='flex items-center gap-[1rem]'>
                <span className='light-green-text bg-[#3E8563] rounded-lg px-[0.5rem]'>
                  Verified
                </span>
                <div className='flex justify-between items-center gray-text w-full'>
                  <div className='flex items-center gap-[0.5rem] gray-text'>
                    <i className='fas fa-calendar-week'></i>
                    <span>14/01/2024</span>
                  </div>
                </div>
              </div>
              <p className='text-white font-medium'>Example 2</p>
              <Link to='/' className='light-green-text hover:underline'>
                View Source <i className='fas fa-external-link'></i>
              </Link>
            </div>
            <div className='flex flex-col light-gray-text text-sm gap-[1rem]'>
              <span className='light-green-text text-xl font-bold'>92%</span>
              Trust Score
            </div>
          </div>
          <div className='p-[2rem] flex flex-col gap-[1rem]'>
            <div className='flex items-center gap-[0.5rem] text-white'>
              <i className='fas fa-brain light-green-text'></i>
              AI Analysis
            </div>
            <p className='light-gray-text'>
              Multiple studies confirm light exposure affects cortisol rhythms.
              Timing window supported by research.
            </p>
            <Link to='/' className='light-green-text hover:underline'>
              View Research <i className='fas fa-external-link'></i>
            </Link>
          </div>
        </article>
      </section>
    </main>
  )
}

export default InfluencerDetails
