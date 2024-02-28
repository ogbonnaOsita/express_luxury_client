
/* eslint-disable react/prop-types */
const ProductList = ({ products, gridLg = "lg:grid-cols-5" }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-7 pb-20 pt-10 mx-auto">
        <div
          className={`grid ${gridLg} md:grid-cols-4 grid-cols-2 gap-2 md:gap-4 lg:gap-6 -m-4`}
        >
          {products.map((product, i) => {
            return (
              <a href={`/products/${product?.slug}`} key={i}>
                <div className="cursor-pointer hover:shadow-lg bg-white h-full rounded-md">
                  <div className=" block relative h-64 rounded-md overflow-hidden border-b border-opacity-30">
                    <img
                      alt="ecommerce"
                      className="object-cover object-top w-full h-full block   hover:scale-110 ease-in-out duration-200"
                      src={product?.images[0]}
                    />
                  </div>
                  <div className="p-2">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font">
                      {product?.category[0].title.toUpperCase()}
                    </h3>
                    <h2 className="text-gray-900 text-base font-semibold">
                      {product?.title}
                    </h2>
                    <div className="flex place-items-center">
                      <h4 className="font-semibold text-brown-500">
                        ${product?.price.toFixed(1)}
                      </h4>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
