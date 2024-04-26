
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import categories from './CategoriesList';

function Categories(props) {

    const navigate = useNavigate();

    return (
        <div className='cat-container'>
            <div>
                <span className='pr-3' style={{fontWeight:"bold", fontFamily:"Arial, sans-serif"}}>All Categories</span>
                {categories && categories.length > 0 &&
                    categories.map((item, index) => {
                        return (
                            <span onClick={() => navigate('/category/' + item)} key={index} className='category' style={{fontWeight:"bold", fontFamily:"Arial, sans-serif"}}> {item} </span>
                        )
                    })}
            </div>
        </div>
    )
}


export default Categories;
