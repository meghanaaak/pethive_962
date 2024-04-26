// import { useEffect, useState } from "react";
// import Header from "./Header";
// import { useNavigate} from "react-router-dom";
// import axios from "axios";
// import Categories from "./Categories";
// import { FaHeart } from "react-icons/fa";
// import './Home.css';
// import API_URL from "../constants";


// function Home() {

//     const navigate = useNavigate()

//     const [products, setproducts] = useState([]);
//     const [cproducts, setcproducts] = useState([]);
//     const [search, setsearch] = useState('');
//     const [issearch, setissearch] = useState(false);

//     // useEffect(() => {
//     //     if (!localStorage.getItem('token')) {
//     //         navigate('/login')
//     //     }
//     // }, [])

//     useEffect(() => {
//         const url = API_URL + '/get-products';
//         axios.get(url)
//             .then((res) => {
//                 if (res.data.products) {
//                     setproducts(res.data.products);
//                 }
//             })
//             .catch((err) => {
//                 alert('Server Err.')
//             })
//     }, [])

//     const handlesearch = (value) => {
//         setsearch(value);
//     }

//     const handleClick = () => {

//         const url = API_URL + '/search?search=' + search ;
//         axios.get(url)
//             .then((res) => {
//                 setcproducts(res.data.products);
//                 setissearch(true);
//             })
//             .catch((err) => {
//                 alert('Server Err.')
//             })

//         // let filteredProducts = products.filter((item) => {
//         //     if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
//         //         item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
//         //         item.category.toLowerCase().includes(search.toLowerCase())) {
//         //         return item;
//         //     }
//         // })
//         // setcproducts(filteredProducts)

//     }

//     const handleCategory = (value) => {
//         let filteredProducts = products.filter((item, index) => {
//             if (item.category === value) {
//                 return item;
//             }
//         })
//         setcproducts(filteredProducts)
//     }

//     const handleLike = (productId, e) => {
//         e.stopPropagation();
//         let userId = localStorage.getItem('userId');

//         if (!userId) {
//             alert('Please Login first.')
//             return;
//         }

//         const url = API_URL + '/like-product';
//         const data = { userId, productId }
//         axios.post(url, data)
//             .then((res) => {
//                 if (res.data.message) {
//                     alert('Liked.')
//                 }
//             })
//             .catch((err) => {
//                 alert('Server Err.')
//             })

//     }


//     const handleProduct = (id) => {
//         navigate('/product/' + id)
//     }


//     return (
//         <div>
//             <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
//             <Categories handleCategory={handleCategory} />
//             {issearch && cproducts &&
//                 <h5> SEARCH RESULTS
//                     <button className="clear-btn" onClick={() => setissearch(false)}> CLEAR </button>
//                 </h5>}

//             {issearch && cproducts && cproducts.length === 0 && <h5> No Results Found </h5>}
//             {issearch && <div className="d-flex justify-content-center flex-wrap">
//                 {cproducts && products.length > 0 &&
//                     cproducts.map((item, index) => {

//                         return (
//                             <div key={item._id} className="card m-3 ">
//                                 <div onClick={() => handleLike(item._id)} className="icon-con">
//                                     <FaHeart className="icons" />
//                                 </div>
//                                 <img width="300px" height="200px" src={API_URL + '/' + item.pimage} />

//                                 <p className="m-2"> {item.pname}  | {item.category} </p>
//                                 <h3 className="m-2 text-danger"> {item.price} </h3>
//                                 <p className="m-2 text-success"> {item.pdesc} </p>
//                             </div>
//                         )

//                     })}
//             </div>}

//             {!issearch && <div className="d-flex justify-content-center flex-wrap">
//                 {products && products.length > 0 &&
//                     products.map((item, index) => {

//                         return (
//                             <div onClick={() => handleProduct(item._id)} key={item._id} className="card m-3">
//                                 <div onClick={(e) => handleLike(item._id, e)} className="icon-con">
//                                     <FaHeart className="icons" />
//                                 </div>
//                                 <img width="250px" height="150px" src={API_URL + '/' + item.pimage} />
//                                 <h3 className="m-2 price-text"> Rs. {item.price} /- </h3>
//                                 <p className="m-2"> {item.pname}  | {item.category} </p>
//                                 <p className="m-2 text-success"> {item.pdesc} </p>
//                             </div>
//                         )

//                     })}
//             </div>}

//         </div>
//     )
// }

// export default Home;
import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import API_URL from "../constants";
import './Home.css';

function Home() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [cproducts, setCproducts] = useState([]);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        const url = API_URL + '/get-products';
        axios.get(url)
            .then((res) => {
                if (res.data.products) {
                    setProducts(res.data.products);
                }
            })
            .catch((err) => {
                alert('Server error.');
            });
    }, []);

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleClick = () => {
        const url = API_URL + '/search?search=' + search;
        axios.get(url)
            .then((res) => {
                setCproducts(res.data.products);
                setIsSearch(true);
            })
            .catch((err) => {
                alert('Server error.');
            });
    };

    const handleCategory = (value) => {
        const filteredProducts = products.filter((item) => item.category === value);
        setCproducts(filteredProducts);
    };

    const handleLike = (productId, e) => {
        e.stopPropagation(); // Prevent event bubbling to avoid navigating
        const userId = localStorage.getItem('userId');

        if (!userId) {
            alert('Please login first.');
            return;
        }

        const url = API_URL + '/like-product';
        const data = { userId, productId };

        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert('Liked.');
                }
            })
            .catch((err) => {
                alert('Server error.');
            });
    };

    const handleProduct = (id) => {
        navigate('/product/' + id);
    };

    return (
        <div>
            <Header search={search} handleSearch={handleSearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />

            {isSearch && cproducts && (
                <h5>
                    SEARCH RESULTS
                    <button className="clear-btn" onClick={() => setIsSearch(false)}>CLEAR</button>
                </h5>
            )}

            {isSearch && cproducts.length === 0 && <h5>No Results Found</h5>}

            <div className="d-flex justify-content-center flex-wrap"> {/* Flex-wrap for proper alignment */}
                {(isSearch ? cproducts : products).map((item) => (
                    <div
                        key={item._id}
                        className="card m-3"
                        style={{
                            width: '280px', // Consistent card width
                            borderRadius: '10px', // Rounded corners
                            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', // Soft shadow
                            backgroundColor: '#ffffff', // White card background
                            cursor: 'pointer', // Indicate clickable
                            transition: 'box-shadow 0.3s', // Smooth hover effect
                        }}
                        onClick={() => handleProduct(item._id)} // Navigate on click
                    >
                        <div
                            onClick={(e) => handleLike(item._id, e)}
                            style={{
                                position: 'absolute', // Absolute positioning for the heart icon
                                top: '10px',
                                right: '10px',
                                color: 'red', // Heart icon color
                                cursor: 'pointer', // Indicate clickable
                            }}
                        >
                            <FaHeart className="icons" />
                        </div>
                        <img
                            src={API_URL + '/' + item.pimage}
                            alt={`Image of ${item.pname}`}
                            style={{
                                width: '100%', // Full-width image
                                height: '150px', // Consistent height for the image
                                objectFit: 'cover', // Ensure the image fills the space
                            }}
                        />
                        <div style={{ padding: '10px' }}> {/* Padding for content */}
                            <h3 style={{ color: 'red', marginBottom: '10px' }}>
                                Rs. {item.price} /-
                            </h3>
                            <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                                {item.pname} | {item.category}
                            </p>
                            <p style={{ color: 'green' }}>{item.pdesc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
