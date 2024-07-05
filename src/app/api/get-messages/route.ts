import { getServerSession } from "next-auth";
import { authOptions } from "../sign-up/auth/[...nextauth]/options";
import dbConnection from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

async function GET(request: Request) {
  await dbConnection();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }

  //converts user._id (even if it is string) to mongoose ObjectID
  const userID = new mongoose.Types.ObjectId(user._id);
  try {
    const user = await UserModel.aggregate([
      { $match: { id: userID } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "messages" } } },
    ]);

    if (!user || user.length === 0) {
      Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        messages: user[0].messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while getting user messages", error);
    Response.json(
      {
        success: false,
        message: "Error while getting messages from user",
      },
      { status: 500 }
    );
  }
}
