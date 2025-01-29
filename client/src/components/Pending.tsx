const Pending = () => {
  return (
    <div className='fixed z-[1000] left-0 top-0 w-full h-screen bg-[rgb(14,19,30)] opacity-50 flex justify-center items-center'>
      <i className='fas fa-spinner text-white text-6xl animate-spin'></i>
    </div>
  )
}

export default Pending
