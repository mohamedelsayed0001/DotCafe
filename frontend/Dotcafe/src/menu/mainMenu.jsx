import './menu.css';
import { useRef } from 'react';
import SearchBar from './searchBar';
import CategoryList from './categoryList';
import Categories from './categories';

function MainMenu ({menu,setProduct}) {
    const catlist = menu.map(item => item.name);
    const categoryRefs = useRef({});

    const handleScroll = (category) => {
        const categoryElement = categoryRefs.current[category];
        if (categoryElement) {
            categoryElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='main-menu'>
            {Array.isArray(menu) ? (
               <>
                <SearchBar/>
                <CategoryList catlist={catlist} handleScroll={handleScroll} />
                {
                    menu.map((category, index) => (
                    <div
                      key={index}
                      ref={(el) => (categoryRefs.current[category.name] = el)}
                    >
                      <Categories
                          category={category} 
                          setProduct={setProduct}
                      />
                  </div>
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