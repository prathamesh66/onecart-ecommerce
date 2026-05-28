import mongoose from "mongoose";

const connectDb = async () => {
  try {
    console.log("MONGO URL:", process.env.MONGODB_URL);

    await mongoose.connect(process.env.MONGODB_URL);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB error:", error.message);
  }
};

export default connectDb;
