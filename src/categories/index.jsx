import { Box, Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import CategoryBanner from "../components/CategoryBanner";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import Loader from "../components/Loader";
import { NoRecords } from "../components/NoRecords";
import SortIcon from "@mui/icons-material/Sort";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import GoToTop from "../utils/GoToTop";
import useFetch from "../hooks/useFetch";

const sortOptions = [
  {
    label: "Most Recent",
    value: "-createdAt",
  },
  {
    label: "Price: Low to High",
    value: "price",
  },
  {
    label: "Price: High to Low",
    value: "-price",
  },
];

const Categories = () => {
  const { slug } = useParams();
  const [sort, setSort] = useState(sortOptions[0].value);
  const [page, setPage] = useState(1);
  const pageLimit = 20;
  // const navigate = useNavigate();

  useEffect(() => {
    // categories();
    setPage(1);
  }, [slug]);

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  let queryURL;

  if (slug !== "new-arrivals") {
    queryURL = `/products/category/${slug}?sort=${sort}&page=${page}&limit=${pageLimit}`;
  } else {
    queryURL = `/products?sort=${sort}&page=${page}&limit=${pageLimit}`;
  }

  const { data: products, loading, error } = useFetch(queryURL);

  //////////////// Start Pagination ///////////////////////
  const pagination = useMemo(() => {
    if (products) {
      const noOfPages = Math.ceil(products.totalCount / pageLimit);
      return noOfPages;
    }
  }, [products]);

  const handlePagination = (event, value) => {
    setPage(value);
  };
  //////////////// End Pagination /////////////////////////

  return (
    <Box className="flex flex-grow flex-col justify-between">
      {loading && <Loader />}
      {error && <div>{error}</div>}
      {products && (
        <>
          <CategoryBanner title={slug.replaceAll("-", " ")} />
          <Box mt={5} className="container px-5 mx-auto border-b-2">
            <div className="flex items-center mb-4">
              <span className="mr-3">Sort By</span>
              <SortIcon color="brown" />
              <div className="relative">
                <select
                  onChange={handleChange}
                  defaultValue={sort}
                  className="rounded appearance-none border-gray-300 py-1 focus:outline-none focus:ring-2 focus:ring-brown-200 focus:border-brown-500 text-base pl-3 pr-10"
                >
                  {sortOptions.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </div>
            </div>
          </Box>
          {products.data.data.length > 0 ? (
            <ProductList products={products.data.data} />
          ) : (
            <NoRecords />
          )}
          <Box display="flex" justifyContent="center" mb={5}>
            <Pagination
              count={pagination}
              color="brown"
              page={page}
              onChange={handlePagination}
            />
          </Box>
          <Footer />
          <GoToTop />
        </>
      )}
    </Box>
  );
};

export default Categories;
