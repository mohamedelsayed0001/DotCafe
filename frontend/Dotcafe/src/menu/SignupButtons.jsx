import './menu.css'
function SignupButtons({setwindow}) {
    
    return (
        <div className='navigation-container'>
            <button onClick={()=>setwindow("sign in")} className="menu-login-button">
                Log In
            </button>
            <button onClick={()=>setwindow("sign up")} className="menu-signup-button">
                Sign Up
            </button>
        </div>
    );
}
export default SignupButtons;