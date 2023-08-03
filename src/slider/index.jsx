import { Box, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import { useRef } from "react";
import useFetch from "../hooks/useFetch";

const Slider = () => {
  const [slide, setSlide] = useState([]);
  const slides = [
    {
      url: "/assets/slides/slide1.jpg",
    },
    {
      url: "/assets/slides/slide2.jpg",
    },
    {
      url: "/assets/slides/slide3.jpg",
    },
  ];

  // const { data } = useFetch("/slides?populate=image");
  // useEffect(() => {
  //   data &&
  //     data.map((image) =>
  //       slide.filter((item) =>
  //         item !== image
  //           ? console.log(image)
  //           : console.log("it does not belong")
  //       )
  //     );
  // }, []);
  // console.log(slide);

  const [currIndex, setCurrIndex] = useState(2);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const prevSlide = () => {
    const isFirstSlide = currIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currIndex - 1;
    setCurrIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currIndex + 1;
    setCurrIndex(newIndex);
  };

  (function () {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 5000);
  })();

  return (
    <Box className="h-[400px] md:h-[500px] lg:h-[550px] w-full relative">
      <Box
        sx={{
          height: "100%",

          "&::before": {
            position: "absolute",
            content: '""',
            display: "block",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${slides[currIndex].url})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            transition: "background-image 1s ease",
            zIndex: -1,
            filter: "brightness(70%)",
          },
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          width="80%"
          m="auto"
        >
          <Typography mb={4} variant="h1" fontWeight="bold" color="primary">
            Your ONE STOP Store
          </Typography>
          <Typography color="primary" variant="h5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            voluptatibus asperiores at nulla cum. Voluptates expedita itaque
            blanditiis corporis ratione, doloribus omnis incidunt molestias
            nesciunt consequuntur rem tempore iste veniam?
          </Typography>
        </Box>
        {/* Left Arrow */}
        <IconButton
          sx={{
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.8)",
              color: "#ffffff",
            },
            position: "absolute",
            top: "47%",
            left: "20px",
          }}
          onClick={prevSlide}
        >
          <ChevronLeftIcon />
        </IconButton>
        {/* Right Arrow */}
        <IconButton
          sx={{
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.8)",
              color: "#ffffff",
            },
            position: "absolute",
            top: "47%",
            right: "20px",
          }}
          onClick={nextSlide}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Slider;
