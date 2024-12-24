import './menu.css'
import ItemCard from './itemCard';
function Categories({category,setProduct}){

    return(
        <>
            <h1 className='category-name'>{category.name}</h1>
            <div className="categories-container">
                {category.products.map((product, productIndex) => (
                    <ItemCard key={productIndex} product={product} setProduct={setProduct}  />
                ))}
            </div>  
        </>
    );
}
export default Categories;