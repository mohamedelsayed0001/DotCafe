import './menu.css';

import SearchBar from './searchBar';
import CategoryList from './categoryList';
import Categories from './categories';

function MainMenu ({setwindow,menu}) {
    const catlist = menu.map(item => item.name);

    return (
        <div className='main-menu'>
            {Array.isArray(menu) ? (
                /*menu.map((category, index) => (
                    <div key={index}>
                        <h2>{category.name}</h2>
                        <ul>
                            {category.products.map((product, productIndex) => (
                                <li key={productIndex}>{product.name}</li>
                            ))}
                        </ul>
                    </div>
                )*/
               
               <>
                <SearchBar/>
                <CategoryList catlist={catlist}/>
                {
                    menu.map((category, index) => (
                        <Categories key={index} category={category}></Categories>
                    ))
                }
               </>
            ) : (
                <p>Loading menu...</p>
            )}
        </div>
    );
}
export default MainMenu;