import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/utils/connectMongodb";
import { ObjectId, PushOperator } from "mongodb";

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("Application");
    const binaryGoals = db.collection("binaryGoals");
    const progressTrackers = db.collection("progressTrackers");

    const { userId, progressTrackerId, description } = await request.json();

    if (!userId || !progressTrackerId || !description) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const now = new Date();
    const newGoal = {
      user_id: new ObjectId(userId),
      progress_tracker_id: new ObjectId(progressTrackerId),
      description,
      status: "active",
      created_at: now,
      updated_at: now,
      today_checked: false,
      check_history: [],
    };

    const result = await binaryGoals.insertOne(newGoal);

    const newGoalId = result.insertedId;

    if (!newGoalId) {
      return NextResponse.json(
        { error: "Failed to insert goal" },
        { status: 500 }
      );
    }

    await progressTrackers.updateOne(
      { _id: new ObjectId(progressTrackerId) },
      { $push: { goals: newGoalId } as PushOperator<Document> }
    );

    const insertedGoal = await binaryGoals.findOne({ _id: newGoalId });

    return NextResponse.json({ goal: insertedGoal });
  } catch (error) {
    console.error("Error adding goal:", error);
    return NextResponse.json({ error: "Failed to add goal" }, { status: 500 });
  }
}
