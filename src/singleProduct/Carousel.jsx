/* eslint-disable react/prop-types */
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRef } from "react";
import { useState } from "react";

const Carousel = ({ images }) => {
  const [index, setIndex] = useState(0);
  const slides = images.map((image) => image);

  const prevSlide = () => {
    const isFirstSlide = index === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : index - 1;
    setIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = index === slides.length - 1;
    const newIndex = isLastSlide ? 0 : index + 1;
    setIndex(newIndex);
  };

  //////// MAKE SLIDE AUTOCHANGE ///////
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  (function () {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 5000);
  })();
  //////// END OF MAKE SLIDE AUTOCHANGE////////

  //   console.log(data.data)
  //   if (data) {
  //     data.product.data.attributes.images.data.map((c) => {
  //       slides.push(`${c.attributes.url}`);
  //     });
  //   }
  //   data.product.data.attributes.images.data.map((c) => {
  //     slides.push(`${c.attributes.url}`);

  return (
    <div className="relative lg:w-11/12 md:w-9/12 w-10/12 h-10/12 md:h-9/12 lg:h-11/12">
      <img
        alt="ecommerce"
        className=" p-2 md:p-2 m-auto h-72 sm:h-96 sm:w-96 md:h-72 lg:h-96 object-contain object-center rounded"
        src={slides[index]}
      />
      {slides.length > 1 ? (
        <>
          {/* Left Arrow */}
          <IconButton
            sx={{
              backgroundColor: "rgba(0,0,0,0.2)",
              color: "#000",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.8)",
                color: "#fff",
              },
              position: "absolute",
              top: "47%",
              left: "-35px",
            }}
            onClick={prevSlide}
          >
            <ChevronLeft />
          </IconButton>
          {/* Right Arrow */}
          <IconButton
            sx={{
              backgroundColor: "rgba(0,0,0,0.2)",
              color: "#333",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.8)",
                color: "#fff",
              },
              position: "absolute",
              top: "47%",
              right: "-35px",
            }}
            onClick={nextSlide}
          >
            <ChevronRight />
          </IconButton>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Carousel;
