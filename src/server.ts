import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { config } from "./app/config";

async function main() {
  let server: Server;

  try {
    // connecting to mongodb with mongoose
    await mongoose.connect(config.database_url as string);

    console.log("Connected to MongoDB With Mongoose");

    //  listening to the app
    server = app.listen(config.port, () => {
      console.log(`Library App Listening On Port ${config.port}`);
    });
  } catch (error) {
    console.log("Failed To Connect With Database", error);
  }
}

main();
