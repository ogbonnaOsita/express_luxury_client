import { Typography, Box, useMediaQuery } from "@mui/material";

const Header = ({ title, subtitle }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box>
      <Typography
        variant={isMobile ? "h3" : "h2"}
        fontWeight="bold"
        sx={{ mb: "1px", color: "#333333" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" className="text-brown-500">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
