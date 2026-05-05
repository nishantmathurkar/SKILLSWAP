const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.melyzrs.mongodb.net/SkillSwapDB?retryWrites=true&w=majority`;

    console.log("Connecting to:", uri);

    await mongoose.connect(uri);

    console.log("MONGO DB CONNECTED ✅");
  } catch (err) {
    console.log("MONGODB ERROR:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;