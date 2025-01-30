import { Link } from 'react-router-dom'

const About = () => {
  return (
    <>
      <main className='my-[2rem] p-[1rem] md:p-[4rem] mx-auto w-full md:w-3/4'>
        <Link to='/' className='dark-green-text font-medium hover:underline'>
          <i className='fas fa-arrow-left'></i> Go to Research
        </Link>
        <h1 className='text-white text-3xl font-bold text-center mt-[1rem]'>
          About Verify Influencers
        </h1>
        <p className='light-gray-text mx-auto text-justify my-[2rem]'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
          accusamus exercitationem aliquam explicabo ad? Illo sed velit nostrum
          ratione mollitia?
        </p>
        <p className='light-gray-text mx-auto text-justify my-[2rem]'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi
          laboriosam distinctio iure porro recusandae, error doloribus nobis
          soluta possimus a molestiae eveniet totam aperiam odio magnam aliquid
          esse maiores! Quae debitis excepturi exercitationem inventore
          aspernatur. Voluptates ullam sed explicabo possimus provident
          perferendis aspernatur, maxime cumque expedita, veritatis iure commodi
          earum?
        </p>
        <p className='light-gray-text mx-auto text-justify my-[2rem]'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi
          laboriosam distinctio iure porro recusandae, error doloribus nobis
          soluta possimus a molestiae eveniet totam aperiam odio magnam aliquid
          esse maiores! Quae debitis excepturi exercitationem inventore
          aspernatur. Voluptates ullam sed explicabo possimus provident
          perferendis aspernatur, maxime cumque expedita, veritatis iure commodi
          earum?
        </p>
      </main>
    </>
  )
}

export default About
