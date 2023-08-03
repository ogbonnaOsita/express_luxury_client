import { Box, Typography } from "@mui/material";

const SectionTitle = ({ title }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" mt={10}>
      <Box sx={{ background: "#000000", height: "2.5px", width: "60px" }}></Box>
      <Typography
        className="text-black-600"
        variant="h3"
        fontWeight="500"
        mx={1}
      >
        {title}
      </Typography>
      <Box sx={{ background: "#000000", height: "2.5px", width: "60px" }}></Box>
    </Box>
  );
};

export default SectionTitle;
