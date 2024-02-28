import { Rating } from "@mui/material";

// eslint-disable-next-line react/prop-types
const RatingComponent = ({ rating }) => {
  return (
    <Rating
      name={`product-rating`}
      defaultValue={rating}
      precision={0.1}
      readOnly
    />
  );
};

export default RatingComponent;
