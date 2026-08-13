import { buildSearchIndex } from "@/lib/docs/searchIndex";

export const dynamic = "force-static";
export const revalidate = false;

export function GET() {
  return Response.json(buildSearchIndex(), {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}