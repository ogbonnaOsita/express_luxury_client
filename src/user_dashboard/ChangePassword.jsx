import Spinner from "../components/Spinner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { makeAuthorizedRequest } from "../../makeRequest";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Alert } from "@mui/material";

const passwordSchema = yup.object().shape({
  currPassword: yup.string().required("required"),
  newPassword: yup
    .string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .required("required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("required"),
});
const ChangePassword = () => {
  const [formMessage, setFormMessage] = useState({
    message: "",
    type: "error",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { handleSetToken } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const handleChangePassword = async (values) => {
    let data = {
      currentPassword: values.currPassword,
      password: values.newPassword,
      passwordConfirmation: values.confirmPassword,
    };
    await makeAuthorizedRequest
      .post("/auth/change-password", data)
      .then((res) => {
        setIsLoading(false);
        window.localStorage.setItem("JWT_TOKEN", JSON.stringify(res.data.jwt));
        handleSetToken(JSON.parse(localStorage.getItem("JWT_TOKEN")));
        setFormMessage({
          message: "Password Updated Successfully!",
          type: "success",
        });
      })
      .catch((err) => {
        setFormMessage({
          message: err.response.data.error.message,
          type: "error",
        });
        setIsLoading(false);
      });
  };
  return (
    <>
      {formMessage.message !== "" && (
        <Alert sx={{ marginBottom: "5px" }} severity={formMessage.type}>
          {formMessage.message}
        </Alert>
      )}
      <form className="space-y-6" onSubmit={handleSubmit(handleChangePassword)}>
        <div className="space-y-4">
          <div>
            <label htmlFor="currPassword" className="text-xs font-medium">
              Current Password
            </label>
            <input
              type="password"
              id="currPassword"
              name="currPassword"
              placeholder="Enter your current password"
              {...register("currPassword")}
              className="w-full block border placeholder-gray-500 px-3 py-2 leading-6 rounded-sm border-gray-200"
            />
            {errors.currPassword && (
              <span className="text-red-500 text-xs">
                {errors.currPassword?.message}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="newPassword" className="text-xs font-medium">
              New Password
            </label>
            <div className="mb-1">
              <h6 className="text-[10px] text-gray-500">
                *Password must be at least 8 characters long
              </h6>
              <h6 className="text-[10px] text-gray-500">
                *It must contain at least one capital letter and one number
              </h6>
            </div>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter your current password"
              {...register("newPassword")}
              className="w-full block border placeholder-gray-500 px-3 py-2 leading-6 rounded-sm border-gray-200"
            />
            {errors.newPassword && (
              <span className="text-red-500 text-xs">
                {errors.newPassword?.message}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="password" className="text-xs font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              {...register("confirmPassword")}
              className="w-full block border placeholder-gray-500 px-3 py-2 leading-6 rounded-sm border-gray-200"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs">
                {errors.confirmPassword?.message}
              </span>
            )}
          </div>
        </div>

        {!isLoading ? (
          <button
            type="submit"
            className="w-full inline-flex justify-center items-center space-x-2 border font-semibold rounded-xs px-6 py-3 leading-6 bg-brown-500 text-white hover:text-white hover:bg-brown-600"
            disabled={!isDirty}
          >
            <span>Save</span>
          </button>
        ) : (
          <button
            type="submit"
            className="w-full inline-flex justify-center items-center space-x-2 border font-semibold rounded-xs px-6 py-3 leading-6 bg-gray-300 text-white"
            disabled
          >
            <Spinner className="spinner" />
            <span>Save</span>
          </button>
        )}
      </form>
    </>
  );
};

export default ChangePassword;
