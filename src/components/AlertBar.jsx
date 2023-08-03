/* eslint-disable react/prop-types */
import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

export default function AlertBar({ alert, setAlert }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ active: false });
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={alert.active}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={alert.type}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
