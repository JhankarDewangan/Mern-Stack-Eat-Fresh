import LogoTagline from "../images/LOGO_Tagline.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../Redux/actions/allActions";
import getUser from "../getData/getUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifySignUpPassword, notify } from "../alerts/toastify";
import * as EmailValidator from "email-validator";
import sendMail from "../getData/sendMail";
import { signUpMessage } from "../messages/emailMessage";
import { signUpSubject } from "../messages/emailSubject";
import "../css/styles.css";

function SignUp() {
  console.log(process.env.REACT_APP_ABC, "oo");
  let currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [register, setRegister] = useState({
    username: "",
    name: "",
    password: "",
    repass: "",
  });

  function onChange(e) {
    setRegister({ ...register, [e.target.name]: e.target.value });
  }
  async function handleClick(e) {
    //console.log(register);
    e.preventDefault();

    console.log("mailer function called");
    if (register.name.length < 3) {
      notify("Enter Full Name !");
      return;
    }
    if (register.password !== register.repass) {
      // alert("Passwords dont match !");
      notify("Passwords dont match !!");
      return;
    }
    if (!EmailValidator.validate(register.username)) {
      notify("Invalid mail-id !");
      return;
    }
    //creating user data
    const response = await fetch("http://localhost:3500/signup", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",

      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: register.username,
        name: register.name,
        password: register.password,
      }),
    });
    const json = await response.json();
    console.log(json); // for testing
    if (json.success) {
      let user = { username: register.username };
      dispatch(allActions.userActions.setUser(user));
      console.log(currentUser); // for testing
      localStorage.setItem("username", register.username);
      localStorage.setItem("token", json.authToken);
    } else {
      notify("Email Id already exists !");
      return;
    }
    let user = await getUser(register.username);
    console.log(user);
    localStorage.setItem("user_id", user._id);
    // console.log(localStorage.getItem("user_id"));
    let emailData = await sendMail(
      register.username,
      signUpMessage(register.name),
      signUpSubject()
    );
    console.log(emailData);
    const result = await fetch(
      "http://localhost:3500/customer/credits/createCredits",
      {
        // credentials: 'include',
        // Origin:"http://localhost:3000/login",

        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          user_id: user._id,
        }),
      }
    );
    let creditData = await result.json();
    console.log(creditData);
    if (creditData.success === true) {
      console.log(creditData);
      navigate(`/plans`);
    }
  }
  async function HandleGoogle() {
    console.log("hello");
    const response = await fetch("http://localhost:3500/auth/google", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",

      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return (
    <div className="logincontain">
      <div className="left">
        <img
          style={{
            flexGrow: "1",
          }}
          className="loginlogo"
          src={LogoTagline}
          alt="React Logo"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: "2",
          }}
        >
          <h1 style={{ fontWeight: "bolder" }}>
            {" "}
            We <span style={{ color: "#519938" }}>deliver</span> happiness and{" "}
          </h1>
          <h1 style={{ fontWeight: "bolder", color: "orange" }}>
            {" "}
            satisfaction
          </h1>
        </div>
      </div>
      <div className="right">
        <div className="rightUpper">
          <button
            onClick={() => navigate("/plans")}
            type="submit"
            className="btn btn-warning"
          >
            Check Plans
          </button>
        </div>
        <div className="card1" style={{ height: "50vh" }}>
          <form className="loginForm">
            <div className="input-group input-group-lg ">
              <input
                style={{ borderColor: "orange" }}
                placeholder="Email"
                name="username"
                value={register.username}
                type="email"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
                onChange={onChange}
              />
            </div>
            <div className="input-group input-group-lg ">
              <input
                style={{ borderColor: "orange" }}
                placeholder="Full Name"
                name="name"
                value={register.name}
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
                onChange={onChange}
              />
            </div>
            <div className="input-group input-group-lg ">
              <input
                value={register.password}
                name="password"
                style={{ borderColor: "orange" }}
                placeholder="Password"
                type="password"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
                onChange={onChange}
              />
            </div>
            <div className="input-group input-group-lg ">
              <input
                value={register.repass}
                name="repass"
                style={{ borderColor: "orange" }}
                type="password"
                placeholder="Re-enter Password"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
                onChange={onChange}
              />
            </div>
            <button
              onClick={handleClick}
              type="submit"
              className="btn btn-warning btn-lg"
            >
              Sign Up !
            </button>
          </form>
        </div>
        <a
          type="button"
          href="http://localhost:3500/auth/google"
          className="btn btn-danger btn-block mb-4 "
        >
          <i className="fab fa-google"></i> Sign Up with Google
        </a>
      </div>
      {/* <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
    </div>
  );
}

export default SignUp;
