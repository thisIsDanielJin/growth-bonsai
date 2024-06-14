import clientPromise from "@/utils/connectMongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("Application");
    const collection = db.collection("binaryGoals");
    const updateResult = await collection.updateMany(
      {},
      { $set: { today_checked: false } }
    );

    console.log("Successfully updated binaryGoals collection");
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
