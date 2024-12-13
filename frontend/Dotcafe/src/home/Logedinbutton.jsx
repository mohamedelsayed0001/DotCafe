import './home.css'
import profile from '../assets/profile.svg';
function LogedinButton({setwindow}){
  
    
    const goToTrack = () => {
       
    };

    return (
        <div>
            <button onClick={()=>setwindow("menu")} className="menu-button">
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