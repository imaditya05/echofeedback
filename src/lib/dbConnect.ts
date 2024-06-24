import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnection(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already Connected to database");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODBURI || "", {});
    connection.isConnected = db.connections[0].readyState;

    console.log("Database connected");
  } catch (error) {
    console.log("Data base connection failed", error);
    process.exit(1);
  }
}

export default dbConnection;
