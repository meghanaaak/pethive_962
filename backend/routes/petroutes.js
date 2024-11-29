// routes/petRoutes.js
import express from 'express'
import {postPet} from "../controllers/petcontroller.js"
import { requireLogin } from '../middleware/postpet.js';

const router = express.Router();

// // Get all pets
// router.get('/pets', async (req, res) => {
//   try {
//     const pets = await Pet.find();
//     res.json(pets);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Add a new pet
router.post('/addpet', requireLogin, postPet);

export default router;





// Route for posting a pet, protected by requireLogin middleware


// import express from 'express';
// import { postPet, getAllPets } from '../controllers/petcontroller.js'; // Ensure getAllPets exists in your controller
// import { authenticateUser, authorizeRoles } from '../middleware/authMiddleware.js'; // Import authentication and authorization middleware

// const router = express.Router();

// // Get all pets (open to all users)
// router.get('/pets', getAllPets); // Public route

// // Add a new pet (protected by authentication and role-based access)
// router.post('/addpet', authenticateUser, authorizeRoles('Admin', 'User'), postPet);

// export default router;

