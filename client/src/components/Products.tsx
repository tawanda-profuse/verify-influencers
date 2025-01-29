interface ProductsProps {
  products: string[]
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <>
      {products.length > 0 ? (
        <>
          {products.map((product: string, index: number) => (
            <article
              className='flex flex-col border-b border-white py-[1rem]'
              key={index}
            >
              <div className='flex justify-between w-full'>
                <div className='flex gap-[1rem] text-white font-medium'>
                  <span>{index + 1}.</span>
                  <p>{product}</p>
                </div>
              </div>
            </article>
          ))}
        </>
      ) : (
        <p className='text-center light-gray-text my-[2rem]'>No data available</p>
      )}
    </>
  )
}

export default Products
