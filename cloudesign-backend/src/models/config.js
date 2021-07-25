import mongoose from "mongoose";
require("dotenv").config();
const mongoUri = process.env.MongoUrl;

const DbConnection = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DataBase connected successfully");
  } catch (error) {
    console.log(error.message);
  }
};

export default DbConnection;
