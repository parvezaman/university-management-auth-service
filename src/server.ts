import mongoose from "mongoose";
import app from "./app";
import config from "./config";

const port: number = 3000;

async function startServer() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("database conntected successfully");

    app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
