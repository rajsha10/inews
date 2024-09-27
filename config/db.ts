import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to the database");
    return;
  }

  try {
    await mongoose.connect('mongodb+srv://rajsharma861741:5W36v8eTp8KmddB5@i-news-web.xizmu.mongodb.net/');
    console.log("Connected to Mongo database successfully...");
  } catch (error) {
    console.error("Connection to Mongo database failed:", error);
    process.exit(1); 
  }
};

export default dbConnect;
