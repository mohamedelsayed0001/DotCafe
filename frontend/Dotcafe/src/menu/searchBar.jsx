import './menu.css'
import Search from '../assets/search.svg'

function SearchBar(){

    return(
        <div  className='searchBar'>
            
            <img src={Search} alt="search" className='search'/> 
        </div>
    )
}

export default SearchBar