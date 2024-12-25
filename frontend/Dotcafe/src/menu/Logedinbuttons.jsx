import './menu.css'
import Orders from '../assets/tracking.svg';
function LogedinButton({setWindow,cart}){
    return (
        <div className='navigation-container'>
           <button 
                onClick={() => { setWindow("track")}} 
                className="menu-track-button" 
                aria-label="Track"
                >
                Track
                </button>
        
                <img src={Orders} alt="Order Icon" className="Orders" style={{cursor:"pointer"}} aria-disabled={cart} onClick={()=>{setWindow("orderReview")}} />
              
           
        </div>
    );
    
}
export default LogedinButton;