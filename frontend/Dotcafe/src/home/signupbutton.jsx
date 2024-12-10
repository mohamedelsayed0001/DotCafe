import './home.css';

function SignupButton({setwindow}) {
    const goToMenu = () => {
        window.location.href = "/menu"; 
    };
    const goToLogin = () => {
        window.location.href = "/login"; 
    };
    const goToSignup = () => {
        window.location.href = "/registration"; 
    };

    return (
        <div>
            <button onClick={goToMenu} className="menu-button">
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
