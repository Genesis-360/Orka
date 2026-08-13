"use client";

import { Bento3Tile1 } from "@/components/bento3-tile1";

export const title = "Count-up gauge tile";

const Example = () => (
  <div className="min-h-80 w-full max-w-2xl overflow-hidden rounded-3xl bg-primary-foreground bg-white p-8">
    <div className="flex h-full items-center justify-center overflow-hidden rounded-4xl bg-white/3">
      <Bento3Tile1 />
    </div>
  </div>
);

export default Example;
