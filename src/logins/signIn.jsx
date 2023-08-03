/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { makeRequest } from "../../makeRequest";
import "./style.css";
import { Alert } from "@mui/material";
import { useState } from "react";
import SendArrow from "../components/SendArrow";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const signupSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required"),
});

export default function SignIn() {
  const [formError, setFormError] = useState();
  const [confirm, setConfirm] = useState();
  const [sendEmail, setSendEmail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSetToken } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });

  const handleSignIn = async (values) => {
    setConfirm();
    setSendEmail(values.email);
    delete values.confirmPassword;
    setIsLoading(true);
    let data = {
      identifier: values.email,
      password: values.password,
    };
    await makeRequest
      .post("/auth/local/", data)
      .then((res) => {
        window.localStorage.setItem("JWT_TOKEN", JSON.stringify(res.data.jwt));
        handleSetToken(JSON.parse(localStorage.getItem("JWT_TOKEN")));
        setIsLoading(false);
        location.reload();
        // navigate(-1);
      })
      .catch((err) => {
        let error;
        if (err.response.data.error.message.includes("identifier")) {
          error = err.response.data.error.message.replace(
            "identifier",
            "email"
          );
        } else {
          error = err.response.data.error.message;
        }
        setFormError(error);
        setIsLoading(false);
      });
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    setFormError();
    let data = {
      email: sendEmail,
    };
    await makeRequest
      .post("/auth/send-email-confirmation/", data)
      .then(() => {
        setIsLoading(false);
        setConfirm("Success! Check your email and verify your account");
        setIsLoading(false);
      })
      .catch((err) => {
        setFormError(err.response.data.error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      {/* Pages: Sign In: Boxed */}

      {/* Page Container */}
      <div
        id="page-container"
        className="flex flex-col mx-auto w-full min-w-[320px] bg-gray-100 dark:text-gray-100 dark:bg-gray-900"
      >
        {/* Page Content */}
        <main id="page-content" className="flex flex-auto flex-col max-w-full">
          <div className=" flex items-center justify-center relative overflow-hidden max-w-10xl mx-auto p-4 lg:p-8 w-full">
            {/* Sign In Section */}
            <section className="py-6 w-full max-w-xl">
              {/* Header */}
              <header className="mb-5 text-center">
                <h1 className="text-2xl font-bold inline-flex items-center mb-2 space-x-2">
                  <span>Welcome</span>
                </h1>
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Please enter your login details
                </h2>
              </header>
              {/* END Header */}

              {/* Sign In Form */}
              <div className="flex flex-col rounded-lg shadow-sm bg-white overflow-hidden dark:text-gray-100 dark:bg-gray-800">
                <div className="p-5 md:px-16 md:py-12 grow">
                  {formError && (
                    <Alert sx={{ marginBottom: "5px" }} severity="error">
                      {formError.includes("confirmed") ? (
                        <p>
                          {formError}{" "}
                          <a
                            className="text-blue-500 cursor-pointer hover:text-blue-700 underline"
                            onClick={handleResendEmail}
                          >
                            Click here
                          </a>{" "}
                          to resend confirmation email
                        </p>
                      ) : (
                        formError
                      )}
                    </Alert>
                  )}
                  {confirm && (
                    <Alert sx={{ marginBottom: "5px" }} severity="success">
                      {confirm}
                    </Alert>
                  )}
                  <form
                    className="space-y-3"
                    onSubmit={handleSubmit(handleSignIn)}
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
                      <label htmlFor="password" className="text-xs font-medium">
                        Password
                      </label>
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
                      <div className="flex justify-end space-x-2 mb-1">
                        <Link
                          to="/forgot_password"
                          className="text-xs font-medium inline-block text-brown-600 hover:text-brown-400 dark:text-brown-400 dark:hover:text-brown-300"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      {!isLoading ? (
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-6 py-3 leading-6 bg-brown-500 text-white hover:text-white hover:bg-brown-600"
                        >
                          <SendArrow />
                          <span>Sign In</span>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-6 py-3 leading-6 bg-gray-300 text-white"
                          disabled
                        >
                          <Spinner className="spinner" />
                          <span>Sign In</span>
                        </button>
                      )}
                    </div>
                  </form>
                </div>
                <div className="p-5 md:px-16 grow text-sm text-center bg-gray-50 dark:bg-gray-700/50">
                  Don’t have an account yet?
                  <Link
                    to="/sign_up"
                    className="alt-link font-medium text-brown-600 hover:text-brown-400 dark:text-brown-400 dark:hover:text-brown-300"
                  >
                    <span className="alt-option"> Sign Up</span>
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
