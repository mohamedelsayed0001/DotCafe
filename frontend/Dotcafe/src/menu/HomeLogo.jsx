import logo from '../assets/logo.svg'; 
import './menu.css';

function HomeLogo({setwindow}){
    return(
        <img src={logo} onClick={()=>setwindow("home")} alt="Background"  className='Menu-logo'/>
    )
}
export default HomeLogo