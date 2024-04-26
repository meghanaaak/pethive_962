
// import { useEffect, useState } from "react";
// import Header from "./Header";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Categories from "./Categories";
// import { FaHeart } from "react-icons/fa";
// import './Home.css';
// import API_URL from "../constants";

// function MyProducts() {
//     const navigate = useNavigate();
//     const [products, setProducts] = useState([]);
//     const [search, setSearch] = useState('');

//     useEffect(() => {
//         const url = API_URL + '/my-products';
//         let data = { userId: localStorage.getItem('userId') };
//         axios.post(url, data)
//             .then((res) => {
//                 if (res.data.products) {
//                     setProducts(res.data.products);
//                 }
//             })
//             .catch((err) => {
//                 alert('Server Err.')
//             });
//     }, []);

//     const handleSearch = (value) => {
//         setSearch(value);
//     };

//     const handleClick = () => {
//         const filteredProducts = products.filter((item) => {
//             const itemName = item.pname.toLowerCase();
//             const itemDesc = item.pdesc.toLowerCase();
//             const itemCategory = item.category.toLowerCase();
//             const searchQuery = search.toLowerCase();
//             return itemName.includes(searchQuery) || itemDesc.includes(searchQuery) || itemCategory.includes(searchQuery);
//         });
//         setProducts(filteredProducts);
//     };

//     const handleLike = (productId) => {
//         const userId = localStorage.getItem('userId');
//         const url = API_URL + '/like-product';
//         const data = { userId, productId };
//         axios.post(url, data)
//             .then((res) => {
//                 if (res.data.message) {
//                     alert('Liked.');
//                 }
//             })
//             .catch((err) => {
//                 alert('Server Err.');
//             });
//     };

//     return (
//         <div>
//             <Header search={search} handlesearch={handleSearch} handleClick={handleClick} />
//             <Categories />

//             <h5>SEARCH RESULTS</h5>
//             <div className="d-flex justify-content-center flex-wrap">
//                 {products && products.length > 0 &&
//                     products.map((item, index) => (
//                         <div key={item._id} className="card m-3 ">
//                             <div onClick={() => handleLike(item._id)} className="icon-con">
//                                 <FaHeart className="icons" />
//                             </div>
//                             <img width="300px" height="200px" src={API_URL + '/' + item.pimage} />
//                             <p className="m-2"> {item.pname} | {item.category} </p>
//                             <h3 className="m-2 text-danger"> {item.price} </h3>
//                             <p className="m-2 text-success"> {item.pdesc} </p>
//                         </div>
//                     ))}
//             </div>

//             <h5>ALL RESULTS</h5>
//             <div className="d-flex justify-content-center flex-wrap">
//                 {products && products.length > 0 &&
//                     products.map((item, index) => (
//                         <div key={item._id} className="card m-3 ">
//                             <div onClick={() => handleLike(item._id)} className="icon-con">
//                                 <FaHeart className="icons" />
//                             </div>
//                             <img width="300px" height="200px" src={API_URL + '/' + item.pimage} />
//                             <p className="m-2"> {item.pname} | {item.category} </p>
//                             <h3 className="m-2 text-danger"> {item.price} </h3>
//                             <p className="m-2 text-success"> {item.pdesc} </p>
//                         </div>
//                     ))}
//             </div>
//         </div>
//     );
// }

// export default MyProducts;
import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import API_URL from "../constants";

function MyProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const url = API_URL + '/my-products';
        const data = { userId: localStorage.getItem('userId') };
        axios.post(url, data)
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
        const filteredProducts = products.filter((item) => {
            const itemName = item.pname.toLowerCase();
            const itemDesc = item.pdesc.toLowerCase();
            const itemCategory = item.category.toLowerCase();
            const searchQuery = search.toLowerCase();
            return itemName.includes(searchQuery) || itemDesc.includes(searchQuery) || itemCategory.includes(searchQuery);
        });
        setProducts(filteredProducts);
    };

    const handleLike = (productId, e) => {
        e.stopPropagation(); // Prevent event bubbling to avoid unwanted clicks
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

    return (
        <div>
            <Header search={search} handleSearch={handleSearch} handleClick={handleClick} />
            <Categories />

            <h5>SEARCH RESULTS</h5>
            <div className="d-flex justify-content-center flex-wrap"> {/* Flex-wrap for proper alignment */}
                {products && products.length > 0 &&
                    products.map((item) => (
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
                        >
                            <div
                                onClick={(e) => handleLike(item._id, e)} // Stop event propagation
                                style={{
                                    position: 'absolute', // Position heart icon in the top-right corner
                                    top: '10px',
                                    right: '10px',
                                    color: 'red',
                                    cursor: 'pointer', // Indicates clickable icon
                                }}
                            >
                                <FaHeart className="icons" />
                            </div>
                            <img
                                src={API_URL + '/' + item.pimage}
                                alt={`Image of ${item.pname}`}
                                style={{
                                    width: '100%', // Full-width image
                                    height: '200px', // Consistent height
                                    objectFit: 'cover', // Ensure image fills the space
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

            <h5>ALL RESULTS</h5>
            <div className="d-flex justify-content-center flex-wrap"> {/* Proper alignment */}
                {products && products.length > 0 &&
                    products.map((item) => (
                        <div
                            key={item._id}
                            className="card m-3"
                            style={{
                                width: '280px', // Consistent card width
                                borderRadius: '10px',
                                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
                                backgroundColor: '#ffffff', // White card background
                                transition: 'box-shadow 0.3s', // Smooth hover transition
                            }}
                        >
                            <div
                                onClick={(e) => handleLike(item._id, e)} // Avoid event propagation
                                style={{
                                    position: 'absolute', // Position heart icon
                                    top: '10px',
                                    right: '10px',
                                    color: 'red',
                                    cursor: 'pointer', // Indicates clickable icon
                                }}
                            >
                                <FaHeart className="icons" />
                            </div>
                            <img
                                src={API_URL + '/' + item.pimage}
                                alt={`Image of ${item.pname}`}
                                style={{
                                    width: '100%',
                                    height: '200px', // Consistent height for image
                                    objectFit: 'cover', // Ensure image fills the space
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

export default MyProducts;
