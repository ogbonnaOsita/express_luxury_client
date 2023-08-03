import Spinner from "../components/Spinner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { makeAuthorizedRequest } from "../../makeRequest";
import { Alert } from "@mui/material";

const phoneRegExp =
  /^(?:(?:(?:\+?234(?:h1)?|01)h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/;

const profileSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Please enter a valid phone number")
    .required("required"),
  postalCode: yup.number().integer().required("required"),
  address: yup.string().required("required"),
  city: yup.string().required("required"),
  state: yup.string().required("required"),
});

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const token = JSON.parse(localStorage.getItem("JWT_TOKEN"));
  const decoded = jwt_decode(token);
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

  const getUserInfo = () => {
    makeAuthorizedRequest
      .get("/users/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setError(err.response.data.error.mesage);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleEditProfile = async (values) => {
    setIsLoading(true);
    let data = {
      fullName: values.fullName,
      phoneNumber: parseInt(values.phoneNumber),
      city: values.city,
      state: values.state,
      address: values.address,
      postalCode: values.postalCode,
    };
    await makeAuthorizedRequest
      .put(`/users/${decoded.id}`, data)
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
            <div className="space-y-1">
              <label htmlFor="fullName" className="font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                defaultValue={user.fullName}
                placeholder="Enter your full name"
                {...register("fullName")}
                className="w-full block border placeholder-gray-500 px-5 py-2 leading-6 rounded-xs border-gray-200"
              />
              {errors.fullName && (
                <span className="text-red-500 text-xs">
                  {errors.fullName?.message}
                </span>
              )}
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
              <label htmlFor="phoneNumber" className="font-medium">
                Phone Number
              </label>
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                defaultValue={user.phoneNumber}
                placeholder="Enter your phone number"
                {...register("phoneNumber")}
                className="w-full block border placeholder-gray-500 px-5 py-2 leading-6 rounded-xs border-gray-200"
              />
              {errors.phoneNumber && (
                <span className="text-red-500 text-xs">
                  {errors.phoneNumber?.message}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="address" className="font-medium">
                Shipping Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                defaultValue={user.address}
                placeholder="Enter your street address"
                {...register("address")}
                className="w-full block border placeholder-gray-500 px-5 py-2 leading-6 rounded-xs border-gray-200"
              />
              {errors.address && (
                <span className="text-red-500 text-xs">
                  {errors.address?.message}
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
                  placeholder="City"
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
              className="w-full inline-flex justify-center items-center space-x-2 border font-semibold rounded-xs px-6 py-3 leading-6 bg-brown-500 text-white hover:text-white hover:bg-brown-600"
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
        </form>
      )}
    </>
  );
};

export default EditProfile;
