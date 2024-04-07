import User from "../model/usermodel.js"; 
import Pet from "../model/petmodel.js";

// Define the route handler function for posting a pet
export const postPet = async (req, res) => {
  try {
    // Extract pet details from the request body
    const { name, breed, age, gender, location, description, username } = req.body;

    // Find the user based on the provided username
    const user = await User.findOne({ username });

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new pet associated with the found user
    const newPet = new Pet({
      name,
      breed,
      age,
      gender,
      location,
      description,
      owner: user._id // Set the owner to the user's ID
    });

    // Save the new pet to the database
    await newPet.save();

    // Respond with the details of the newly created pet
    res.status(201).json({
      _id: newPet._id,
      name: newPet.name,
      breed: newPet.breed,
      age: newPet.age,
      gender: newPet.gender,
      location: newPet.location,
      description: newPet.description,
      owner: username // Respond with the username of the owner
    });
  } catch (error) {
    console.log("Error posting pet", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
