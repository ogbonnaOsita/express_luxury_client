import { Box, Pagination } from "@mui/material";
import { useParams } from "react-router-dom";
import CategoryBanner from "../components/CategoryBanner";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import { useQuery, gql } from "@apollo/client";
import Loader from "../components/Loader";
import { NoRecords } from "../components/NoRecords";
import SortIcon from "@mui/icons-material/Sort";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import GoToTop from "../utils/GoToTop";


const PRODUCTS = gql`
  query ($slug: String!, $sort: [String!], $page: Int!, $pageLimit: Int!) {
    products(
      sort: $sort
      filters: { categories: { slug: { eq: $slug } } }
      pagination: { page: $page, pageSize: $pageLimit }
    ) {
      data {
        id
        attributes {
          title
          price
          discount
          newPrice
          slug
          images {
            data {
              attributes {
                url
              }
            }
          }
          categories {
            data {
              id
              attributes {
                title
              }
            }
          }
        }
      }
      meta {
        pagination {
          total
          pageCount
        }
      }
    }
  }
`;

const NEW_ARRIVALS = gql`
  query ($sort: [String!], $page: Int!, $pageLimit: Int!) {
    products(sort: $sort, pagination: { page: $page, pageSize: $pageLimit }) {
      data {
        id
        attributes {
          title
          price
          discount
          newPrice
          slug
          images {
            data {
              attributes {
                url
              }
            }
          }
          categories {
            data {
              id
              attributes {
                title
              }
            }
          }
        }
      }
      meta {
        pagination {
          total
          pageCount
        }
      }
    }
  }
`;
const sortOptions = [
  {
    label: "Most Recent",
    value: "createdAt:desc",
  },
  {
    label: "Price: Low to High",
    value: "newPrice",
  },
  {
    label: "Price: High to Low",
    value: "newPrice:desc",
  },
];

const Categories = () => {
  const { slug } = useParams();
  const [sort, setSort] = useState(sortOptions[0].value);
  const [page, setPage] = useState(1);
  const pageLimit = 20;

  useEffect(() => {
    setPage(1);
  }, [slug]);

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  let queryValue;

  if (slug !== "new-arrivals") {
    queryValue = PRODUCTS;
  } else {
    queryValue = NEW_ARRIVALS;
  }

  const {
    data: products,
    loading,
    error,
  } = useQuery(queryValue, {
    variables: { slug: slug, sort: sort, page: page, pageLimit: pageLimit },
  });

  //////////////// Start Pagination ///////////////////////
  const pagination = useMemo(() => {
    if (products) {
      const noOfPages = Math.ceil(
        products.products.meta.pagination.total / pageLimit
      );
      return noOfPages;
    }
  }, [products]);

  const handlePagination = (event, value) => {
    setPage(value);
  };
  //////////////// End Pagination /////////////////////////

  return (
    <Box>
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
          {products.products.data.length > 0 ? (
            <ProductList products={products.products.data} />
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
