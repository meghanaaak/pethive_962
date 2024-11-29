import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_URL from "../constants";
import Header from "./Header";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // const handleApi = () => {
    //     const url = API_URL + '/login';
    //     const data = { username, password };
    //     axios.post(url, data)
    //         .then((res) => {
    //             if (res.data.message) {
    //                 if (res.data.token) {
    //                     localStorage.setItem('token', res.data.token);
    //                     localStorage.setItem('userId', res.data.userId);
    //                     navigate('/');
    //                 }
    //             }
    //         })
    //         .catch((err) => {
    //             setError('Invalid username or password');
    //         });
    // };
    const handleApi = () => {
        const url = API_URL + '/login';
        const data = { username, password };
    
        axios.post(url, data)
            .then((res) => {
                console.log('API Response:', res.data); // Debugging response
                if (res.data.message === 'Login successful.') {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        navigate('/');
                    }
                } else {
                    setError('Invalid username or password');
                }
            })
            .catch((err) => {
                console.error('API Error:', err); // Log the exact error
                if (err.response && err.response.status === 401) {
                    setError('Invalid username or password');
                } else {
                    setError('Something went wrong. Please try again.');
                }
            });
    };
    

    return (
        <div>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)', backgroundColor: '#f2f2f2' }}>
                <div style={{ width: '350px', padding: '30px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                    <h2 style={{ marginBottom: '30px', color: '#333', textAlign: 'center' }}>Welcome to Pet Adoption</h2>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontWeight: 'bold', color: '#555' }}>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} placeholder="Enter username" />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontWeight: 'bold', color: '#555' }}>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} placeholder="Enter password" />
                    </div>
                    {error && <div style={{ color: '#002f34', marginBottom: '15px' }}>{error}</div>}
                    <button onClick={handleApi} style={{ backgroundColor: '#002f34', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px', cursor: 'pointer', width: '100%' }}>Login</button>
                    <p style={{ textAlign: 'center', marginTop: '15px', color: '#002f34' }}>Don't have an account? <Link to="/signup" style={{ color: '#002f34', textDecoration: 'none' }}>Sign up</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";
// import API_URL from "../constants";
// import Header from "./Header";

// function Login() {
//     const navigate = useNavigate();

//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleApi = () => {
//         const url = API_URL + '/login';
//         const data = { username, password };
    
//         axios.post(url, data)
//             .then((res) => {
//                 console.log('API Response:', res.data); // Debugging response
//                 if (res.data.message === 'Login successful.') {
//                     if (res.data.token) {
//                         // Store token, userId, and role in localStorage
//                         localStorage.setItem('token', res.data.token);
//                         localStorage.setItem('userId', res.data.userId);
//                         localStorage.setItem('role', res.data.role); // Assuming role is included in the response

//                         // Redirect user based on role
//                         const role = res.data.role;
//                         if (role === 'Admin') {
//                             navigate('/admin-dashboard');  // Redirect to Admin Dashboard
//                         } else if (role === 'Moderator') {
//                             navigate('/moderator-dashboard');  // Redirect to Moderator Dashboard
//                         } else {
//                             navigate('/');  // Redirect to Home for regular users
//                         }
//                     }
//                 } else {
//                     setError('Invalid username or password');
//                 }
//             })
//             .catch((err) => {
//                 console.error('API Error:', err); // Log the exact error
//                 if (err.response && err.response.status === 401) {
//                     setError('Invalid username or password');
//                 } else {
//                     setError('Something went wrong. Please try again.');
//                 }
//             });
//     };

//     return (
//         <div>
//             <Header />
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)', backgroundColor: '#f2f2f2' }}>
//                 <div style={{ width: '350px', padding: '30px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
//                     <h2 style={{ marginBottom: '30px', color: '#333', textAlign: 'center' }}>Welcome to Pet Adoption</h2>
//                     <div style={{ marginBottom: '20px' }}>
//                         <label style={{ fontWeight: 'bold', color: '#555' }}>Username</label>
//                         <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} placeholder="Enter username" />
//                     </div>
//                     <div style={{ marginBottom: '20px' }}>
//                         <label style={{ fontWeight: 'bold', color: '#555' }}>Password</label>
//                         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} placeholder="Enter password" />
//                     </div>
//                     {error && <div style={{ color: '#002f34', marginBottom: '15px' }}>{error}</div>}
//                     <button onClick={handleApi} style={{ backgroundColor: '#002f34', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px', cursor: 'pointer', width: '100%' }}>Login</button>
//                     <p style={{ textAlign: 'center', marginTop: '15px', color: '#002f34' }}>Don't have an account? <Link to="/signup" style={{ color: '#002f34', textDecoration: 'none' }}>Sign up</Link></p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;
