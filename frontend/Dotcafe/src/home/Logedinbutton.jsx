import './home.css'
import profile from '../assets/profile.svg';
function LogedinButton(){
  
    const goToMenu = () => {
     window.location.href = "/menu"; 
    };
    const goToTrack = () => {
        window.location.href = "/track"; 
    };

    return (
        <div>
            <button onClick={goToMenu} className="menu-button">
                Menu
            </button>
            <button onClick={goToTrack} className="track-button">
                Track
            </button>
            <img src={profile} alt="profile"  className='profile'/>
        </div>
    );
    
}
export default LogedinButton;