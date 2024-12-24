import './menu.css';
import Drink from '../assets/drink3.svg'
import ItemCardpage from './itemCardPage';
function ItemCard({product,setProduct}){
    return(<>
           <div className="item-card" onClick={() => {
                                                setProduct(product)
                                            }}>
            <img src={product.src ? product.src : Drink} alt="Drinkimg"/>
            <h1>{product.name}</h1>
        </div>
    </>);
}
export default ItemCard;