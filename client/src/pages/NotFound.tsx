import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main className='p-[4rem]'>
      <h1 className='text-white text-3xl font-bold'>Page Does Not Exist</h1>
      <p className='text-[#c0c0c0] my-[2rem]'>
        The page you have requested does not exist.{' '}
        <Link to='/' className='light-green-text font-medium hover:underline'>Go back to home</Link>.
      </p>
    </main>
  )
}

export default NotFound
