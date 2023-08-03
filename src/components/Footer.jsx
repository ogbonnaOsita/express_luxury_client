import ButtonContained from "./ButtonContained";
import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font bg-white">
      <div className="border-t border-gray-200">
        <div className="container px-5 py-8 flex flex-wrap mx-auto items-center">
          <div className="flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start">
            <div className="relative sm:w-64 w-40 sm:mr-4 mr-2">
              <label
                htmlFor="footer-field"
                className=" text-sm text-gray-600"
              >
                Subscribe to our newsletter
              </label>
              <input
                type="text"
                id="footer-field"
                name="footer-field"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:bg-transparent focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <ButtonContained text="Submit" />
            <p className="text-gray-500 text-sm md:ml-6 md:mt-0 mt-2 sm:text-left text-center">
              Get insights on our latest products and offers
              <br className="lg:block hidden" />
              Be the first to know.
            </p>
          </div>
          <span className="inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center md:justify-start md:w-auto">
            <IconButton>
              <FacebookIcon />
            </IconButton>
            <IconButton>
              <TwitterIcon />
            </IconButton>
            <IconButton>
              <InstagramIcon />
            </IconButton>
            <IconButton>
              <YouTubeIcon />
            </IconButton>
          </span>
        </div>
      </div>
      <div className="bg-brown-500">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-white text-sm text-center sm:text-left">
            © 2023 Express Luxury
          </p>
          <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-white text-sm">
            All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
