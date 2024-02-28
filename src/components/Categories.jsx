import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

/* eslint-disable react/no-unescaped-entities */
const Categories = ({ url }) => {
  const { data: categories } = useFetch(url);
  return (
    <>
      {categories && (
        <section className="text-gray-600 body-font mx-4">
          <div className="container px-5 py-24 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 -m-4">
              {categories.data.data.map((category, i) => {
                return (
                  <Link to={`/categories/${category?.slug}`} key={i}>
                    <div>
                      <div className="flex relative h-[240px] hover:scale-105 ease-in duration-150">
                        <img
                          alt="gallery"
                          className="absolute inset-0 w-full h-full object-cover object-center brightness-75 "
                          src={category.thumbnail}
                        />
                        <div className="z-10 absolute top-0 left-0 h-full w-full flex items-center justify-center">
                          <div className="z-10 bg-white p-5 text-center w-[60%]">
                            {category.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Categories;
