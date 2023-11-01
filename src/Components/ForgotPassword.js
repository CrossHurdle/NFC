import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Components/nfc.css";
import OTPInput from "otp-input-react";
import { Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function ForgotPasswordForm({
  setComponentName,
  handleSubmit,
  register,
  errors,
  getValues,
  onSubmit,
}) {
  const handleFormSubmit = async (data, e) => {
    e.preventDefault();
    const Details = {
      email: data.email,
    };

    console.log("Details", Details);

    await axios
      .post("http://localhost:8080/auth/send-otp", Details)
      .then((resp) => {
        console.log("resp.data", resp.data);

        if (resp.data.message === "code send successfully") {
          toast.success("Email send successful", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          localStorage.setItem("Forgotid", resp.data.id
          );
        } else {
          toast.error("Email send failed", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        }
      });
  };
  return (
    <Row>
      <Col className="NfcLogin" sm={12} mg={12} lg={12} xl={12}>
        <form
          className="form_outline"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <label className="formP_label" htmlFor="Email">
            Email
          </label>
          <input
            className="loginPageInput"
            placeholder="Enter Your Email"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="Stud-personal-error" style={{ color: "red" }}>
              E-mail is required
            </span>
          )}
          <div
            // className="loginPage_button_backIcon"
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link
              to="/form"
              style={{
                fontSize: "14px",
                display: "flex",
                color: "white",
                textDecoration: "none",
                cursor: "pointer",
                alignItems: "baseline",
              }}
            >
              <span style={{ fontSize: "24px" }}>
                <RxDoubleArrowLeft style={{ paddingRight: "5px" }} />
              </span>
              Back to Login
            </Link>
          </div>

          <div className="ForgotPassword_emailSend_container">
            <button
              className="ForgotPassword_emailSend"
              type="submit"
              onClick={(e) => {
                setComponentName("Otpinput");
                handleFormSubmit(getValues(), e);
              }}
            >
              Send Otp
            </button>
          </div>
        </form>
      </Col>
    </Row>
  );
}

function Otp({
  setComponentName,
  handleSubmit,
  register,
  errors,
  getValues,
  onSubmit,
}) {
  const Application = localStorage.getItem("userMail");
  console.log("first", Application);
  const [forgototpnumber, setforgototpnumber] = useState("");
  console.log("first", forgototpnumber);
  const handleFormSubmit = async (data, e) => {
    e.preventDefault();
    const Details = {
      email: Application,
      code: forgototpnumber,
    };

    console.log("Details", Details);

    await axios
      .post("http://localhost:8080/auth/verify-otp", Details)
      .then((resp) => {
        console.log("resp.data", resp.data);

        if (resp.data.message === "verification code matched") {
          toast.success("OTP  successful", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        } else {
          toast.error("Otp Miss Match", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        }
      });
  };
  return (
    <Row>
      <Col className="NfcLogin" sm={12} mg={12} lg={12} xl={12}>
        <Form layout="vertical" onFinish={handleSubmit(handleFormSubmit)}>
          <OTPInput
            className="otp_input"
            OTPLength={4}
            otpType="number"
            value={forgototpnumber}
            onChange={(otpValue) => setforgototpnumber(otpValue)}
          />

          {/* <div style={{ marginTop: "15px", marginRight: "50px", display: "flex", justifyContent: "end" }}>
        <button onClick={() => setComponentName("Changepassword")} className="loginBackgroundStyle">Verify</button>
      </div> */}
          <center>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Link
                onClick={() => setComponentName("ForgotPassword")}
                style={{
                  fontSize: "16px",
                  display: "flex",
                  textAlign: "center",
                  color: "white",
                  textDecoration: "none",
                  cursor: "pointer",
                  alignItems: "baseline",
                }}
              >
                <span style={{ fontSize: "24px" }}>
                  <RxDoubleArrowLeft style={{ paddingRight: "5px" }} />
                </span>
                Back
              </Link>
            </div>
            <div className="loginPage_button">
              <button
                className="ForgotPassword_emailSend"
                onClick={(e) => {
                  setComponentName("Changepassword");
                  handleFormSubmit(getValues(), e);
                }}
              >
                verify
              </button>
            </div>
          </center>
        </Form>
      </Col>
    </Row>
  );
}
function ChangePassword({
  setComponentName,
  handleSubmit,
  register,
  errors,
  getValues,

  onSubmit,
}) {
  const navigate = useNavigate()
  const id = localStorage.getItem("Forgotid");
  console.log('first', id)
  const handleFormSubmit = async (data,e) => {
    e.preventDefault();
    const Details = {
      password: data.password,
    };

    console.log("Details", Details);

    await axios
      .post(`http://localhost:8080/auth/update-password/${id}`, Details)
      .then((resp) => {
        console.log("resp.data", resp.data);

        if (resp.data.message === "password changed successfully") {
          toast.success("New Password update successful", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
          setTimeout(() => {
            navigate("/form");
          }, 2000);
        } else {
          toast.error("New Password update failed", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        }
      });
  };
  let [passwordShown, setpasswordShown] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisiblity = () => {
    setpasswordShown(!passwordShown);
  };
  // const togglePasswordVisiblitys = () => {
  //   setShowPassword(!showPassword);
  // };

  return (
    <Row>
      <Col className="NfcLogin" sm={12} mg={12} lg={12} xl={12}>
        <form
          className="form_outline"
        >
          {/* <label className="formP_label" htmlFor="Email">
            New Password
          </label>
          <div style={{ width: "100%" }}>
            <input
              className="loginPageInput"
              placeholder="Enter Your New Password"
              type={showPassword ? "text" : "password"}
              {...register("NewPassword", { required: true })}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              onClick={togglePasswordVisiblitys}
              style={{
                cursor: "pointer",
                color: "black",
                marginLeft: "-25px",
              }}
            />
            {errors.NewPassword && (
              <span className="Stud-personal-error" style={{ color: "red" }}>
                NewPassword is required
              </span>
            )}
          </div> */}
          <label className="formP_label" htmlFor="Email">
            New Password
          </label>
          <div style={{ width: "100%" }}>
            <input
              className="loginPageInput"
              placeholder="Enter Your Confirm Password"
              type={passwordShown ? "text" : "password"}
              {...register("password", { required: true })}
            />
            <FontAwesomeIcon
              icon={passwordShown ? faEye : faEyeSlash}
              onClick={togglePasswordVisiblity}
              style={{
                cursor: "pointer",
                color: "black",
                marginLeft: "-25px",
              }}
            />
            {errors.password && (
              <span className="Stud-personal-error" style={{ color: "red" }}>
                Confirm Password is required
              </span>
            )}
          </div>
          <div
            // className="loginPage_button_backIcon"
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link
              onClick={() => setComponentName("ForgotPassword")}
              style={{
                fontSize: "16px",
                display: "flex",
                textAlign: "center",
                color: "white",
                textDecoration: "none",
                cursor: "pointer",
                alignItems: "baseline",
              }}
            >
              <span style={{ fontSize: "24px" }}>
                <RxDoubleArrowLeft style={{ paddingRight: "5px" }} />
              </span>
              Back
            </Link>
          </div>

          <div className="ForgotPassword_emailSend_container">
              <button className="ForgotPassword_emailSend" type="submit"
              onClick={(e) => {
                handleFormSubmit(getValues(), e);
              }}>
                confirm
              </button>
          </div>
        </form>
      </Col>
    </Row>
  );
}

const PageView = ({
  pageType,
  setComponentName,
  handleSubmit,
  register,
  getValues,
  errors,
  onSubmit,
}) => {
  switch (pageType) {
    case "ForgotPassword":
      return (
        <ForgotPasswordForm
          setComponentName={setComponentName}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          onSubmit={onSubmit}
          getValues={getValues}
        />
      );
    case "Otpinput":
      return (
        <Otp
          setComponentName={setComponentName}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          onSubmit={onSubmit}
          getValues={getValues}
        />
      );
    case "Changepassword":
      return (
        <ChangePassword
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          onSubmit={onSubmit}
          getValues={getValues}
        />
      );
    default:
      return (
        <ForgotPasswordForm
          setComponentName={setComponentName}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          onSubmit={onSubmit}
          getValues={getValues}
        />
      );
  }
};

const ForgotPassword = () => {
  const [componentName, setComponentName] = useState();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Form submitted successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="loginPage_nfc">
      <ToastContainer />
      <div className="Form_A">
        <PageView
          pageType={componentName}
          setComponentName={setComponentName}
          handleSubmit={handleSubmit}
          register={register}
          getValues={getValues}
          errors={errors}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
