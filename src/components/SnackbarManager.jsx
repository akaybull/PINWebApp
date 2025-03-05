import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { removeSnackbar } from "../redux/features/snackbarSlice";

const SnackbarManager = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.snackbar.notifications);

  const handleClose = (key) => {
    dispatch(removeSnackbar(key));
  };

  return (
    <>
      {notifications.map((notification) => (
        <Snackbar
          key={notification.key}
          open={true}
          autoHideDuration={notification.duration || 3000}
          onClose={() => handleClose(notification.key)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          style={{ marginTop: `${notifications.indexOf(notification) * 60}px` }}
        >
          <Alert
            onClose={() => handleClose(notification.key)}
            severity={notification.severity || "info"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default SnackbarManager;
