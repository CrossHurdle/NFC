import React, { useState } from "react";
import "../Components/nfc.css";
import { Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import Api from "../Api";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Form_LR() {
  // const onSubmit = (data) => {
  //   console.log(data);
  //   alert(JSON.stringify(data));
  // };

  // const onSubmite = (data) => {
  //   const { password, passwordrepeat } = data;

  //   // Add custom password validation logic here
  //   if (password !== passwordrepeat) {
  //     alert("Passwords do not match");
  //   } else {
  //     alert("Registration successful");
  //     // You can submit the form data to your API or take other actions here
  //   }
  // };

  const Login = () => {
    // const navigate = useNavigate();
    const [passwordShown, setpasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
      setpasswordShown(!passwordShown);
    };
    const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
    } = useForm();
    const handleFormSubmit = async () => {
      const Details = {
        email: getValues().email,
        password: getValues().password,
      };

      console.log("Details", Details);

      await axios
        .post("http://localhost:8080/auth/login", Details)
        .then((resp) => {
          console.log("resp.data", resp.data);

          if (resp.data.message === "Login successful") {
            // Display a success message using toast
            toast.success("Login successful", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
            localStorage.setItem("userName", resp.data.user.name);
            localStorage.setItem("userMail", resp.data.user.email);
            localStorage.setItem("Userid", resp.data.user._id
            );

            // Navigate to the home page after 2 seconds
            setTimeout(() => {
              // navigate("/");
            }, 2000); // 2 seconds
          } else {
            // Display an error message if login fails
            toast.error("Login failed", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
          }
        });
    };

    return (
      <div>
        <Row>
          <Col className="NfcLogin" sm={12} mg={12} lg={12} xl={12}>
            <form
              className="form_outline"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <label className="formP_label" htmlFor="UserName">
                User Email
              </label>
              <input
                className="loginPageInput"
                placeholder="Enter your Email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="Stud-personal-error" style={{ color: "red" }}>
                  Email is required
                </span>
              )}

              <label className="formP_label" htmlFor="Password">
                Password
              </label>
              <div style={{ width: "100%" }}>
                <input
                  className="loginPageInput"
                  placeholder="Enter Your Password"
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
                  <span
                    className="Stud-personal-error"
                    style={{ color: "red" }}
                  >
                    Password is required
                  </span>
                )}
              </div>
              <div className="ForgotPassword_Css">
                <Link
                  style={{
                    color: "white",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  to="/ForgotPassword"
                >
                  ForgotPassword?
                </Link>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  margin: "3%",
                  paddingLeft: "10px",
                }}
              >
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />{" "}
                &nbsp;
                <label className="formP_label" htmlFor="exampleCheck1">
                  Check me out
                </label>
              </div>
              <button
                className="form_login_style"
                type="submit"
                // onClick={() => {
                //   navigate("/");
                // }}
              >
                Submit
              </button>
            </form>
          </Col>
        </Row>
      </div>
    );
  };

  const Register = () => {
    const [passwordShown, setpasswordShown] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisiblity = () => {
      setpasswordShown(!passwordShown);
    };
    const togglePasswordVisiblitys = () => {
      setShowPassword(!showPassword);
    };

    const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
    } = useForm();

    const handleFormSignupLogin = async () => {
      const singupDetails = {
        name: getValues().name,
        email: getValues().email,
        phoneNumber: getValues().phoneNumber,
        password: getValues().password,
        confirmPassword: getValues().confirmPassword,
      };
      console.log("Details", singupDetails);

      try {
        const response = await axios.post(
          "http://localhost:8080/auth/signup",
          singupDetails
        );

        console.log("resp.data", response.data);

        if (response.data.message === "User registered successfully" ) {
          // Display a success message using toast
          toast.success("Sign up successful", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });

          // Navigate to the home page after 2 seconds
          setTimeout(() => {
            // navigate("/");
          }, 2000); // 2 seconds
        } else {
          // Display an error message if signup fails
          toast.error("Signup failed", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        }
      } catch (error) {
        // Log and handle the error appropriately
        console.error("Error occurred:", error);
        // Display an error message using toast or other error handling
        toast.error("Signup failed", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    };

    return (
      <div role="tablePanel">
        <form onSubmit={handleSubmit(handleFormSignupLogin)}>
          {/* Form inputs and validation messages */}
          <div className="form_outline">
            <label className="formP_label" htmlFor="userName">
              UserName
            </label>
            <input
              type="text"
              placeholder="Enter Your UserName"
              className="form-control"
              {...register("name", {
                required: true,
                maxLength: 20,
              })}
            />
            {errors.name?.type === "required" && (
              <p className="form_error">This field is required</p>
            )}
          </div>
          <div className="form_outline">
            <label className="formP_label" htmlFor="registerEmail">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter Your Mail"
              id="registerEmail"
              className="form-control"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email?.type === "required" && (
              <p className="form_error">This field is required</p>
            )}
          </div>
          <div className="form_outline">
            <label className="formP_label" htmlFor="registerPassword">
              Password
            </label>
            <div
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                id="registerPassword"
                className="form-control"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/,
                })}
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
              {errors.password?.type === "minLength" && (
                <p className="form_error">Minimum Length is 8 characters</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="form_error">Maximum Length is 20 characters</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="form_error">
                  Password should contain at least one lowercase letter, one
                  uppercase letter, one digit, and one special character.
                </p>
              )}
            </div>
          </div>
          <div className="form_outline">
            <label className="formP_label" htmlFor="registerRepeatPassword">
              Confirm password
            </label>
            <div
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <input
                type={passwordShown ? "text" : "password"}
                placeholder="Enter Your ConfirmPassword"
                id="registerRepeatPassword"
                className="form-control"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => {
                    const { password } = getValues();
                    return password === value || "Passwords do not match";
                  },
                })}
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
              {errors.confirmPassword && (
                <p className="form_error">Passwords do not match</p>
              )}
            </div>
          </div>
          <br />
          <div className="form-check">
            <input
              className="form-check-input me-2"
              type="checkbox"
              value=""
              id="registerCheck"
              checked
              aria-describedby="registerCheckHelpText"
            />
            <label className="formP_label" htmlFor="registerCheck">
              I have read and agree to the terms
            </label>
          </div>
          <div style={{ padding: "4%" }}>
            <button type="submit" className="form_login_style">
              Sign in
            </button>
          </div>
        </form>
      </div>
    );
  };

  const [activeTable, setActiveTable] = useState("Login");

  return (
    <div className="loginPage_nfc">
      {/* <ToastContainer position="top-center" />  */}
      <div className="Form_A">
        <button
          onClick={() => setActiveTable("Login")}
          className={`button_form1 ${activeTable === "Login" ? "active" : ""}`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTable("Register")}
          className={`button_form ${
            activeTable === "Register" ? "active" : ""
          }`}
        >
          Register
        </button>
        {activeTable === "Login" && <Login />}
        {activeTable === "Register" && <Register />}
      </div>
      <ToastContainer />
    </div>
  );
}
