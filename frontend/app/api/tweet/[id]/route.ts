import { NextRequest } from "next/server";
import { getTweet } from "react-tweet/api";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const tweet = await getTweet(id);
    if (!tweet) {
      return Response.json({ error: "Tweet not found" }, { status: 404 });
    }
    return Response.json({ data: tweet });
  } catch (error) {
    console.error("[api/tweet] failed to fetch tweet:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
