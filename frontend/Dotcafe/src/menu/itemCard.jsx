import './menu.css';
import Drink from '../assets/drink3.svg'
function ItemCard({product}){
    return(<>
           <div className="item-card">
            <img src={Drink} alt="Background" className="Menu-logo" />
            <h1>{product.name}</h1>
        </div>
    </>);
}
export default ItemCard;