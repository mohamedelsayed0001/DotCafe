import "./Registration.css";
import { useState,useEffect } from "react";
import logo_icon from "/public/logo.svg";
import axios from 'axios'

function Registration({window,setWindow,customerDTO,setCustomerDTO, signed,setSigned}) {
  const [noteMessage, setNoteMessage] = useState("");//to handle massage error to be visible in form  
  function showNoteMessage(message) {
    setNoteMessage(message);
    setTimeout(() => setNoteMessage(""), 2000);// Hide the msg after 2sec
  }
  function validData(signUp) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    let msg = "";
  
    if ((!formData.email || !formData.password) || (signUp && (!formData.name || !formData.confirmPass || !formData.phone))) {
      msg = "Please fill in all required fields!";
    } else if (!emailRegex.test(formData.email)) {
      msg = "Invalid email format!";
    }
  
    if (msg) {
      showNoteMessage(msg);
      return false;
    }
    return true;
  }
  
  
  async function handleRegistration(signup) {
    if (validData(signup)) {
      const customerData = 
         {
            id: null,
            role: null,
            points:null,
            name: formData.name,
            mail: formData.email,
            password: formData.password,
            phoneNumber: formData.phone,
          };
  
      const url = signup
        ? "http://localhost:8080/customer/signup"
        : "http://localhost:8080/customer/login";
  
      try {
        const response = await axios.post(url, customerData);
  
        if (response.status === 202 || response.status === 200) {
          setCustomerDTO(response.data);
          setSigned(true);
          setWindow(response.data.role === "admin" ? "admin" : "home");
        } else {
          showNoteMessage(response.statusText || "Unexpected response");
        }
      } catch (error) {
        console.error("Error:", error);
        showNoteMessage("An error occurred. Please try again.");
      }
    }
  }
  
 
const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
    phone: ""
});

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
};


//sign-up and sign-in button options to handle two cases
  const signUp = [{ name: "Name", id: 1 },{ name: "E-mail Address", id: 2 }, { name: "Password", id: 3 },
    { name: "Confirm Password", id: 4 },{ name: "Phone Number", id: 5 },{ name: "Sign UP", id: 6 },
  ];

  const signIn = [
    { name: "E-mail Address", id: 1 },{ name: "Password", id: 2 },{ name: "Sign IN", id: 3 },
  ];


  const signUpOptions = signUp.map((op) => {
    if (op.name === "Password" || op.name === "Confirm Password") {
      return (
        <input
          name= {op.name ==="Password" ?"password":"confirmPass"}
          type="password"
          key={op.id}
          className="signUp-options"
          placeholder={op.name}
          value={op.name === "Password" ?  formData.password : formData.confirmPass}
          onChange={(e) =>
            handleInputChange(e)
          }
        />
      );
    }

    if (op.name === "Sign UP") {
      return (
        <>
         {noteMessage && <h1 style={{ fontSize: "1rem" }}>{noteMessage}</h1>}

          <input
          type="submit"
          key={op.id}
          className={"signUp"}
          onClick={()=>handleRegistration(true)}
          value={op.name}
        />
        </>
       
      );
    }

    return (
      <input
        type="text"
        name={
          op.name === "Name"
          ? "name"
          : op.name === "E-mail Address"
          ? "email"
          : "phone"
        }
        key={op.id}
        className="signUp-options"
        placeholder={op.name}
        value={
          op.name === "Name"
            ? formData.name
            : op.name === "E-mail Address"
            ? formData.email
            : formData.phone
        }
        onChange={(e) =>
             handleInputChange(e)
        }
      />
    );
  });


  const signInOptions = signIn.map((op) => {
    if (op.name === "Password") {
      return (
        <input
          name="password"
          type="password"
          key={op.id}
          className="signUp-options"
          placeholder={"Enter " + op.name}
          value={formData.password}
          onChange={(e) => handleInputChange(e)}
        />
      );
    }

    if (op.name === "Sign IN") {
      return (
        <>
          {noteMessage && <h1 style={{ fontSize: "1rem" }}>{noteMessage}</h1>}
        <input
          type="submit"
          key={op.id}
          className="signUp"
          onClick={()=>{handleRegistration(false)}}
          value={op.name}
        />
      
        </>
      );
    }

    return (
      <input
        type="text"
        name="email"
        key={op.id}
        className="signUp-options"
        placeholder={op.name}
        value={formData.email}
        onChange={(e) =>handleInputChange(e)}
      />
    );
  });

  
  function SignUp_SignIn() {
    return window === "sign in" ? signInOptions : signUpOptions;
  }
  useEffect(() => {
    document.body.classList.add('signup-page-body');

    return () => {
        document.body.classList.remove('signup-page-body');
    };
}, []);
  
  return (
    <>
      <div className="header">
        <button className="logo" onClick={()=>{setWindow("home")}}>
          <img src={logo_icon} alt="Logo Icon" style={{ width: "100%" }} />
        </button>
        <div className="regist">
          <h1 style={{ color: "black" }}>
            {window === "sign in" ? "Welcome Back" : "Create Account"}
          </h1>
          {SignUp_SignIn()}
      
          {window === "sign in" && (
            <a
              className="create-account"
              href="##"
              style={{ color: "blue" }}
              onClick={()=>{
                setWindow("sign up")
              }}
            >
              Create new Account
            </a>
          )}
        </div>
        {window=="sign up"&& <button className="login" onClick={()=>{setWindow("sign in")}}>Login</button>}
      </div>
    </>
  );
}

export default Registration;
