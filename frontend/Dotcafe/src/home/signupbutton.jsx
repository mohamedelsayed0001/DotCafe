import './home.css';

function SignupButton({setwindow}) {
    
    

    return (
        <div>
            <button onClick={()=>setwindow("menu")} className="menu-button">
                Menu
            </button>
            <button onClick={()=>setwindow("sign in")} className="login-button">
                Log In
            </button>
            <button onClick={()=>setwindow("sign up")} className="signup-button">
                Sign Up
            </button>
        </div>
    );
}

export default SignupButton;
