import './menu.css'
import ItemCard from './itemCard';
function Categories({category}){

    return(
        <>
            <h1 className='category-name'>{category.name}</h1>
            <div className="categories-container">
                {category.products.map((product, productIndex) => (
                    <ItemCard key={productIndex} product={product} />
                ))}
            </div>  
        </>
    );
}
export default Categories;