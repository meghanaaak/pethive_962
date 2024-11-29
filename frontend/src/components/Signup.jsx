import { Link } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');

    const handleApi = () => {
        const url = API_URL + '/signup';
        const data = { username, password, mobile, email };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                alert('SERVER ERR')
            });
    }

    return (
        <div style={{ fontFamily: "Arial, sans-serif" }}>
            <Header />
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                <div style={{ width: "400px" }}>
                    <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#343a40" }}>Signup</h3>
                    <form>
                        <div style={{ marginBottom: "15px" }}>
                            <label style={{ marginRight: "10px", color: "#343a40" }}>Username</label>
                            <input
                                style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #6c757d" }}
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                            <label style={{ marginRight: "10px", color: "#343a40" }}>Mobile</label>
                            <input
                                style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #6c757d" }}
                                type="text"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                            <label style={{ marginRight: "10px", color: "#343a40" }}>Email</label>
                            <input
                                style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #6c757d" }}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                            <label style={{ marginRight: "10px", color: "#343a40" }}>Password</label>
                            <input
                                style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #6c757d" }}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <button
                                style={{ backgroundColor: "#002f34", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none", marginRight: "10px" }}
                                onClick={handleApi}
                            >
                                SignUp
                            </button>
                            <Link
                                style={{ backgroundColor: "#002f34", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none", textDecoration: "none" }}
                                to="/login"
                            >
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";
// import API_URL from "../constants";
// import Header from "./Header";

// function Signup() {
//     const navigate = useNavigate();

//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [email, setEmail] = useState('');
//     const [mobile, setMobile] = useState('');
//     const [error, setError] = useState('');

//     const handleApi = () => {
//         const url = API_URL + '/signup';
//         const data = { username, password, mobile, email };
        
//         axios.post(url, data)
//             .then((res) => {
//                 if (res.data.message) {
//                     alert(res.data.message);  // Display success message

//                     // Assuming the backend returns role with the response
//                     const role = res.data.role;
                    
//                     // Store the token, userId, and role in localStorage
//                     localStorage.setItem('token', res.data.token);
//                     localStorage.setItem('userId', res.data.userId);
//                     localStorage.setItem('role', role);  // Save role in localStorage

//                     // Redirect based on the role
//                     if (role === 'Admin') {
//                         navigate('/admin-dashboard');  // Redirect to Admin Dashboard
//                     } else if (role === 'Moderator') {
//                         navigate('/moderator-dashboard');  // Redirect to Moderator Dashboard
//                     } else {
//                         navigate('/');  // Redirect to Home for regular users
//                     }
//                 }
//             })
//             .catch((err) => {
//                 console.error('Signup Error:', err);
//                 setError('Something went wrong during signup. Please try again.');
//             });
//     }

//     return (
//         <div style={{ fontFamily: "Arial, sans-serif" }}>
//             <Header />
//             <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
//                 <div style={{ width: "400px" }}>
//                     <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#343a40" }}>Signup</h3>
//                     {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
//                     <form>
//                         <div style={{ marginBottom: "15px" }}>
//                             <label style={{ marginRight: "10px", color: "#343a40" }}>Username</label>
//                             <input
//                                 style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #6c757d" }}
//                                 type="text"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                             />
//                         </div>
//                         <div style={{ marginBottom: "15px" }}>
//                             <label style={{ marginRight: "10px", color: "#343a40" }}>Mobile</label>
//                             <input
//                                 style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #6c757d" }}
//                                 type="text"
//                                 value={mobile}
//                                 onChange={(e) => setMobile(e.target.value)}
//                             />
//                         </div>
//                         <div style={{ marginBottom: "15px" }}>
//                             <label style={{ marginRight: "10px", color: "#343a40" }}>Email</label>
//                             <input
//                                 style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #6c757d" }}
//                                 type="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                         </div>
//                         <div style={{ marginBottom: "15px" }}>
//                             <label style={{ marginRight: "10px", color: "#343a40" }}>Password</label>
//                             <input
//                                 style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #6c757d" }}
//                                 type="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                         </div>
//                         <div style={{ textAlign: "center" }}>
//                             <button
//                                 type="button"  // Changed to type="button" to prevent form submit from refreshing the page
//                                 style={{ backgroundColor: "#002f34", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none", marginRight: "10px" }}
//                                 onClick={handleApi}
//                             >
//                                 SignUp
//                             </button>
//                             <Link
//                                 style={{ backgroundColor: "#002f34", color: "#fff", padding: "10px 20px", borderRadius: "5px", border: "none", textDecoration: "none" }}
//                                 to="/login"
//                             >
//                                 Login
//                             </Link>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Signup;
