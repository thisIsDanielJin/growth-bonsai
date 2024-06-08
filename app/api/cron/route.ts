import clientPromise from "@/utils/connectMongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Try entered");
    const client = await clientPromise;
    const db = client.db("Application");
    const collection = db.collection("binaryGoals");
    console.log("connection established");
    const updateResult = await collection.updateMany(
      {},
      { $set: { today_checked: false } }
    );
    console.log("operation performed");

    client.close();
    console.log("closed client");
    return NextResponse.json({
      message: "Successfully updated binaryGoals collection",
      modifiedCount: updateResult.modifiedCount,
    });
  } catch (error) {
    console.error("Error updating binaryGoals collection:", error);
    return NextResponse.json(
      { error: "Failed to update binaryGoals collection" },
      { status: 500 }
    );
  }
}
