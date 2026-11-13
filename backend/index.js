const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 3000;

app.use(express.json());

// Serve our frontend
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB!");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    });

// Create a user model
const User = mongoose.model("User", {
    name: String,
    email: String
});

// Home API
app.get("/api", (req, res) => {
    res.json({
        message: "Welcome to our Dockerized application!"
    });
});

// Get all users
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Could not retrieve users" });
    }
});

// Add a user
app.post("/api/users", async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                error: "Name and email are required"
            });
        }

        const user = await User.create({ name, email });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Could not create user" });
    }
});

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "healthy" });
});

// Start server after database connects
async function startServer() {
    await mongoose.connection.asPromise();

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port $DIL1`);
    });
}

startServer().catch((error) => {
    console.error(error);
    process.exit(1);
});