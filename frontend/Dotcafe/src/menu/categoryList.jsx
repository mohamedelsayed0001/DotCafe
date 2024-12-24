import './menu.css';

function CategoryList({catlist, handleScroll }){
    return(
        <div className="catlist-container">
        {catlist.map((item, index) => ( 
        <button
          key={index}
          onClick={() => handleScroll(item)} 
          className="catlist"
            >
          {item}
        </button>
      ))}
    </div>
    );
}
export default CategoryList;