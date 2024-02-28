/* eslint-disable react/prop-types */
import { Pagination } from "@mui/material";
import ReviewCard from "./ReviewCard";
import { useState } from "react";
import ReviewForm from "./ReviewForm";

const ReviewRatings = ({ product, refresh }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = product.reviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const handlePagination = (event, value) => setCurrentPage(value);
  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container lg:px-5 py-4 mx-auto flex items-top sm:flex-nowrap flex-wrap">
          <div className="md:w-1/2 rounded-lg overflow-hidden sm:mr-10 flex flex-col items-end justify-start relative">
            {currentReviews.map((review, index) => {
              return <ReviewCard review={review} key={index} />;
            })}

            <Pagination
              count={Math.ceil(product.reviews.length / reviewsPerPage)}
              color="brown"
              page={currentPage}
              onChange={handlePagination}
            />
          </div>
          <div className="md:w-1/2 bg-white ">
            <ReviewForm productId={product._id} refreshData={refresh} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReviewRatings;
