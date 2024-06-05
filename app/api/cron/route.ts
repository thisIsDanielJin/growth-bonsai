import clientPromise from "@/utils/connectMongodb";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("Cron job started");

  try {
    const client = await clientPromise;
    console.log("Database client obtained");

    const db = client.db("Application");
    console.log("Database selected");

    const collection = db.collection("binaryGoals");
    console.log("Collection selected");

    const startTime = Date.now();
    const updateResult = await collection.updateMany(
      {},
      { $set: { today_checked: false } }
    );
    const endTime = Date.now();
    console.log(`Update operation took ${endTime - startTime} ms`);

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
