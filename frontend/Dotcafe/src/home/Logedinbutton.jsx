import './home.css'
import profile from '../assets/profile.svg';
function LogedinButton({setwindow,setSigned}){
  
    
    const goToTrack = () => {
       setwindow("track")
    };

    return (
        <div>
            <button onClick={()=>setwindow("menu")} className="menu-button">
                Menu
            </button>
            <button onClick={goToTrack} className="track-button">
                Track
            </button>
            <button className="Log-out-button"  onClick={()=>{setwindow("home" );setSigned(false)}}>Log out</button>
            <img src={profile} alt="profile"  className='profile' onClick={()=>{setwindow("profile")}}/>
         
        </div>
    );
    
}
export default LogedinButton;