import { Box } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

const SortField = () => {
  return (
    <Box mt={5} className="container px-5 mx-auto border-b-2">
      <div className="flex items-center mb-4">
        <span className="mr-3">Sort By</span>
        <SortIcon color='brown' />
        <div className="relative">
          <select className="rounded appearance-none border-gray-300 py-1 focus:outline-none focus:ring-2 focus:ring-brown-200 focus:border-brown-500 text-base pl-3 pr-10">
            <option>Recommended</option>
            <option>Newest</option>
            <option>Price, High to Low</option>
            <option>Price, Low to High</option>
          </select>
          <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4"
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </span>
        </div>
      </div>
    </Box>
  );
};

export default SortField;
