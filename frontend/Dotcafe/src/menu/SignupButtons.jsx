import './menu.css'
function SignupButtons({setwindow}) {
    
    return (
        <div>
            <button onClick={()=>setwindow("sign in")} className="login-button">
                Log In
            </button>
            <button onClick={()=>setwindow("sign up")} className="signup-button">
                Sign Up
            </button>
        </div>
    );
}
export default SignupButtons;