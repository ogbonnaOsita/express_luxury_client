import { Link } from "react-router-dom";
import ButtonContained from "../components/ButtonContained";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";
import SectionTitle from "../components/SectionTitle";
import Slider from "../slider";
import { Box } from "@mui/material";
// import { useQuery, gql } from "@apollo/client";
import Loader from "../components/Loader";
import { NoRecords } from "../components/NoRecords";
import useFetch from "../hooks/useFetch";

// const PRODUCTS = gql`
//   query GetAllProducts {
//     products(sort: "createdAt:desc", pagination: { limit: 20 }) {
//       data {
//         id
//         attributes {
//           title
//           price
//           discount
//           newPrice
//           slug
//           images {
//             data {
//               attributes {
//                 url
//               }
//             }
//           }
//           categories {
//             data {
//               id
//               attributes {
//                 title
//                 slug
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

const Home = () => {
  // const { data, loading, error } = useQuery(PRODUCTS);
  const {
    data: products,
    loading,
    error,
  } = useFetch("/products?sort=-createdAt&limit=20");

  return (
    <Box className="flex flex-grow flex-col justify-between">
      {loading && <Loader />}
      {error && <div>{error}</div>}
      {products && (
        <div>
          <Slider />
          <SectionTitle title="NEW ARRIVALS!" />

          <Box mt={3}>
            {products.data.data?.length > 0 ? (
              <>
                <ProductList products={products.data.data} />
                <Box display="flex" justifyContent="center">
                  <Link to="/categories/new-arrivals">
                    <ButtonContained text="View More" />
                  </Link>
                </Box>
              </>
            ) : (
              <NoRecords />
            )}
          </Box>

          <SectionTitle title="TOP CATEGORIES" />
          <Categories url={"/categories?limit=4"} />
          <Footer />
        </div>
      )}
    </Box>
  );
};

export default Home;
