import { East } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import failedImg from "/404.svg";

const NotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="80vh"
      textAlign="center"
      m="0 10px"
    >
      <Box sx={{ width: { xs: "15rem", md: "28rem" } }}>
        <img src={failedImg} />
      </Box>
      <Typography fontWeight="bold" variant="h3" mb="5px">
        PAGE NOT FOUND
      </Typography>
      <Typography mb="10px">
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable.
      </Typography>
      <Link to="/">
        <Button
          variant="contained"
          disableElevation
          color="brown"
          size="large"
          endIcon={<East />}
        >
          Go To Dashboard
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;
