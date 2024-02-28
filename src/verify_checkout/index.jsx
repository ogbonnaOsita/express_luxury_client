/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { makeAuthorizedRequest } from "../../makeRequest";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { resetCart } from "../redux/cartReducer";
import { filterAndRenameKeys } from "../utils/handleFactory";
import AlertBar from "../components/AlertBar";

const Verify = () => {
  const [status, setStatus] = useState();
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const reference = searchParams.get("reference");

  const [alert, setAlert] = useState({
    message: "",
    active: false,
    type: "success",
  });

  if (!searchParams.has("reference")) {
    window.location.href = "/";
    // return;
  }

  const handleOrderPlacement = async (data) => {
    const items = filterAndRenameKeys(data.metadata.data.products, {
      id: "product",
      quantity: "qty",
    });

    delete data.metadata.data.products;
    const order = {
      ...data.metadata.data,
      items,
      paymentId: data.id,
    };

    await makeAuthorizedRequest
      .post("/orders", order)
      .then(() => {
        setStatus(data.status);
        dispatch(resetCart());
        setAlert({
          ...alert,
          active: true,
          message: "Your order has been placed!",
        });
      })
      .catch((err) => {
        setError(err.message);
        return false;
      });
  };
  const verifyPayment = async () => {
    if (!reference) {
      return;
    }
    setLoading(true);
    makeAuthorizedRequest
      .get(`/payments/verify/${reference}`)
      .then((res) => {
        setLoading(false);
        handleOrderPlacement(res.data.data.data.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };
  useEffect(() => {
    return () => verifyPayment();
  }, []);

  const verifyComponent = () => {
    if (status === "success") {
      return (
        <div className="flex flex-col items-center text-center">
          <img src="/assets/success.png" className="h-[60px] mb-3" />
          <h4 className="font-semibold">
            Transaction was successful, Thanks for shopping with us
          </h4>
          <p className="text-xs">Click the button below to continue shopping</p>
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
          <p className="text-xs">
            Click the button below to return to homepage
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
          <p className="text-xs">
            Click the button below to return to homepage
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
          <p className="text-xs">
            Click the button below to return to homepage
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
      {alert.active && (
        <AlertBar
          alert={alert}
          setAlert={setAlert}
          // reload={true}
        />
      )}
      {loading && <Loader />}
      {error && (
        <div className="flex flex-col items-center text-center">
          <h4 className="font-semibold">An error occurred</h4>
          <p className="text-xs">
            Click the button below to return to homepage
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
        ""
      )}
      <Footer />
    </>
  );
};

export default Verify;
