import { Link } from "react-router-dom";

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
              <Link to={`/products/${product?.attributes.slug}`} key={i}>
                <div className="cursor-pointer hover:shadow-lg bg-white h-full rounded-md">
                  <div className=" block relative h-64 rounded-md overflow-hidden border-b border-opacity-30">
                    <img
                      alt="ecommerce"
                      className="object-cover object-top w-full h-full block   hover:scale-110 ease-in-out duration-200"
                      src={
                        import.meta.env.VITE_APP_UPLOAD_URL +
                        product?.attributes.images.data[0].attributes.url
                      }
                    />
                  </div>
                  <div className="p-2">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font">
                      {product?.attributes.categories.data[0].attributes.title.toUpperCase()}
                    </h3>
                    <h2 className="text-gray-900 text-base font-semibold">
                      {product?.attributes.title}
                    </h2>
                    <div className="flex place-items-center">
                      {product?.attributes.discount &&
                      product?.attributes.discount >= 1 ? (
                        <h6 className="text-muted mr-2 text-xs">
                          <del>${product?.attributes.price.toFixed(1)}</del>
                        </h6>
                      ) : (
                        ""
                      )}
                      <h4 className="font-semibold text-brown-500">
                        ${product?.attributes.newPrice.toFixed(1)}
                      </h4>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
