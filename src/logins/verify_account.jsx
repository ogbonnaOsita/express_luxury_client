/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { makeRequest } from "../../makeRequest";
import Loader from "../components/Loader";

const VerifyAccount = () => {
  const { verify_token } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);

  const handleAccountVerification = async () => {
    setIsLoading(true);
    setError();
    setSuccess();
    await makeRequest
      .patch(`/users/accountActivation/${verify_token}`)
      .then(() => {
        // Handle success.
        setSuccess(true);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle error.
        setError(error.response.data.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    return () => handleAccountVerification();
  }, []);

  return (
    <>
      {/* Page Container */}
      <div
        id="page-container"
        className="flex flex-col mx-auto w-full min-w-[320px] bg-gray-100"
      >
        {/* Page Content */}
        <main
          id="page-content"
          className="flex flex-auto flex-col max-w-full lg:h-[59.8vh]"
        >
          <div className=" h-full flex items-center justify-center relative overflow-hidden max-w-10xl mx-auto p-4 lg:p-8 w-full">
            <section className="py-6 w-full max-w-xl">
              {isLoading && <Loader />}
              {error && (
                <div className="flex flex-col items-center text-center">
                  <h4 className="font-semibold">An error occurred</h4>
                  <p className="text-xs">
                    Click the button below to return to home page.
                  </p>
                  <Link
                    to="/"
                    className=" mt-3 font-medium rounded-md px-6 py-2 bg-brown-500 text-white hover:bg-brown-600"
                  >
                    Homepage
                  </Link>
                </div>
              )}
              {success && (
                <div className="flex flex-col rounded-lg shadow-sm bg-white overflow-hidden">
                  <div className="p-5 md:px-16 md:py-12 grow">
                    <div className="flex flex-col items-center text-center">
                      <img
                        src="/assets/success.png"
                        className="h-[60px] mb-3"
                      />
                      <h4 className="font-semibold text-base">
                        Account Verified Successfully!
                      </h4>
                      <p className="text-sm my-1">
                        Please click the button below to log into your account
                      </p>
                      <Link
                        to="/sign_in"
                        className=" mt-3 font-medium rounded-md px-6 py-2 bg-brown-500 text-white hover:bg-brown-600"
                      >
                        Sign In
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </main>
        {/* END Page Content */}
      </div>
      {/* END Page Container */}

      <Footer />
    </>
  );
};

export default VerifyAccount;
