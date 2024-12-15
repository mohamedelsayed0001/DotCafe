import './menu.css';

function CategoryList({catlist}){
    const handleClick = (category) => {
        
        console.log(category);
    };

    return(
        <div className="catlist-container">
        {catlist.map((item, index) => ( 
        <button
          key={index}
          onClick={() => handleClick(item)} 
          className="catlist"
            >
          {item}
        </button>
      ))}
    </div>
    );
}
export default CategoryList;