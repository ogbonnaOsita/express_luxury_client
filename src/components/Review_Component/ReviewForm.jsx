import { Alert, Rating } from "@mui/material";
import { useState } from "react";
import { makeAuthorizedRequest } from "../../../makeRequest";
import SendArrow from "../SendArrow";
import Spinner from "../Spinner";

// eslint-disable-next-line react/prop-types
const ReviewForm = ({ productId, refreshData }) => {
  const [formError, setFormError] = useState();
  const [confirm, setConfirm] = useState();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    review: "",
    rating: "",
  });

  const handleRatingChange = (events, value) => {
    setRating(value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async (event) => {
    setConfirm();
    setFormError();
    setIsLoading(true);
    event.preventDefault();
    if (rating < 1) {
      return setErrors((prevErr) => ({
        ...prevErr,
        rating: "Rating is required",
      }));
    } else {
      setErrors((prevErr) => ({
        ...prevErr,
        rating: "",
      }));
    }

    if (/([^\s])/.test(review)) {
      setErrors((prevErr) => ({
        ...prevErr,
        review: "",
      }));
    } else {
      return setErrors((prevErr) => ({
        ...prevErr,
        review: "Review is required",
      }));
    }

    await makeAuthorizedRequest
      .post(`/products/${productId}/reviews`, { review, rating })
      .then(() => {
        setConfirm("Thank you for your review!");
        setIsLoading(false);
        // Reset form fields after submission
        setRating(0);
        setReview("");
        refreshData();
      })
      .catch((err) => {
        setFormError(err.response.data.message);
        setIsLoading(false);
      });
  };
  return (
    <div className="w-full flex flex-col md:ml-auto mt-8 md:mt-0">
      <h2 className="text-gray-900 text-2xl mb-1 font-medium title-font">
        Review Product
      </h2>
      <form onSubmit={handleSubmit}>
        {formError && (
          <Alert sx={{ marginBottom: "5px" }} severity="error">
            {formError.includes("Duplicate") ||
            formError.includes("duplicate") ? (
              <p>You have already reviewed this product.</p>
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
        <div>
          <div className="flex items-center gap-3 my-2">
            <h2 className="text-gray-900 text-md">Your review:</h2>
            <Rating value={rating} onChange={handleRatingChange} />
          </div>
          <span className="text-red-500 text-xs">{errors.rating}</span>
        </div>
        <div className="relative mb-4">
          <label htmlFor="message" className="leading-7 text-sm text-gray-600">
            Review:
          </label>
          <textarea
            id="message"
            name="message"
            value={review}
            onChange={handleReviewChange}
            className="w-full bg-white rounded border border-gray-300 focus:border-brown-500 focus:ring-2 focus:ring-brown-200 h-28 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          ></textarea>
          <span className="text-red-500 text-xs">{errors.review}</span>
        </div>
        {!isLoading ? (
          <button
            type="submit"
            className="w-full inline-flex justify-center items-center space-x-2 border font-semibold rounded-lg px-6 py-3 leading-6 bg-brown-500 text-white hover:text-white hover:bg-brown-600"
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
  );
};

export default ReviewForm;
