import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SendArrow from "../components/SendArrow";
import Spinner from "../components/Spinner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { makeRequest } from "../../makeRequest";
import { Alert } from "@mui/material";

const forgotSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("required"),
});
export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState();
  const [success, setSuccess] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotSchema) });

  const handleForgotPassword = async (values) => {
    setIsLoading(true);
    setFormError();
    setSuccess();
    await makeRequest
      .post("/auth/forgot-password", values)
      .then(() => {
        // Handle success.
        setSuccess("A Password reset Link has been sent to your mail!");
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle error.
        setFormError(error.response.data.error.message);
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
                <h1 className="text-2xl font-bold inline-flex items-center mb-2 space-x-2">
                  <span>Password Recovery</span>
                </h1>
                <h2 className="text-sm font-medium text-gray-500">
                  Please enter your correct email address
                </h2>
              </header>
              {/* END Header */}

              {/* Sign In Form */}
              <div className="flex flex-col rounded-lg shadow-sm bg-white overflow-hidden">
                <div className="p-5 md:px-16 md:py-12 grow">
                  {formError && (
                    <Alert sx={{ marginBottom: "5px" }} severity="error">
                      {formError}
                    </Alert>
                  )}
                  {success && (
                    <Alert sx={{ marginBottom: "5px" }} severity="success">
                      {success}
                    </Alert>
                  )}
                  <form
                    className="space-y-3"
                    onSubmit={handleSubmit(handleForgotPassword)}
                  >
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
                      {!isLoading ? (
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-6 py-3 leading-6 bg-brown-700 text-white hover:text-white hover:bg-brown-600"
                        >
                          <SendArrow />
                          <span>Submit</span>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-6 py-3 leading-6 bg-gray-300 text-white"
                          disabled
                        >
                          <Spinner className="spinner" />
                          <span>Submit</span>
                        </button>
                      )}
                    </div>
                  </form>
                </div>
                <div className="p-5 md:px-16 grow text-sm text-center bg-gray-50 ">
                  Don’t have an account yet?
                  <Link
                    to="/sign_up"
                    className="font-medium text-brown-600 hover:text-brown-400"
                  >
                    Sign up
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
