import { CircularProgress } from "@mui/material";

// eslint-disable-next-line react/prop-types
const Loader = ({ color = "brown" }) => {
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-gray-100 bg-opacity-60">
      <CircularProgress color={color} />
    </div>
  );
};

export default Loader;
