/* eslint-disable react/prop-types */
import { Rating } from "@mui/material";

const ReviewCard = ({ review }) => {
  return (
    <div className="flex flex-col mb-5 lg:items-start items-center w-full">
      <div className="flex-grow">
        <h2 className="text-gray-900 text-base title-font font-medium mb-1">
          {`${review.user.firstName} ${review.user.lastName}`}
          <span className="font-normal text-xs italic">
            -
            {`${new Date(review.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}`}
          </span>
        </h2>
        <Rating
          name={`rating-${review.rating._id}`}
          value={review.rating}
          precision={0.5}
          readOnly
        />
        <p className="leading-relaxed text-md">
          {`${review.review} asdfas asdfue dauekdi asdfke asdfe`}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
