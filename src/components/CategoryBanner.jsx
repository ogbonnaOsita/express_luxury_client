/* eslint-disable react/prop-types */
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import heroBg from "/assets/clothing-rack.jpg";
import HomeIcon from "@mui/icons-material/Home";

const CategoryBanner = ({ title }) => {
  return (
    <Box className="h-[250px] md:h-[250px] lg:h-[300px] w-full relative">
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
            backgroundImage: `url(${heroBg})`,
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
          alignItems="start"
          justifyContent="center"
          textAlign="center"
          m="auto"
        >
          <Box backgroundColor="#fff" p={5} ml="8%">
            <Typography mb={2} variant="h4" fontWeight="bold">
              {title.toUpperCase()}
            </Typography>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Link underline="hover" color="inherit" to="/">
                <HomeIcon sx={{ color: "#000" }} /> Home
              </Link>
              <Typography sx={{textTransform: 'capitalize'}} color="text.primary">{title}</Typography>
            </Breadcrumbs>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryBanner;
