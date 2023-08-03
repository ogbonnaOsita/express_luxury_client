/* eslint-disable react-hooks/exhaustive-deps */
import { IconButton } from "@mui/material";
import { Box } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ButtonContained from "../components/ButtonContained";
import Footer from "../components/Footer";
import { useQuery, gql } from "@apollo/client";
import Loader from "../components/Loader";
import SectionTitle from "../components/SectionTitle";
import ProductList from "../components/ProductList";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useMemo } from "react";
import Carousel from "./Carousel";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartReducer";
import AlertBar from "../components/AlertBar";
import { WhatsApp } from "@mui/icons-material";

const PRODUCT = gql`
  query ($slug: String!) {
    products(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          title
          price
          discount
          description
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
                slug
                products {
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
                            slug
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          sizes {
            data {
              id
              attributes {
                size
              }
            }
          }
        }
      }
    }
  }
`;

const SingleProduct = () => {
  const { slug } = useParams();
  const { data, loading, error } = useQuery(PRODUCT, {
    variables: { slug: slug },
  });

  // Share to socials
  const pageUrl = encodeURI(document.location.href);
  const pageTitle = encodeURI("Check out this amazing product");
  const hashTags = encodeURI(
    "ecommerce,amazing,blackFriday,bestbuy,discount,great deals"
  );
  const handleShareProduct = (url) => {
    window.open(url, "_blank");
  };

  // console.log(data)

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({
    message: "",
    active: false,
    type: "success",
  });

  useEffect(() => {
    if (data) {
      if (data.products.data[0].attributes.sizes.data.length > 0) {
        setSize(data.products.data[0].attributes.sizes.data[0].attributes.size);
      }
    }
  }, [data]);

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  //////// Add to Cart //////////////
  const handleAddToCart = (product) => {
    const item = {
      id: product.id,
      // slug: product.attrributes.slug,
      title: product.attributes.title,
      category: product.attributes.categories.data[0].attributes.title,
      image: product.attributes.images.data[0].attributes.url,
      price: product.attributes.newPrice,
      quantity,
      size,
    };
    if (size == "") {
      delete item.size;
    }
    dispatch(addToCart({ item }));
    setAlert({
      ...alert,
      active: true,
      message: "Added to Cart!",
    });
    // console.log(product.attributes.title);
  };

  /////////////// Get random products for you may also Like section ///////////////////////

  function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  }

  let arr = [];
  let arrayLength;

  const likeSuggestions = useMemo(() => {
    if (data) {
      arr =
        data.products.data[0].attributes.categories.data[0].attributes.products
          .data;
      arr = arr.filter((item) => item.attributes.slug !== slug);
      arrayLength = arr.length <= 4 ? arr.length : 4;
      return getMultipleRandom(arr, arrayLength);
    }
  }, [data]);

  // console.log(likeSuggestions)

  //////////////////////////// End of You may also like section ///////////////////////////////////
  return (
    <Box>
      {alert.active && (
        <AlertBar
          alert={alert}
          setAlert={setAlert}
          // reload={true}
        />
      )}
      <section className="text-gray-600 body-font overflow-hidden">
        {loading && <Loader />}
        {error && <div>{error}</div>}
        {data && (
          <div className="container px-5 py-12 md:py-12 lg:py-12 mx-auto">
            <div className=" mx-auto grid gap-2 grid-cols-1 md:grid-cols-2 place-items-center">
              <Carousel images={data.products.data[0].attributes.images} />
              <div className="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                {data.products.data[0].attributes.categories.data.map((c) => (
                  <h2
                    key={c.id}
                    className="text-sm title-font text-gray-500 tracking-widest uppercase"
                  >
                    {c.attributes.title}
                  </h2>
                ))}
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {data.products.data[0].attributes.title}
                </h1>
                <div className="flex place-items-center">
                  {data.products.data[0].attributes.discount &&
                  data.products.data[0].attributes.discount >= 1 ? (
                    <h6 className="text-muted mr-2 text-base">
                      <del>
                        ${data.products.data[0]?.attributes.price.toFixed(1)}
                      </del>
                    </h6>
                  ) : (
                    ""
                  )}
                  <h4 className="font-medium text-2xl text-brown-500">
                    $
                    {data.products.data[0].attributes.discount &&
                    data.products.data[0].attributes.discount >= 1
                      ? (
                          data.products.data[0]?.attributes.price *
                          (1 - data.products.data[0]?.attributes.discount / 100)
                        ).toFixed(1)
                      : data.products.data[0]?.attributes.price.toFixed(1)}
                  </h4>
                </div>
                <p className="leading-relaxed mb-4">
                  {data.products.data[0].attributes.description}
                </p>
                {size !== "" ? (
                  <div className="flex items-center mb-4">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select
                        value={size}
                        onChange={handleChange}
                        className="rounded border appearance-none border-gray-300 py-1 focus:outline-none focus:ring-2 focus:ring-brown-200 focus:border-brown-500 text-base pl-3 pr-10"
                      >
                        {data.products.data[0].attributes.sizes.data.map(
                          (size) => (
                            <option
                              key={size.id}
                              value={size.attributes.size.toUpperCase()}
                            >
                              {size.attributes.size}
                            </option>
                          )
                        )}
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
                ) : (
                  ""
                )}

                <div className="flex justify-between flex-col sm:flex-row">
                  <div className="flex gap-4">
                    <Box display="flex" alignItems="center">
                      <button
                        className="px-4 py-2 bg-brown-500 text-white font-bold"
                        onClick={() =>
                          setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                        }
                      >
                        -
                      </button>
                      <span className="px-4 py-2 bg-brown-100">{quantity}</span>
                      <button
                        className="px-4 py-2 bg-brown-500 text-white font-bold"
                        onClick={() => setQuantity((prev) => prev + 1)}
                      >
                        +
                      </button>
                    </Box>
                    <Box className="">
                      <ButtonContained
                        func={() => {
                          handleAddToCart({
                            ...data.products.data[0],
                            size,
                            quantity,
                          });
                        }}
                        text="Add to Cart"
                      />
                    </Box>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="inline-flex lg:ml-auto lg:mt-0 justify-center md:justify-start md:w-auto place-items-center">
                    <h4 className="text-base font-medium text-black">
                      Share on:{" "}
                    </h4>
                    <IconButton
                      onClick={() =>
                        handleShareProduct(
                          `https://www.facebook.com/sharer.php?u=${pageUrl}`
                        )
                      }
                    >
                      <FacebookIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleShareProduct(
                          `https://twitter.com/share?url=${pageUrl}&text=${pageTitle}&via=[via]&hashtags=${hashTags}`
                        )
                      }
                    >
                      <TwitterIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleShareProduct(
                          `https://api.whatsapp.com/send?text=${pageTitle} ${pageUrl}`
                        )
                      }
                    >
                      <WhatsApp />
                    </IconButton>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        {likeSuggestions && likeSuggestions.length >= 1 ? (
          <>
            <SectionTitle title="YOU MAY ALSO LIKE" />
            <ProductList products={likeSuggestions} gridLg="lg:grid-cols-4" />
          </>
        ) : (
          ""
        )}
      </section>
      <Footer />
    </Box>
  );
};

export default SingleProduct;
