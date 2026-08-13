import { NextRequest } from "next/server";
import { getTweet } from "react-tweet/api";

export const runtime = "nodejs";

// One hour of shared cache at the CDN/edge layer (stale-while-revalidate for a
// day). This keeps a high-traffic landing page from hammering Twitter's
// syndication API on every request and avoids rate limits.
const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
} as const;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const tweet = await getTweet(id);
    if (!tweet) {
      return Response.json(
        { error: "Tweet not found" },
        { status: 404, headers: CACHE_HEADERS }
      );
    }
    return Response.json({ data: tweet }, { headers: CACHE_HEADERS });
  } catch (error) {
    console.error("[api/tweet] failed to fetch tweet:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
