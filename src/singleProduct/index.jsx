/* eslint-disable react-hooks/exhaustive-deps */
import { IconButton } from "@mui/material";
import { Box } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonContained from "../components/ButtonContained";
import Footer from "../components/Footer";
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
import useFetch from "../hooks/useFetch";
import RatingComponent from "../components/Review_Component/RatingComponent";
import ReviewRatings from "../components/Review_Component/ReviewRatings";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [similarProducts, setSimilarProducts] = useState();
  const [activeTab, setActiveTab] = useState("reviews");

  const {
    data: product,
    loading,
    error,
    refreshData,
  } = useFetch(`/products/${slug}/slug`);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (!loading && product) {
        try {
          // Fetch products with similar categories
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_API_URL}/products/category/${
              product.data.data.category[0].slug
            }`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch similar products");
          }
          const similarProductsData = await response.json();
          setSimilarProducts(similarProductsData.data.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchSimilarProducts();
  }, [loading, product]);

  useEffect(() => {
    if (!loading && !product) {
      navigate("/not-found");
    }
  }, [loading, product]);

  // Share to socials
  const pageUrl = encodeURI(document.location.href);
  const pageTitle = encodeURI("Check out this amazing product");
  const hashTags = encodeURI(
    "ecommerce,amazing,blackFriday,bestbuy,discount,great deals"
  );
  const handleShareProduct = (url) => {
    window.open(url, "_blank");
  };

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({
    message: "",
    active: false,
    type: "success",
  });

  //////// Add to Cart //////////////
  const handleAddToCart = (product) => {
    const item = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      category: product.category[0].title,
      image: product.images[0],
      price: product.price,
      quantity,
    };
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
    if (similarProducts && similarProducts.length > 0) {
      arr = similarProducts.filter((item) => item.slug !== slug);
      arrayLength = arr.length <= 4 ? arr.length : 4;
      return getMultipleRandom(arr, arrayLength);
    }
  }, [similarProducts]);

  // Function to handle tab change
  const handleTabChange = (tabId) => {
    setActiveTab(tabId); // Update the active tab state
  };

  //////////////////////////// End of You may also like section ///////////////////////////////////
  return (
    <Box className="flex flex-grow flex-col justify-between">
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
        {product && (
          <div className="container px-5 py-12 md:py-12 lg:py-12 mx-auto">
            <div className=" mx-auto grid gap-2 grid-cols-1 md:grid-cols-2 place-items-center">
              <Carousel images={product.data.data.images} />
              <div className="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                {product.data.data.category.map((c) => (
                  <h2
                    key={c._id}
                    className="text-sm title-font text-gray-500 tracking-widest uppercase"
                  >
                    {c.title}
                  </h2>
                ))}
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product.data.data.title}
                </h1>
                <Box>
                  <RatingComponent rating={product.data.data.ratingsAverage} />
                </Box>
                <div className="flex place-items-center">
                  {product.data.data.discount &&
                  product.data.data.discount >= 1 ? (
                    <h6 className="text-muted mr-2 text-base">
                      <del>${product.data.data.price.toFixed(1)}</del>
                    </h6>
                  ) : (
                    ""
                  )}
                  <h4 className="font-medium text-2xl text-brown-500">
                    $
                    {product.data.data.discount &&
                    product.data.data.discount >= 1
                      ? (
                          product.data.data.price *
                          (1 - product.data.data.discount / 100)
                        ).toFixed(1)
                      : product.data.data.price.toFixed(1)}
                  </h4>
                </div>
                <p className="leading-relaxed mb-4">
                  {product.data.data.description}
                </p>

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
                            ...product.data.data,
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

        {product && (
          <div className="p-8">
            <div>
              <ul className="flex justify-center text-center text-gray-500">
                <li>
                  <a
                    href="#reviews"
                    className={`flex justify-center py-4 px-6 ${
                      activeTab === "reviews"
                        ? "bg-white border-l border-t border-r border-gray-300 text-gray-600"
                        : "text-brown-400"
                    }`}
                    onClick={() => handleTabChange("reviews")}
                  >
                    {`Reviews (${product.data.data.ratingsQuantity})`}
                  </a>
                </li>
                <li>
                  <a
                    href="#description"
                    className={`flex justify-center py-4 px-6 ${
                      activeTab === "description"
                        ? "bg-white border-l border-t border-r border-gray-300 text-gray-600"
                        : "text-brown-400"
                    }`}
                    onClick={() => handleTabChange("description")}
                  >
                    Description
                  </a>
                </li>
              </ul>
            </div>
            <div className="bg-white  border-t border-gray-300 md:p-8 text-gray-700 -mt-0.5">
              {/* Content for the selected tab */}
              {activeTab === "reviews" && (
                <div>
                  <ReviewRatings
                    product={product.data.data}
                    refresh={refreshData}
                  />
                </div>
              )}
              {activeTab === "description" && (
                <div>
                  <h2 className="font-semibold mb-2 text-2xl">
                    Product Description
                  </h2>
                  <p>{`${product.data.data.description}`}</p>
                </div>
              )}
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
