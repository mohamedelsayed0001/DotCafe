import './menu.css'
import Orders from '../assets/tracking.svg';
function LogedinButton(){
    const goToTrack = () => {
         
    };

    return (
        <div>
            <button onClick={goToTrack} className="menu-track-button">
                Track
            </button>
            <img src={Orders} alt="Order" className='Orders'/>
        </div>
    );
    
}
export default LogedinButton;