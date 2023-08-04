import { DeleteOutline, East, RestartAlt } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AlertBar from "../components/AlertBar";
import Footer from "../components/Footer";
import { NoRecords } from "../components/NoRecords";
import {
  decreaseQty,
  increaseQty,
  removeItem,
  resetCart,
} from "../redux/cartReducer";

const Cart = () => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    message: "",
    active: false,
    type: "success",
  });

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => (total += item.quantity * item.price));
    return total.toFixed(2);
  };

  return (
    <Box>
      {alert.active && (
        <AlertBar
          alert={alert}
          setAlert={setAlert}
          // reload={true}
        />
      )}
      <div className="container md:w-3/4 mx-auto mt-10 md:mt-20">
        <div className="flex flex-col shadow-md mx-3 md:mx-0 my-10">
          {products.length > 0 ? (
            <>
              <div className="w-full bg-white md:px-8 px-5 py-2">
                <div className="flex justify-between border-b py-5">
                  <h1 className="font-semibold text-lg md:text-2xl">
                    Shopping Cart
                  </h1>
                  <h2 className="font-semibold md:text-2xl text-lg">
                    {products.length} {products.length == 1 ? "item" : "items"}
                  </h2>
                </div>
                <div className="flex mt-10 mb-5">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-4/6">
                    Product Details
                  </h3>
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/6 text-right">
                    Sub Total
                  </h3>
                </div>
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between hover:bg-gray-100 py-5"
                  >
                    <div className="flex w-5/6">
                      <div className="w-20">
                        <img
                          className="h-20"
                          src={
                            import.meta.env.VITE_APP_UPLOAD_URL + product.image
                          }
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col justify-between ml-4">
                        <span className="font-semibold text-xs lg:text-sm">
                          {product.title}
                        </span>
                        <span className="font-bold mr-2">
                          ${product.price.toFixed(1)}{" "}
                          {product.size && (
                            <span className="font-medium">
                              | Size: {product.size}
                            </span>
                          )}
                        </span>

                        <div className=" text-gray-500 text-sm hover:text-red-500">
                          <button
                            onClick={() => {
                              dispatch(removeItem({ id: product.id }));
                              setAlert({
                                ...alert,
                                active: true,
                                message: "Item removed!",
                              });
                            }}
                            className="flex items-center my-1 font-semibold hover:text-red-500 text-gray-500 text-sm w-4"
                          >
                            <DeleteOutline className="" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-semibold text-sm">
                        ${(product.price * product.quantity).toFixed(1)}
                      </span>

                      <div className="flex my-2 place-items-center">
                        <h4 className="pr-1">Qty</h4>
                        <Box display="flex" alignItems="center">
                          <button
                            className="px-2 py-1 bg-brown-500 text-white font-bold"
                            onClick={() =>
                              dispatch(decreaseQty({ id: product.id }))
                            }
                          >
                            -
                          </button>
                          <span className="px-2 py-1 bg-brown-100">
                            {product.quantity}
                          </span>
                          <button
                            className="px-2 py-1 bg-brown-500 text-white font-bold"
                            onClick={() => {
                              dispatch(increaseQty({ id: product.id }));
                            }}
                          >
                            +
                          </button>
                        </Box>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between">
                  <Link
                    onClick={() => {
                      navigate(-1);
                    }}
                    className="flex font-semibold text-brown-600 text-sm mt-10"
                  >
                    <svg
                      className="fill-current mr-2 text-brown-600 w-4"
                      viewBox="0 0 448 512"
                    >
                      <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                    </svg>
                    Continue Shopping
                  </Link>
                  <button
                    onClick={() => {
                      setAlert({
                        ...alert,
                        active: true,
                        message: "Cart Emptied!",
                      }),
                        dispatch(resetCart());
                    }}
                    className="flex font-semibold text-brown-600 text-sm mt-10"
                  >
                    Empty Cart
                    <RestartAlt />
                  </button>
                </div>
              </div>

              <div id="summary" className="w-full px-5 md:px-8 pb-10">
                <div className="border-t mt-8">
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Total cost</span>
                    <span className="text-xl">${totalPrice()}</span>
                  </div>
                  <Link to="/checkout">
                    <button
                      // onClick={handlePayment}
                      className="bg-brown-500 font-semibold hover:bg-brown-600 py-3 text-sm text-white uppercase w-full"
                    >
                      Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center p-8">
              <NoRecords message="Your cart is empty" />
              <Button
                variant="contained"
                disableElevation
                color="brown"
                size="large"
                endIcon={<East />}
                onClick={() => {
                  navigate(-1);
                }}
              >
                Continue shopping
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </Box>
  );
};

export default Cart;
