import './home.css';

function SignupButton() {
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
            <button onClick={goToLogin} className="login-button">
                Log In
            </button>
            <button onClick={goToSignup} className="signup-button">
                Sign Up
            </button>
        </div>
    );
}

export default SignupButton;
