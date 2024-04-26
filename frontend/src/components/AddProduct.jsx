import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import categories from "./CategoriesList";
import API_URL from "../constants";

function AddProduct() {
    const navigate = useNavigate();
    const [pname, setPname] = useState('');
    const [pdesc, setPdesc] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [pimage, setPimage] = useState(null);
    const [pimage2, setPimage2] = useState(null);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    const handleApi = () => {
        const formData = new FormData();
        formData.append('pname', pname);
        formData.append('pdesc', pdesc);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('pimage', pimage);
        formData.append('pimage2', pimage2);
        formData.append('userId', localStorage.getItem('userId'));

        const url = API_URL + '/add-product';
        axios.post(url, formData)
            .then((res) => {
                if (res.data.message) {
                    alert(res.data.message);
                    navigate('/');
                }
            })
            .catch((err) => {
                console.error("Error:", err);
                alert("Server error from frontend");
            });
    };

    return (
        <div>
            <Header />
            <div
                className="d-flex justify-content-center align-items-center"
                style={{
                    height: "100vh", // Center vertically and horizontally
                    backgroundColor: "#f5f5f5", 
                    fontFamily:" Arial, sans-serif;"// Light gray background
                }}
            >
                <div
                    className="form-card" // Use consistent class for form card
                    style={{
                        backgroundColor: "#ffffff", // White background
                        padding: "20px",
                        borderRadius: "10px", // Rounded corners
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)", // Soft shadow
                        width: "450px", // Form width for a more contained look
                        marginLeft:"33%"
                    }}
                >
                    <h2
                        style={{
                            textAlign: "center",
                            color: "#002f34", // Neutral heading color
                            marginBottom: "20px", 
                            fontFamily:"Arial, sans-serif"
                            // Space below the heading
                        }}
                    >
                        Add Pet
                    </h2>
                    <div className="mb-3"> {/* Consistent margin-bottom for spacing */}
                        <label style={{fontWeight:"bold", fontFamily:"Arial, sans-serif"}}>Pet Name:</label>
                        <input
                            className="form-control"
                            type="text"
                            value={pname}
                            onChange={(e) => setPname(e.target.value)}
                            style={{
                                width: "100%", // Full-width input
                                height: "45px", // Increased height for larger input
                                padding: "10px", // Padding for comfortable typing
                                borderRadius: "5px", // Rounded corners
                                border: "1px solid #ddd", // Light border
                                transition: "border 0.3s", // Smooth transition on focus
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label style={{fontWeight:"bold", fontFamily:"Arial, sans-serif"}}>Pet Description</label>
                        <input
                            className="form-control"
                            type="text"
                            value={pdesc}
                            onChange={(e) => setPdesc(e.target.value)}
                            style={{
                                width: "100%", // Full-width input
                                height: "45px",
                                padding: "10px", // Consistent padding
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                                transition: "border 0.3s",
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label style={{fontWeight:"bold", fontFamily:"Arial, sans-serif"}}>Pet Price</label>
                        <input
                            className="form-control"
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            style={{
                                width: "100%",
                                height: "45px",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                                transition: "border 0.3s",
                            }}
                        />
                    </div>
                    <div className="mb-3"> {/* Consistent space between form elements */}
                        <label style={{fontWeight:"bold", fontFamily:"Arial, sans-serif"}}>Pet Category</label>
                        <select
                            className="form-control"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{
                                width: "100%", // Full-width select
                                height: "45px",
                                padding: "10px", // Consistent padding
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                                transition: "border 0.3s",
                            }}
                        >
                            {categories.map((item, index) => (
                                <option key={`option-${index}`}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3"> {/* Ensure consistent spacing */}
                        <label style={{fontWeight:"bold", fontFamily:"Arial, sans-serif"}}>Pet Image</label>
                        <input
                            className="form-control"
                            type="file"
                            onChange={(e) => setPimage(e.target.files[0])}
                            style={{
                                width: "100%",
                                height: "45px",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                                transition: "border 0.3s",
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label style={{fontWeight:"bold", fontFamily:"Arial, sans-serif"}}>Pet Second Image</label>
                        <input
                            className="form-control"
                            type="file"
                            onChange={(e) => setPimage2(e.target.files[0])}
                            style={{
                                width: "100%",
                                height: "45px",
                                padding: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                                transition: "border 0.3s",
                            }}
                        />
                    </div>
                    <button
                        onClick={handleApi}
                        className="btn btn-success w-100"
                        style={{
                            height: "50px", // Taller button for better accessibility
                            borderRadius: "5px",
                            transition: "background-color 0.3s", // Smooth transition
                            backgroundColor:"#002f34",
                            color:"white"
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
