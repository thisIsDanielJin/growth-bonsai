import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import clientPromise from "@/utils/connectMongodb";

export async function GET(req: any) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing goal id" }, { status: 400 });
    }

    const client = await clientPromise;
    const database = client.db("Application");
    const collection = database.collection("binaryGoals");

    const goal = await collection.findOne({ _id: new ObjectId(id) });

    if (!goal) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    return NextResponse.json({ today_checked: goal.today_checked });
  } catch (error) {
    console.error("Error fetching goal:", error);
    return NextResponse.json(
      { error: "Failed to fetch goal" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: any) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing goal id" }, { status: 400 });
    }

    const { today_checked } = await req.json();

    const client = await clientPromise;
    const database = client.db("Application");
    const collection = database.collection("binaryGoals");

    const updateResult = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { today_checked } }
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
