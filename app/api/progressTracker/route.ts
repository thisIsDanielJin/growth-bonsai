import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/utils/connectMongodb";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("Application");
    const progressTrackers = db.collection("progressTrackers");
    const binaryGoals = db.collection("binaryGoals");

    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const userObjectId = new ObjectId(userId);

    let tracker = await progressTrackers.findOne({ user_id: userObjectId });

    if (!tracker) {
      const now = new Date();
      const newTracker = {
        user_id: userObjectId,
        goals: [],
        created_at: now,
        updated_at: now,
      };
      const result = await progressTrackers.insertOne(newTracker);
      tracker = await progressTrackers.findOne({ _id: result.insertedId });
    }

    if (tracker && tracker.goals.length > 0) {
      tracker.goals = await binaryGoals
        .find({ _id: { $in: tracker.goals } })
        .toArray();
    }

    return NextResponse.json({ tracker });
  } catch (error) {
    console.error("Error handling progress tracker:", error);
    return NextResponse.json(
      { error: "Failed to handle progress tracker" },
      { status: 500 }
    );
  }
}
