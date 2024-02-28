import Spinner from "../components/Spinner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { makeAuthorizedRequest } from "../../makeRequest";
import { Alert } from "@mui/material";

const phoneRegExp =
  /^(?:(?:(?:\+?234(?:h1)?|01)h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/;

// Schema for error handling
const profileSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Please enter a valid phone number")
    .required("required"),
  postalCode: yup.number().integer().required("required"),
  shippingAddress: yup.string().required("required"),
  city: yup.string().required("required"),
  state: yup.string().required("required"),
});

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [formMessage, setFormMessage] = useState({
    message: "",
    type: "error",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  // Get User Data
  const getUserInfo = () => {
    makeAuthorizedRequest
      .get("/users/me")
      .then((res) => {
        setUser(res.data.data.data);
      })
      .catch((err) => {
        setError(err.response.data.error.mesage);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  // Function to update the User Profile
  const handleEditProfile = async (values) => {
    setIsLoading(true);
    let data = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      city: values.city,
      state: values.state,
      address: values.address,
      postalCode: values.postalCode,
    };
    await makeAuthorizedRequest
      .patch(`/users/updateMe`, data)
      .then((res) => {
        setIsLoading(false);
        setUser(res.data);
        setFormMessage({
          message: "Profile Updated Successfully!",
          type: "success",
        });
      })
      .catch((err) => {
        // console.log(err.response.data.error.message);
        setIsLoading(false);
        setFormMessage({
          message: err.response.data.error.message,
          type: "error",
        });
      });
  };
  return (
    <>
      {error && (
        <Alert sx={{ marginBottom: "5px" }} severity="error">
          {error}
        </Alert>
      )}
      {formMessage.message !== "" && (
        <Alert sx={{ marginBottom: "5px" }} severity={formMessage.type}>
          {formMessage.message}
        </Alert>
      )}
      {user && (
        <form className="space-y-6" onSubmit={handleSubmit(handleEditProfile)}>
          <div className="space-y-4">
            <div className="space-y-6 sm:space-y-0 sm:flex sm:space-x-3">
              <div className="md:w-1/2 w-full">
                <label htmlFor="fullName" className="font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  defaultValue={user.firstName}
                  placeholder="Enter your full name"
                  {...register("firstName")}
                  className="w-full block border placeholder-gray-500 px-5 py-2 leading-6 rounded-xs border-gray-200"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-xs">
                    {errors.firstName?.message}
                  </span>
                )}
              </div>
              <div className="md:w-1/2 w-full">
                <label htmlFor="lastName" className="font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  defaultValue={user.lastName}
                  placeholder="Enter your Last name"
                  {...register("lastName")}
                  className="w-full block border placeholder-gray-500 px-5 py-2 leading-6 rounded-xs border-gray-200"
                />
                {errors.fullName && (
                  <span className="text-red-500 text-xs">
                    {errors.lastName?.message}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="font-medium">
                Email Address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                disabled
                defaultValue={user.email}
                placeholder="Enter your email address"
                className="w-full block border placeholder-gray-500 px-5 py-2 leading-6 rounded-xs border-gray-200"
              />
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
              <label htmlFor="address" className="font-medium">
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
            <div className="space-y-6 sm:space-y-0 sm:flex sm:space-x-3">
              <div className="md:w-1/3 w-full">
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
              <div className="md:w-1/3 w-full">
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
              <div className="md:w-1/3 w-full">
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

          <div>
            {!isLoading ? (
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center space-x-2 border font-semibold rounded-xs px-6 py-3 leading-6 bg-brown-500 text-white hover:text-white hover:bg-brown-600 cursor-pointer"
                disabled={!isDirty}
              >
                <span>Save</span>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center space-x-2 border font-semibold rounded-xs px-6 py-3 leading-6 bg-gray-300 text-white"
                disabled
              >
                <Spinner className="spinner" />
                <span>Save</span>
              </button>
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default EditProfile;
