const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const generateTokenAndSetCookie = require('../utils/generateToken');

const Users = mongoose.model('Users', {
    username: String,
    mobile: String,
    email: String,
    password: String,
    likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]
});

module.exports.likeProducts = (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;

    Users.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
        .then(() => {
            res.send({ message: 'liked success.' })
        })
        .catch(() => {
            res.send({ message: 'server err likeproducts backend' })
        })

}

// module.exports.signup = (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     const email = req.body.email;
//     const mobile = req.body.mobile;
//     const user = new Users({ username: username, password: password, email, mobile });
//     user.save()
//         .then(() => {
//             res.send({ message: 'saved success.' })
//         })
//         .catch(() => {
//             res.send({ message: 'server err signup backend' })
//         })

// }

module.exports.signup = async (req, res) => {
    const { username, password, email, mobile } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Users({ username, password: hashedPassword, email, mobile });

        await user.save();

        // Generate token and set cookie
        generateTokenAndSetCookie(user._id, res);

        res.status(201).send({ message: 'User registered successfully.' });
    } catch (err) {
        res.status(500).send({ message: 'Server error during signup.' });
    }
};
// module.exports.signup = async (req, res) => {
//     const { username, password, email, mobile, role } = req.body;

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new Users({
//             username,
//             password: hashedPassword,
//             email,
//             mobile,
//             role: role || 'User', // Default to 'User' if no role is provided
//         });

//         await newUser.save();

//         generateTokenAndSetCookie(newUser._id, res);
//         res.status(201).send({ message: 'User registered successfully.' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send({ message: 'Server error during signup.' });
//     }
// };


module.exports.myProfileById = (req, res) => {
    let uid = req.params.userId

    Users.findOne({ _id: uid })
        .then((result) => {
            res.send({
                message: 'success.', user: {
                    email: result.email,
                    mobile: result.mobile,
                    username: result.username
                }
            })
        })
        .catch(() => {
            res.send({ message: 'server err myprofile backend' })
        })

    return;

}

module.exports.getUserById = (req, res) => {
    const _userId = req.params.uId;
    Users.findOne({ _id: _userId })
        .then((result) => {
            res.send({
                message: 'success.', user: {
                    email: result.email,
                    mobile: result.mobile,
                    username: result.username
                }
            })
        })
        .catch(() => {
            res.send({ message: 'server err get userbyid backend' })
        })
}


// module.exports.login = (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     Users.findOne({ username: username })
//         .then((result) => {
//             if (!result) {
//                 res.send({ message: 'user not found.' })
//             } else {
//                 if (result.password == password) {
//                     const token = jwt.sign({
//                         data: result
//                     }, 'MYKEY', { expiresIn: '1h' });
//                     res.send({ message: 'find success.', token: token, userId: result._id })
//                 }
//                 if (result.password != password) {
//                     res.send({ message: 'password wrong.' })
//                 }

//             }

//         })
//         .catch(() => {
//             res.send({ message: 'server err login backend' })
//         })

// }
module.exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Debugging input
        console.log('Login Request:', username, password);

        // Find the user in the database
        const user = await Users.findOne({ username });
        if (!user) {
            console.log('User not found'); // Debugging
            return res.status(404).send({ message: 'User not found.' });
        }

        // Compare provided password with the hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid password'); // Debugging
            return res.status(401).send({ message: 'Invalid username or password.' });
        }

        // Ensure the JWT_SECRET is loaded
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not defined in environment variables!');
            return res.status(500).send({ message: 'Server error. Configuration issue.' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Token generated:', token); // Debugging token generation

        // Send response with the token and userId
        res.status(200).send({ message: 'Login successful.', token, userId: user._id });
    } catch (err) {
        // Log and handle unexpected server errors
        console.error('Server error:', err);
        res.status(500).send({ message: 'Server error during login.' });
    }
};
// module.exports.login = async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         // Debugging input
//         console.log('Login Request:', username, password);

//         // Find the user in the database (users can be admins or normal users)
//         const user = await Users.findOne({ username });
//         if (!user) {
//             console.log('User not found'); // Debugging
//             return res.status(404).send({ message: 'User not found.' });
//         }

//         // Compare provided password with the hashed password in DB
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             console.log('Invalid password'); // Debugging
//             return res.status(401).send({ message: 'Invalid username or password.' });
//         }

//         // Ensure the JWT_SECRET is loaded
//         if (!process.env.JWT_SECRET) {
//             console.error('JWT_SECRET is not defined in environment variables!');
//             return res.status(500).send({ message: 'Server error. Configuration issue.' });
//         }

//         // Generate JWT token and include the role (admin or user)
//         const token = jwt.sign(
//             { userId: user._id, role: user.role },  // Include the role in the token
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );
//         console.log('Token generated:', token); // Debugging token generation

//         // Send response with the token, userId, and role
//         res.status(200).send({
//             message: 'Login successful.',
//             token,
//             userId: user._id,
//             role: user.role // Send the role (user or admin)
//         });
//     } catch (err) {
//         // Log and handle unexpected server errors
//         console.error('Server error:', err);
//         res.status(500).send({ message: 'Server error during login.' });
//     }
// };




module.exports.likedProducts = (req, res) => {

    Users.findOne({ _id: req.body.userId }).populate('likedProducts')
        .then((result) => {
            res.send({ message: 'success', products: result.likedProducts })
        })
        .catch((err) => {
            res.send({ message: 'server err likeddd products backedn' })
        })

}