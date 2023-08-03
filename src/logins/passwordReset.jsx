import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import SendArrow from "../components/SendArrow";
import Spinner from "../components/Spinner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { makeRequest } from "../../makeRequest";
import { Alert } from "@mui/material";
import { useState } from "react";

const resetSchema = yup.object().shape({
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
export default function PasswordReset() {
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState();
  const [success, setSuccess] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetSchema) });

  const handlePasswordReset = async (values) => {
    const code = searchParams.get("code");
    let data = {
      code: code,
      password: values.password,
      passwordConfirmation: values.confirmPassword,
    };
    setIsLoading(true);
    setFormError();
    setSuccess();
    await makeRequest
      .post("/auth/reset-password", data)
      .then((res) => {
        // Handle success.
        setSuccess("Password created successfully!");
        setIsLoading(false);
        console.log(res);
        setTimeout(() => {
          navigate("/sign_in");
        }, 4000);
      })
      .catch((error) => {
        // Handle error.
        setFormError(error.response.data.error.message);
        setIsLoading(false);
      });
    console.log(data);
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
                  <span>Password Reset</span>
                </h1>
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Create a new secured password
                </h2>
              </header>
              {/* END Header */}

              {/* Sign In Form */}
              <div className="flex flex-col rounded-lg shadow-sm bg-white overflow-hidden dark:text-gray-100 dark:bg-gray-800">
                <div className="p-5 md:px-16 md:py-12 grow">
                  {formError && (
                    <Alert sx={{ marginBottom: "5px" }} severity="error">
                      {formError}
                    </Alert>
                  )}
                  {success && (
                    <Alert sx={{ marginBottom: "5px" }} severity="success">
                      <p>
                        {success}{" "}
                        <a
                          className="text-blue-500 cursor-pointer hover:text-blue-700 underline"
                          onClick={() => navigate("/sign_in")}
                        >
                          Click here
                        </a>{" "}
                        to resend confirmation email
                      </p>
                    </Alert>
                  )}
                  <form
                    className="space-y-3"
                    onSubmit={handleSubmit(handlePasswordReset)}
                  >
                    <div>
                      <label htmlFor="password" className="text-xs font-medium">
                        New Password
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
                        placeholder="Enter a new password"
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
                  </form>
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
