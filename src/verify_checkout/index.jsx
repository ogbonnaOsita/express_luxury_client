import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { makeAuthorizedRequest } from "../../makeRequest";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { resetCart } from "../redux/cartReducer";

const Verify = () => {
  const [status, setStatus] = useState();
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const reference = searchParams.get("reference");

  if (!searchParams.has("reference")) {
    window.location.href = "/";
    // return;
  }
  const verifyPayment = async () => {
    if (!reference) {
      return;
    }
    setLoading(true);
    makeAuthorizedRequest
      .post("/verify", {
        reference,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.body.reference) {
          dispatch(resetCart());
          setLoading(false);
          if (res.data.transactionStatus) {
            setStatus(res.data.transactionStatus);
          }
          setStatus(res.data.transactionStatus);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
        console.log(err);
      });
  };
  useEffect(() => {
    if (!status) {
      verifyPayment();
    }
  }, []);

  setTimeout(() => {
    window.location.href = "/";
  }, 5000);

  const verifyComponent = () => {
    if (status === "success") {
      return (
        <div className="flex flex-col items-center text-center">
          <img src="/assets/success.png" className="h-[60px] mb-3" />
          <h4 className="font-semibold">
            Transaction was successful, Thanks for shopping with us
          </h4>
          <p className="text-xs my-1">Redirecting you to homepage...</p>
          <p className="text-xs">
            If you are not redirected automatically, click below
          </p>
          <Link
            to="/"
            className=" mt-3 font-medium rounded-md px-6 py-2 bg-brown-500 text-white hover:bg-brown-600"
          >
            Homepage
          </Link>
        </div>
      );
    } else if (status === "pending") {
      return (
        <div className="flex flex-col items-center text-center">
          <img src="/assets/pending.png" className="h-[60px] mb-3" />
          <h4 className="font-semibold">Transaction is pending</h4>
          <p className="text-xs my-1">Redirecting you to homepage...</p>
          <p className="text-xs">
            If you are not redirected automatically, click below
          </p>
          <Link
            to="/"
            className=" mt-3 font-medium rounded-md px-6 py-2 bg-brown-500 text-white hover:bg-brown-600"
          >
            Homepage
          </Link>
        </div>
      );
    } else if (status === "timeout") {
      return (
        <div className="flex flex-col items-center text-center">
          <img src="/assets/timeout.png" className="h-[60px] mb-3" />
          <h4 className="font-semibold">
            Transaction timeout and did not complete
          </h4>
          <p className="text-xs my-1">Redirecting you to homepage...</p>
          <p className="text-xs">
            If you are not redirected automatically, click below
          </p>
          <Link
            to="/"
            className=" mt-3 font-medium rounded-md px-6 py-2 bg-brown-500 text-white hover:bg-brown-600"
          >
            Homepage
          </Link>
        </div>
      );
    } else if (status === "failed") {
      return (
        <div className="flex flex-col items-center text-center">
          <img src="/assets/cancel.png" className="h-[60px] mb-3" />
          <h4 className="font-semibold">Transaction failed!</h4>
          <p className="text-xs my-1">Redirecting you to homepage...</p>
          <p className="text-xs">
            If you are not redirected automatically, click below
          </p>
          <Link
            to="/"
            className=" mt-3 font-medium rounded-md px-6 py-2 bg-brown-500 text-white hover:bg-brown-600"
          >
            Homepage
          </Link>
        </div>
      );
    }
  };
  return (
    <>
      {loading && <Loader />}
      {error && (
        <div className="flex flex-col items-center text-center">
          <h4 className="font-semibold">An error occurred</h4>
          <p className="text-xs my-1">Redirecting you to homepage...</p>
          <p className="text-xs">
            If you are not redirected automatically, click below
          </p>
          <Link
            to="/"
            className=" mt-3 font-medium rounded-md px-6 py-2 bg-brown-500 text-white hover:bg-brown-600"
          >
            Homepage
          </Link>
        </div>
      )}
      {status ? (
        <div className="flex justify-center items-center h-[60vh] mx-5">
          {verifyComponent()}
        </div>
      ) : (
        !loading && (
          <div className="flex justify-center items-center h-[60vh] mx-5">
            <div className="flex flex-col items-center text-center">
              <h4 className="font-semibold">oOps, Something went wrong!</h4>
              <p className="text-xs my-1">Redirecting you to homepage...</p>
              <p className="text-xs">
                If you are not redirected automatically, click below
              </p>
              <Link
                to="/"
                className=" mt-3 font-medium rounded-md px-6 py-2 bg-brown-500 text-white hover:bg-brown-600"
              >
                Homepage
              </Link>
            </div>
          </div>
        )
      )}
      <Footer />
    </>
  );
};

export default Verify;
