/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { makeRequest } from "../../makeRequest";
import { useState } from "react";
import "./style.css";
import { Alert } from "@mui/material";
import Spinner from "../components/Spinner";
import SendArrow from "../components/SendArrow";
// import { AuthContext } from "../context/AuthContext";
// import { useContext } from "react";
const phoneRegExp =
  /^(?:(?:(?:\+?234(?:h1)?|01)h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/;

const signupSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Please enter a valid phone number")
    .required("required"),
  password: yup
    .string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .required("required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("required"),
});

export default function SignUp() {
  const navigate = useNavigate();
  const [formError, setFormError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // const { handleSetToken } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });

  const handleSignUp = async (values) => {
    setIsLoading(true);
    let data = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      password: values.password,
      passwordConfirm: values.confirmPassword,
      baseURL:
        location.protocol + "//" + location.host + "/account_verification",
    };
    await makeRequest
      .post("/users/signup", data)
      .then(() => {
        setIsLoading(false);
        navigate("/sign_up/register_success");
      })
      .catch((err) => {
        setFormError(err.response.data.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      {/* Pages: Sign In: Boxed */}

      {/* Page Container */}
      <div
        id="page-container"
        className="flex flex-col mx-auto w-full min-w-[320px] bg-gray-100"
      >
        {/* Page Content */}
        <main id="page-content" className="flex flex-auto flex-col max-w-full">
          <div className=" flex items-center justify-center relative overflow-hidden max-w-10xl mx-auto p-4 lg:p-8 w-full">
            {/* Sign In Section */}
            <section className="py-6 w-full max-w-xl">
              {/* Header */}
              <header className="mb-5 text-center">
                <h1 className="text-2xl font-bold inline-flex items-center space-x-2">
                  <span>Welcome</span>
                </h1>
                <h2 className="text-xs font-medium text-gray-500">
                  Please enter your details to register
                </h2>
              </header>
              {/* END Header */}

              {/* Sign In Form */}
              <div className="flex flex-col rounded-lg shadow-sm bg-white overflow-hidden">
                <div className="p-5 md:px-12 md:py-9 grow">
                  {formError && (
                    <Alert sx={{ marginBottom: "5px" }} severity="error">
                      {formError}
                    </Alert>
                  )}
                  <form
                    className="space-y-3"
                    onSubmit={handleSubmit(handleSignUp)}
                  >
                    <div className="flex gap-2">
                      <div className="w-full md:w-1/2">
                        <label
                          htmlFor="firstName"
                          className="text-xs font-medium"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          placeholder="Enter your first name"
                          {...register("firstName")}
                          className="w-full block border placeholder-gray-500 px-3 py-2 leading-6 rounded-sm border-gray-200"
                        />
                        {errors.firstName && (
                          <span className="text-red-500 text-xs">
                            {errors.firstName?.message}
                          </span>
                        )}
                      </div>
                      <div className="w-full md:w-1/2">
                        <label
                          htmlFor="lastName"
                          className="text-xs font-medium"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          placeholder="Enter your last name"
                          {...register("lastName")}
                          className="w-full block border placeholder-gray-500 px-3 py-2 leading-6 rounded-sm border-gray-200"
                        />
                        {errors.lastName && (
                          <span className="text-red-500 text-xs">
                            {errors.lastName?.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="text-xs font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        {...register("email")}
                        className="w-full block border placeholder-gray-500 px-3 py-2 leading-6 rounded-sm border-gray-200"
                      />
                      {errors.email && (
                        <span className="text-red-500 text-xs">
                          {errors.email?.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="text-xs font-medium">
                        Phone Number
                      </label>
                      <input
                        type="number"
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        {...register("phone")}
                        className="w-full block border placeholder-gray-500 px-3 py-2 leading-6 rounded-sm border-gray-200"
                      />
                      {errors.phone && (
                        <span className="text-red-500 text-xs">
                          {errors.phone?.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="password" className="text-xs font-medium">
                        Password
                      </label>
                      <div className="mb-1">
                        <h6 className="text-[10px] text-gray-500">
                          *Password must be at least 8 characters long
                        </h6>
                        <h6 className="text-[10px] text-gray-500">
                          *It must contain at least one capital letter and one
                          number
                        </h6>
                      </div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        {...register("password")}
                        className="w-full block border placeholder-gray-500 px-3 py-2 leading-6 rounded-sm border-gray-200"
                      />
                      {errors.password && (
                        <span className="text-red-500 text-xs">
                          {errors.password?.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label htmlFor="password" className="text-xs font-medium">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        {...register("confirmPassword")}
                        className="w-full block border placeholder-gray-500 px-3 py-2 leading-6 rounded-sm border-gray-200"
                      />
                      {errors.confirmPassword && (
                        <span className="text-red-500 text-xs">
                          {errors.confirmPassword?.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="flex justify-end space-x-2 mb-1">
                        <Link
                          to="/forgot_password"
                          className="text-xs font-medium inline-block text-brown-600 hover:text-brown-400"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      {!isLoading ? (
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-6 py-3 leading-6 bg-brown-700 text-white hover:text-white hover:bg-brown-600"
                        >
                          <SendArrow />
                          <span>Register</span>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-6 py-3 leading-6 bg-gray-300 text-white"
                          disabled
                        >
                          <Spinner className="spinner" />
                          <span>Register</span>
                        </button>
                      )}
                    </div>
                  </form>
                </div>
                <div className="p-5 md:px-16 grow text-xs text-center bg-gray-50">
                  Already have an account?
                  <Link
                    to="/sign_in"
                    className="alt-link font-medium text-brown-600 hover:text-brown-400"
                  >
                    <span className="alt-option"> Sign in</span>
                  </Link>
                </div>
              </div>
              {/* END Sign In Form */}
            </section>
            {/* END Sign In Section */}
          </div>
        </main>
        {/* END Page Content */}
      </div>
      {/* END Page Container */}

      {/* END Pages: Sign In: Boxed */}
      <Footer />
    </>
  );
}
