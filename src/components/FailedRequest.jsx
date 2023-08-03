/* eslint-disable react/prop-types */
import { Box, Divider, Typography } from "@mui/material";
import errorImage from "/failed_request.svg";

const FailedRequest = ({ errMessage = null }) => {
  return (
    <Box display="flex" justifyContent="center" textAlign="center">
      <Box sx={{ width: { xs: "15rem", md: "30rem" } }}>
        <img src={errorImage} />
        <Divider />
        <Typography variant="h4" mt="5px" fontWeight="bold">
          {errMessage && "Error: "}
          {errMessage}
        </Typography>
      </Box>
    </Box>
  );
};

export default FailedRequest;
