/* eslint-disable react/prop-types */
import moment from "moment";

const OrderComponent = ({ order }) => {
  return (
    <>
      <div className="flex items-center mt-2 py-4 border-gray-200 hover:bg-gray-100 px-1">
        <div className="w-1/6">
          <img
            src={order.product?.images[0]}
            alt="product-image"
            className="w-full h-full object-center object-cover"
          />
        </div>
        <div className="pl-3 w-5/6">
          <div className="flex items-center justify-between w-full pt-1">
            <p className="text-base font-black leading-none text-gray-800">
              {order.product.title}
            </p>
            <p className="text-base font-black leading-none text-gray-800">
              &#8358;
              {parseInt(order.price) * parseInt(order.quantity)}
            </p>
          </div>
          {order.product?.size && (
            <p className="text-xs leading-3 text-gray-600 pt-2">
              Size: {order.product.size}
            </p>
          )}
          <p className="text-xs leading-3 text-gray-600 pt-2">
            Quantity: {order.quantity}
          </p>
          <div className="flex items-center justify-between w-full pt-2">
            <p
              className={`text-xs leading-3 ${
                order.status.includes("delivered")
                  ? "bg-green-500"
                  : "bg-gray-500"
              } p-1 text-white capitalize`}
            >
              {order.status}
            </p>
            <p className="text-xs leading-3 text-gray-600 font-medium">
              {moment(order.date).format("LLL")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderComponent;
