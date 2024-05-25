import clientPromise from "@/utils/connectMongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const waitingList = await client
      .db("WaitingList")
      .collection("waitingUsers")
      .find({})
      .toArray();

    return Response.json(waitingList);
  } catch (error) {
    console.error("Error retrieving data:", error);
    return Response.json({ error: "Failed to retrieve data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const waitingList = await client
      .db("WaitingList")
      .collection("waitingUsers");

    const res = await request.json();
    const userName = res.userName;
    const userEmail = res.userEmail;

    waitingList.insertOne({ user_name: userName, user_email: userEmail });

    return Response.json(
      { message: "Successfully uploaded the document" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding data:", error);
    return Response.json({ error: "Failed to add data" }, { status: 500 });
  }
}
