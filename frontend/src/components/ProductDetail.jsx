import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import API_URL from "../constants";

function ProductDetail() {

    const [product, setProduct] = useState();
    const [user, setUser] = useState();
    const params = useParams();

    useEffect(() => {
        const url = API_URL + '/get-product/' + params.productId;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    setProduct(res.data.product);
                }
            })
            .catch((err) => {
                alert('Server Err.');
            });
    }, []);

    const handleContact = (addedBy) => {
        console.log('id', addedBy);
        const url = API_URL + '/get-user/' + addedBy;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user);
                }
            })
            .catch((err) => {
                alert('Server Err.');
            });
    };

    return (
        <>
            <Header />
            <div>
                {product && (
                    <div className="d-flex justify-content-between flex-wrap">
                        <div>
                            <img src={API_URL + '/' + product.pimage} alt="" style={{ width: '400px', height: '200px', marginBottom: '10px' }} />
                            {product.pimage2 && <img src={API_URL + '/' + product.pimage2} alt="" style={{ width: '400px', height: '200px', marginBottom: '10px' }} />}
                            <h6 style={{ fontSize: '18px', marginBottom: '5px' }}>Pet Details:</h6>
                            <p style={{ fontSize: '16px', marginBottom: '20px' }}>{product.pdesc}</p>
                        </div>
                        <div>
                            <h3 className="m-2 price-text" style={{ fontSize: '24px', marginBottom: '10px' }}>Rs. {product.price} /-</h3>
                            <p className="m-2" style={{ fontSize: '18px', marginBottom: '20px' }}>{product.pname} | {product.category}</p>
                            {product.addedBy && (
                                <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px', backgroundColor: '#f9f9f9' }}>
                                    <button onClick={() => handleContact(product.addedBy)}>SHOW CONTACT DETAILS</button>
                                    {user && user.username && <h4 style={{ fontSize: '20px', marginBottom: '5px' }}>{user.username}</h4>}
                                    {user && user.mobile && <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>{user.mobile}</h3>}
                                    {user && user.email && <h6 style={{ fontSize: '16px', marginBottom: '0' }}>{user.email}</h6>}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProductDetail;