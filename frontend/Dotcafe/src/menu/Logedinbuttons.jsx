import './menu.css'
import Orders from '../assets/tracking.svg';
function LogedinButton(){
  
    
    const goToTrack = () => {
        window.location.href = "/track"; 
    };

    return (
        <div>
            
            <button onClick={goToTrack} className="track-button">
                Track
            </button>
            <img src={Orders} alt="Order" className='Orders'/>
        </div>
    );
    
}
export default LogedinButton;