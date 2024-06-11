import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import clientPromise from "@/utils/connectMongodb";

export async function POST(req: any) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing goal id" }, { status: 400 });
    }

    const { today_checked, date } = await req.json();

    if (typeof today_checked !== "boolean" || !date) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const client = await clientPromise;
    const database = client.db("Application");
    const collection = database.collection("binaryGoals");

    // Update today_checked and add the date to check_history if today_checked is true
    const update: any = {
      $set: { today_checked },
    };

    if (today_checked) {
      update.$push = { check_history: new Date(date) };
    }

    const updateResult = await collection.updateOne(
      { _id: new ObjectId(id) },
      update
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating goal:", error);
    return NextResponse.json(
      { error: "Failed to update goal" },
      { status: 500 }
    );
  }
}
