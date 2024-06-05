import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import clientPromise from "@/utils/connectMongodb";

export async function GET(req: any) {
  const { id } = req.params;

  try {
    const client = await clientPromise;
    const database = client.db("Application");
    const collection = database.collection("binaryGoals");

    const goal = await collection.findOne({ _id: new ObjectId(id) });

    if (!goal) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    return NextResponse.json(goal);
  } catch (error) {
    console.error("Error fetching goal:", error);
    return NextResponse.json(
      { error: "Failed to fetch goal" },
      { status: 500 }
    );
  }
}
