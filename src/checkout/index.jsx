import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import { makeAuthorizedRequest } from "../../makeRequest";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import Spinner from "../components/Spinner";
import { useEffect } from "react";
import { Alert } from "@mui/material";

const phoneRegExp =
  /^(?:(?:(?:\+?234(?:h1)?|01)h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/;

const checkoutSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Please enter a valid phone number")
    .required("required"),
  postalCode: yup
    .number()
    .typeError("Please enter your postal code")
    .integer()
    .required("required"),
  shippingAddress: yup.string().required("required"),
  city: yup.string().required("required"),
  state: yup.string().required("required"),
});

export default function Checkout() {
  const products = useSelector((state) => state.cart.products);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [error, setError] = useState();

  const getUserInfo = () => {
    makeAuthorizedRequest
      .get("/users/me")
      .then((res) => {
        setUser(res.data.data.data);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(checkoutSchema) });

  // FUNCTION TO HANDLE PAYMENT
  const handlePayment = async (data) => {
    let amount = 0;
    let totalQty = 0;
    products.map((product) => {
      amount += product.quantity * product.price;
      totalQty += product.quantity;
    });

    // CREATE METADATA FOR PAYSTACK
    const metadata = {
      // products: filterAndDelete(products, ["id", "quantity", "price"]),
      products: products.map(({ id, quantity, price }) => ({
        id,
        quantity,
        price,
      })),
      totalQty: parseInt(totalQty),
      totalCost: parseInt(amount),
      phone: data.phone,
      shippingAddress: data.shippingAddress,
      city: data.city,
      state: data.state,
      postalCode: parseInt(data.postalCode),
    };

    const paystackData = {
      amount,
      metadata,
      callback_url: location.protocol + "//" + location.host + "/verify",
    };

    delete data.email;
    setIsLoading(true);
    try {
      await makeAuthorizedRequest.patch("/users/updateMe", data);
      await makeAuthorizedRequest
        .post("/payments", paystackData)
        .then((res) => {
          setIsLoading(false);
          window.location.href = res.data.data.data.data.authorization_url;
        });
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  // console.log(products);
  return (
    <>
      {/* Checkout Section: Simple Box */}
      {user && (
        <div className="bg-gray-100">
          <div className="container xl:max-w-7xl mx-auto px-4 py-8 lg:px-8 lg:py-16">
            {/* Box */}
            <div className="flex flex-col rounded-xs shadow-sm bg-white overflow-hidden">
              <div className="p-5 grow w-full max-w-lg mx-auto">
                {/* Heading */}
                <div className="text-center mt-5">
                  <h6 className="text-sm uppercase font-bold tracking-wider text-brown-600 mb-1">
                    Checkout
                  </h6>
                  <h1 className="md:text-lg text-sm font-bold mb-1">
                    Enter your details for shipping
                  </h1>
                  <h3 className="flex items-center my-5">
                    <span
                      aria-hidden="true"
                      className="grow bg-gray-200 rounded h-0.5"
                    />
                    <span className="text-sm font-medium mx-3 text-gray-400">
                      <LocalShippingOutlinedIcon />
                    </span>
                    <span
                      aria-hidden="true"
                      className="grow bg-gray-200 rounded h-0.5"
                    />
                  </h3>
                </div>
                {/* END Heading */}
                {error && (
                  <Alert sx={{ marginBottom: "5px" }} severity="error">
                    {error}
                  </Alert>
                )}
                {/* Checkout Form */}
                <div className="space-y-6">
                  <form
                    className="space-y-6"
                    onSubmit={handleSubmit(handlePayment)}
                  >
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label htmlFor="email" className="font-medium">
                          Email Address
                        </label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          defaultValue={user.email}
                          placeholder="Enter your email address"
                          {...register("email")}
                          readOnly
                          className="w-full block border placeholder-gray-500 px-5 py-2 leading-6 rounded-xs border-gray-200"
                        />
                        {errors.email && (
                          <span className="text-red-500 text-xs">
                            {errors.email?.message}
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="phone" className="font-medium">
                          Phone Number
                        </label>
                        <input
                          type="number"
                          id="phone"
                          name="phone"
                          defaultValue={user.phone}
                          placeholder="Enter your phone number"
                          {...register("phone")}
                          className="w-full block border placeholder-gray-500 px-5 py-2 leading-6 rounded-xs border-gray-200"
                        />
                        {errors.phone && (
                          <span className="text-red-500 text-xs">
                            {errors.phone?.message}
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor="shippingAddress"
                          className="font-medium"
                        >
                          Shipping Address
                        </label>
                        <input
                          type="text"
                          id="shippingAddress"
                          name="shippingAddress"
                          defaultValue={user.shippingAddress}
                          placeholder="Enter your street address"
                          {...register("shippingAddress")}
                          className="w-full block border placeholder-gray-500 px-5 py-2 leading-6 rounded-xs border-gray-200"
                        />
                        {errors.shippingAddress && (
                          <span className="text-red-500 text-xs">
                            {errors.shippingAddress?.message}
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="postalCode" className="font-medium">
                          Postal Code
                        </label>
                        <input
                          type="number"
                          id="postalCode"
                          name="postalCode"
                          defaultValue={user.postalCode}
                          placeholder="Enter your postal code"
                          {...register("postalCode")}
                          className="w-full block border placeholder-gray-500 px-5 py-2 leading-6 rounded-xs border-gray-200"
                        />
                        {errors.postalCode && (
                          <span className="text-red-500 text-xs">
                            {errors.postalCode?.message}
                          </span>
                        )}
                      </div>
                      <div className="space-y-6 sm:space-y-0 sm:flex sm:space-x-3">
                        <div className="space-y-1 grow">
                          <label htmlFor="city" className="font-medium">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            defaultValue={user.city}
                            placeholder="City"
                            {...register("city")}
                            className="w-full block border placeholder-gray-500 px-5 py-2 leading-6 rounded-xs border-gray-200"
                          />
                          {errors.city && (
                            <span className="text-red-500 text-xs">
                              {errors.city?.message}
                            </span>
                          )}
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="state" className="font-medium">
                            State
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            defaultValue={user.state}
                            placeholder="State"
                            {...register("state")}
                            className="w-full block border placeholder-gray-500 px-5 py-2 leading-6 rounded-xs border-gray-200"
                          />
                          {errors.city && (
                            <span className="text-red-500 text-xs">
                              {errors.city?.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {!isLoading ? (
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center items-center space-x-2 border font-semibold rounded-xs px-6 py-3 leading-6 bg-brown-600 text-white hover:text-white hover:bg-brown-700"
                      >
                        <span>Pay Now</span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center items-center space-x-2 border font-semibold rounded-xs px-6 py-3 leading-6 bg-gray-300 text-white"
                        disabled
                      >
                        <Spinner className="spinner" />
                        <span>Pay Now</span>
                      </button>
                    )}
                  </form>
                </div>
                {/* END Checkout Form */}

                {/* Footer */}
                <div className="text-center my-5">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Thanks for shopping with us.
                  </p>
                </div>
                {/* Footer */}
              </div>
            </div>
            {/* END Box */}
          </div>
        </div>
      )}
      {/* END Checkout Section: Simple Box */}
      <Footer />
    </>
  );
}
