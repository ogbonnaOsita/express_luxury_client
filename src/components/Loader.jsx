import { Box, CircularProgress } from "@mui/material";

const Loader = ({ color = "brown" }) => {
  return (
    <Box width="100%" display="flex" justifyContent="center" marginTop={2}>
      <CircularProgress color={color} />
    </Box>
  );
};

export default Loader;
