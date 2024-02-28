import { Alert, Pagination } from "@mui/material";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { makeAuthorizedRequest } from "../../makeRequest";
import { NoRecords } from "../components/NoRecords";
import OrderComponent from "./OrderComponent";

const Orders = () => {
  const [user, setUser] = useState();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(4);

  const lastPostIndex = currentPage * ordersPerPage;
  const firstPostIndex = lastPostIndex - ordersPerPage;
  const currentOrderList = orders.slice(firstPostIndex, lastPostIndex);

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

  const getOrderList = () => {
    makeAuthorizedRequest
      .get(`/orders/userOrders`)
      .then((res) => {
        let listOrders = [];
        res.data.data.data.map((order) => {
          order.items.forEach((product) => {
            listOrders.push({
              product: product.product,
              quantity: product.qty,
              price: product.price,
              date: order.createdAt,
              status: order.status,
            });
          });
        });

        setOrders(listOrders);
      })
      .catch((err) => {
        // setError(err);
        console.log(err);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (user) {
      getOrderList();
    }
  }, [user]);

  //////////////// Start Pagination ///////////////////////
  const pagination = useMemo(() => {
    if (orders) {
      const noOfPages = Math.ceil(orders.length / ordersPerPage);
      return noOfPages;
    }
  }, [orders]);

  const handlePagination = (event, value) => {
    setCurrentPage(value);
  };
  //////////////// End Pagination /////////////////////////
  return (
    <>
      {error && (
        <Alert sx={{ marginBottom: "5px" }} severity="error">
          {error}
        </Alert>
      )}
      {orders && orders.length >= 1 ? (
        <>
          <div className="w-full bg-white">
            <p className="text-2xl font-semibold leading-10 text-gray-800 pt-2 border-b">
              Total Orders ({orders.length})
            </p>
            {currentOrderList.map((order, i) => {
              return <OrderComponent order={order} key={i} />;
            })}
          </div>
          <div className="flex justify-center my-5 pt-5">
            <Pagination
              count={pagination}
              color="brown"
              page={currentPage}
              onChange={handlePagination}
            />
          </div>
        </>
      ) : (
        <NoRecords message={"You have not placed any orders"} />
      )}
    </>
  );
};

export default Orders;
