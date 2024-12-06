import "./Registration.css";
import { useState } from "react";
import logo_icon from "/public/logo.svg";

function Registration(props) {
 //use state for all input to handle its value
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [phone, setPhone] = useState("");
//sign-up and sign-in button options to handle two cases
  const signUp = [
    { name: "Name", id: 1 },
    { name: "E-mail Address", id: 2 },
    { name: "Password", id: 3 },
    { name: "Confirm Password", id: 4 },
    { name: "Phone Number", id: 5 },
    { name: "Sign UP", id: 6 },
  ];

  const signIn = [
    { name: "E-mail Address", id: 1 },
    { name: "Password", id: 2 },
    { name: "Sign IN", id: 3 },
  ];


  const signUpOptions = signUp.map((op) => {
    if (op.name === "Password" || op.name === "Confirm Password") {
      return (
        <input
          type="password"
          key={op.id}
          className="signUp-options"
          placeholder={op.name}
          value={op.name === "Password" ? password : confirmPass}
          onChange={(e) =>
            op.name === "Password"
              ? setPassword(e.target.value)
              : setConfirmPass(e.target.value)
          }
        />
      );
    }

    if (op.name === "Sign UP") {
      return (
        <input
          type="submit"
          key={op.id}
          className="signUp-options"
          style={{
            background: "#FEEFAE",
            textAlign: "center",
            color: "black",
            fontWeight: "800",
          }}
          value={op.name}
        />
      );
    }

    return (
      <input
        type="text"
        key={op.id}
        className="signUp-options"
        placeholder={op.name}
        value={
          op.name === "Name"
            ? name
            : op.name === "E-mail Address"
            ? email
            : phone
        }
        onChange={(e) =>
          op.name === "Name"
            ? setName(e.target.value)
            : op.name === "E-mail Address"
            ? setEmail(e.target.value)
            : setPhone(e.target.value)
        }
      />
    );
  });


  const signInOptions = signIn.map((op) => {
    if (op.name === "Password") {
      return (
        <input
          type="password"
          key={op.id}
          className="signUp-options"
          placeholder={"Enter " + op.name}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      );
    }

    if (op.name === "Sign IN") {
      return (
        <input
          type="submit"
          key={op.id}
          className="signUp-options"
          style={{
            background: "#FEEFAE",
            textAlign: "center",
            color: "black",
            fontWeight: "800",
          }}
          value={op.name}
        />
      );
    }

    return (
      <input
        type="text"
        key={op.id}
        className="signUp-options"
        placeholder={op.name}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    );
  });

  
  function SignUp_SignIn() {
    return props.page === "signIn" ? signInOptions : signUpOptions;
  }

  return (
    <>
      <div className="header">
        <button className="logo">
          <img src={logo_icon} alt="Logo Icon" style={{ width: "100%" }} />
        </button>
        <div className="regist">
          <h1 style={{ color: "black" }}>
            {props.page === "signIn" ? "Welcome Back" : "Create Account"}
          </h1>
          {SignUp_SignIn()}
          {props.page === "signIn" && (
            <a
              className="create-account"
              href="##"
              style={{ color: "blue" }}
            >
              Create new Account
            </a>
          )}
        </div>
        {props.page !== "signIn" && <button className="login">Login</button>}
      </div>
    </>
  );
}

export default Registration;
